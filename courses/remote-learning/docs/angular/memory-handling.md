# Memory handling in TypeScript and Angular

TypeScript does not allocate or free objects. It checks JavaScript before the code runs. The browser garbage collector frees objects that nothing live can reach.

Live roots include the global object, the current call stack, Angular injectors that still exist, and native handles such as timers, sockets, and event targets.

Official references:

- [MDN memory management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Memory_management)
- [takeUntilDestroyed](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed)
- [DestroyRef](https://angular.dev/api/core/DestroyRef)
- [RxJS interop, including toSignal](https://angular.dev/ecosystem/rxjs-interop)
- [effect cleanup](https://angular.dev/guide/signals/effect)
- [HttpClient observables](https://angular.dev/guide/http/making-requests)
- [resource](https://angular.dev/guide/signals/resource)
- [destroyDetachedRouteHandle](https://angular.dev/api/router/destroyDetachedRouteHandle)

Related notes: [teardown in Angular and RxJS](senior-angular-rxjs.md), [browser leak checklist](../shared/javascript-browser-traps.md).

## What a leak is

A leak is not a failed garbage collector. Something still reachable still holds the object you thought was gone.

Typical retained path after leaving a trading screen:

```text
root injector or window
  -> live WebSocket or Subject
  -> subscriber closure
  -> destroyed component instance
  -> its template nodes, quote maps, and child charts
```

Cycles between two objects are collectable. Mark-and-sweep drops the cycle once nothing live can reach it. The failure is a live owner. A root service, a timer, a detached-route cache, or an unbounded `Map`.

Heap snapshots after repeated navigate-away cycles beat staring at total heap size. Follow the retaining path.

## TypeScript facts that change what you pick

### Types cost nothing at runtime

`interface`, generics, and most `type` aliases disappear. They cannot leak. They also cannot save you. A `Map<string, Quote>` still grows until you delete keys.

### Emitted JavaScript can allocate

Know what the compiler emits for the target you ship.

- A numeric `enum` becomes a bidirectional object. A `const enum` inlines members when allowed.
- Downlevel `#private` fields can emit `WeakMap` helpers. Do not shadow the name `WeakMap` in that scope.
- Classes allocate instances. Closures allocate environments. Each `subscribe` callback can keep `this` alive.

### Closures keep what they close over

```typescript
class WatchlistRow {
  private readonly quotes = new Map<string, Quote>();

  attach(element: HTMLElement): void {
    element.addEventListener("click", () => {
      console.log(this.quotes.size);
    });
  }
}

interface Quote {
  readonly instrumentId: string;
  readonly bid: number;
  readonly ask: number;
}
```

The listener keeps the component, the map, and often a DOM subtree. TypeScript's `this` typing does not shorten that lifetime. Remove the listener or register teardown on `DestroyRef`.

### Weak collections have a narrow job

| Structure | Holds keys | Iterate | Use when |
| --- | --- | --- | --- |
| `Map` | strongly | yes | identity is a string or number, or you must enumerate |
| `WeakMap` | weakly | no | extra data attached to an object you do not own |
| `WeakRef` / `FinalizationRegistry` | weakly | n/a | not for quote caches or other UI state |

`WeakMap` cannot cache quotes by instrument ID. Strings are not weak keys. Use `Map` plus eviction, account-change reset, and a size cap.

Do not store a quote cache in `WeakRef`. GC timing is unspecified. A trading UI cannot drop the latest bid because the collector ran.

`using` and `DisposableStack` from ECMAScript 2027 Stage 4 close handles when a scope ends. They do not replace component `DestroyRef`. See [ECMAScript 2027 Stage 4](../shared/ecmascript-2027-stage-4.md).

## Angular lifetime is an injector question

Ask who owns the object.

| Owner | Lives until | Typical leak |
| --- | --- | --- |
| Component or directive injector | that view is destroyed | subscription, timer, chart, listener |
| Route injector | that route subtree is destroyed or reused | cached account state after leave |
| `providedIn: "root"` | the application is destroyed | socket plus last account's watchlist |
| `window`, `document`, third-party widget | you detach it | global listener after navigation |

A root `QuoteService` should hold the socket and latest quotes by instrument ID. It should not hold component instances, `ElementRef`s, or template callbacks.

Route reuse keeps whole component trees alive on purpose. If you cache detached handles, destroy the ones you evict with `destroyDetachedRouteHandle`.

## Why this API, not that one

Start from the consumer, not from the cleanup API you remember.

```text
Need the value in the template only?
  AsyncPipe

Need a Signal for the template and TypeScript?
  toSignal once, field initializer or constructor

Need a read that cancels when params change?
  resource() with AbortSignal, or switchMap on HttpClient

Need an RxJS side effect such as a toast or analytics call?
  takeUntilDestroyed

Need to close a non-RxJS handle such as a timer, listener, or chart.destroy()?
  DestroyRef.onDestroy, or effect onCleanup

Need shared live data for many screens?
  root or route service, one connection, refCounted share
```

### Template-only stream. `AsyncPipe`, not `subscribe`

Angular subscribes, unsubscribes on destroy, and marks the view when a value arrives.

Skip a manual `subscribe` on the same source in the same component. You pay twice and split teardown.

Finite `HttpClient` streams complete after the response. Unsubscribing still matters if the user leaves while the request is in flight. Unsubscribe aborts the HTTP request. A late callback can still write into a destroyed view if you leave the subscription open.

### Value in TypeScript and the template. `toSignal`, not `AsyncPipe` plus a field copy

`toSignal` subscribes immediately and unsubscribes when the creation context is destroyed. Call it once per Observable. Calling it in a method or inside `computed` creates extra subscriptions.

Pass `{ initialValue }` or `{ requireSync: true }` on purpose. An undefined first frame is a product state. Treat it in the template.

`manualCleanup: true` means you own teardown. Prefer the default unless the signal outlives the component.

Do not use `toSignal` for a fire-and-forget toast. That is a side effect, not a view value. Use `takeUntilDestroyed`.

### Imperative RxJS side effect. `takeUntilDestroyed`, not a destroyed Subject

Call it in an injection context such as a constructor, with no argument. Pass `inject(DestroyRef)` when you subscribe in a method. Forgetting `DestroyRef` outside an injection context is a bug.

This beats a handwritten `Subject`, `takeUntil(this.destroyed$)`, and `ngOnDestroy`. Same lifetime, less state to forget.

Do not use `takeUntilDestroyed` for `setInterval` or `chart.destroy()`. Those are not Observables. Use `DestroyRef.onDestroy`.

### Non-RxJS handle. `DestroyRef.onDestroy`, not only `ngOnDestroy`

Use it for `clearInterval`, `removeEventListener`, `chart.destroy()`, or closing a dedicated worker.

It returns an unregister function. That helps if the resource can end before the component does.

`ngOnDestroy` still works. Prefer `DestroyRef` when writing helpers that are not classes, or when several independent resources should register separately.

### Effect-owned timer or request. `onCleanup`, not a second `DestroyRef` only

Angular destroys view effects with the component. That is not enough if the effect starts a timer that must stop when the effect re-runs.

```typescript
import { Component, effect, input } from "@angular/core";

@Component({
  selector: "app-quote-logger",
  template: "",
})
export class QuoteLogger {
  readonly instrumentId = input.required<string>();

  constructor() {
    effect((onCleanup) => {
      const instrumentId = this.instrumentId();
      const timerId = window.setInterval(() => {
        console.debug(`Still watching ${instrumentId}`);
      }, 15_000);

      onCleanup(() => {
        window.clearInterval(timerId);
      });
    });
  }
}
```

Do not use `effect` to copy one signal into another. That adds extra lifetime and extra change-detection work. Use `computed` or `linkedSignal`.

A root-provided service's effects live until the application is destroyed. Do not create view-scoped work in a root service unless that work should survive navigation.

A constructor `effect` can run before Angular commits the DOM. Create a chart in `afterNextRender`. Update it in `afterRenderEffect`. Destroy the instance in `onCleanup` or `DestroyRef.onDestroy`. Native observers such as `ResizeObserver` are often a better fit than an effect that polls layout.

### Cancellable read. `resource` or `switchMap`, not a mutation helper

`resource` is for reads driven by signal params. The loader receives `abortSignal`. Pass that into `fetch`. Angular aborts when params change or the context is destroyed.

Do not use `resource` for order submission. Aborting a mutation is not rolling back a trade.

### Shared live feed. Root service plus `refCount`, not per-component sockets

A cold `HttpClient` call starts a new request per subscriber. Two `AsyncPipe`s on the same HTTP Observable can mean two network calls unless you share.

A market socket should be hot and shared.

```typescript
import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

@Injectable({ providedIn: "root" })
export class QuoteFeed {
  readonly quotes$: Observable<QuoteTick>;

  constructor() {
    this.quotes$ = connectQuoteSocket().pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}

interface QuoteTick {
  readonly instrumentId: string;
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
}

declare function connectQuoteSocket(): Observable<QuoteTick>;
```

`bufferSize: 1` keeps the latest tick, not the whole session. `refCount: true` disconnects when the last screen unsubscribes.

Omit `refCount` only when the socket must stay up with zero UI subscribers. That is a product decision, not a default.

Never use an unbounded replay buffer for ticks. That retains the whole session under volatility.

Account-scoped maps belong in a route or component provider, or they reset on account change. A root service that keeps the previous user's watchlist is a leak with a product bug on top.

## Allocation is not a leak

OnPush, signals, and `@for` tracking reduce how often you allocate new view work. They do not unsubscribe a socket.

Still choose carefully.

- Mutating an array in place with a stable identity can skip an OnPush check. The old array stays. You also show stale UI.
- Copying a full `Map` of every instrument on every tick allocates heavily. Partition, mutate a transport cache, or publish an immutable snapshot on an animation frame. Measure first.
- `bufferTime` retains every event in the window. `auditTime` keeps the latest. Quotes for display usually want latest-wins.
- Virtualize long lists. Ten thousand component instances cost memory even with perfect unsubscribe.

## How to decide in an interview

Say the constraint first, then the API.

> This value only appears in the template, so `AsyncPipe` owns subscribe and unsubscribe.

> TypeScript needs the current quote and the template reads a signal, so `toSignal` once on the field.

> This toast is a side effect of a long-lived alert stream, so `takeUntilDestroyed` on `DestroyRef`.

> The chart is a third-party object, so `DestroyRef.onDestroy` calls `chart.destroy()`.

> The socket is process-wide, so a root service holds it. Screens subscribe with `refCount`. Account change resets the quote `Map` by instrument ID. It does not keep the previous component tree.

If asked why not `ngOnDestroy` plus a `Subscription` bag: it works, it is more code, and it is easy to forget one `add`. If asked why not `WeakRef` for the watchlist: GC is not a cache eviction policy for prices.

## Diagnosis steps

1. Reproduce. Open the screen, receive ticks, navigate away, repeat.
2. Take a heap snapshot. Search for the component class name.
3. Read the retainer. Injector, subscriber, listener, timer, or detached route.
4. Fix that owner. Do not add `detectChanges` or extra `shareReplay`.
5. Repeat the snapshot. Confirm the class count returns to baseline.
6. Confirm the product still reconnects and does not drop in-flight orders. Unsubscribe is not server rollback.

## Questions to answer aloud

1. Why can two objects that reference each other still be collected?
2. Why does `WeakMap` not cache quotes by instrument ID?
3. When must you pass `DestroyRef` into `takeUntilDestroyed`?
4. Why is `toSignal` in a click handler a leak risk?
5. What does `HttpClient` unsubscribe do to an in-flight request?
6. Why would `shareReplay` without `refCount` keep a socket after every screen closed?
7. Why is a root service the wrong place for an `ElementRef`?
8. What is the difference between reducing allocations and fixing a leak?
