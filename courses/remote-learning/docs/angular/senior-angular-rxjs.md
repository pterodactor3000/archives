# Senior Angular and RxJS

Treat Angular as a rendering and dependency system. Treat RxJS as a model for time, cancellation, ordering, and shared asynchronous work. The senior decision is where each responsibility belongs.

Official references:

- [Angular signals](https://angular.dev/guide/signals)
- [Skipping component subtrees](https://angular.dev/best-practices/skipping-subtrees)
- [RxJS interop](https://angular.dev/ecosystem/rxjs-interop)
- [Zoneless Angular](https://angular.dev/guide/zoneless)
- [Deferrable views](https://angular.dev/guide/templates/defer)
- [Angular security](https://angular.dev/best-practices/security)
- [RxJS operator guide](https://rxjs.dev/guide/operators)

Check the project version before using a new API. Interviewers may maintain an older Angular application even when current Angular docs show a newer default.

As of August 2026, Angular's current docs say OnPush is the default since v22 and zoneless is the default since v21. Older applications may use eager change detection and Zone.js. State the version before diagnosing behavior.

## Signals or RxJS

Use signals for synchronously readable state and derivations:

- selected instrument
- current display settings
- computed spread or total
- component and feature state

Use RxJS when time semantics matter:

- HTTP and WebSocket streams
- cancellation
- retries and timeouts
- combining event sources
- rate limiting
- ordered or concurrent async work

The boundary is not ideological. A service can manage transport with RxJS and expose stable UI state as signals.

```typescript
import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

@Injectable({ providedIn: "root" })
export class QuoteViewModel {
  private readonly quoteService = inject(QuoteService);

  readonly quote = toSignal(this.quoteService.quote$, {
    initialValue: null,
  });

  readonly spread = computed(() => {
    const quote = this.quote();
    return quote === null ? null : quote.ask - quote.bid;
  });
}

interface Quote {
  readonly bid: number;
  readonly ask: number;
}

abstract class QuoteService {
  abstract readonly quote$: import("rxjs").Observable<Quote>;
}
```

`toSignal` subscribes immediately. Create it once, not inside a getter or repeatedly called method. Angular tears it down with its injection context unless manual cleanup is requested.

## Signal rules

### Keep `computed` pure

A computed signal should derive a value. Do not make HTTP calls, write storage, or mutate another signal inside it.

### Use `effect` for imperative synchronization

Good uses include logging, chart-library updates, and storage synchronization. Do not use an effect to copy derivable state between signals. That creates timing problems and extra invalidations.

### Dependencies are dynamic

Angular tracks signals read during the latest computed execution. A conditional branch can add or remove a dependency.

### Equality has product meaning

Default equality uses identity. Deep equality may suppress valid updates and can cost more than rendering. Normalize data or update only changed records before reaching for a deep comparator.

## OnPush change detection

`ChangeDetectionStrategy.OnPush` limits when Angular checks a subtree. It does not mean "render once."

Angular can check an OnPush component when:

- an input receives a new value
- an event in that subtree runs
- a template-read signal changes
- `AsyncPipe` receives a value
- code marks the view for checking

The classic failure is mutation with stable identity:

```typescript
// Bad for an OnPush input.
positions.push(newPosition);

// New identity makes the state change explicit.
positions = [...positions, newPosition];
```

Do not manually call `detectChanges` as the first fix. Find why state changed outside Angular's notification paths.

## Zoneless readiness

Zoneless Angular relies on explicit notifications such as signal updates, input changes, bound listeners, `AsyncPipe`, and `markForCheck`.

A useful design test:

> If Zone.js disappeared, what tells Angular this view became stale?

Third-party callbacks may need an explicit signal update or `ChangeDetectorRef.markForCheck`. Do not scatter change detection calls without identifying the ownership boundary.

## Rendering market data

Do not render every network tick. Separate these rates:

1. ingress rate from the server
2. state update and calculation rate
3. visible rendering rate

For a watchlist, keep the latest quote per symbol and sample for display at a frame-friendly cadence.

```typescript
import {
  animationFrameScheduler,
  auditTime,
  scan,
  shareReplay,
} from "rxjs";

interface QuoteTick {
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
}

declare const quoteTicks$: import("rxjs").Observable<QuoteTick>;

const latestQuotes$ = quoteTicks$.pipe(
  scan((quotes, tick) => {
    const current = quotes.get(tick.symbol);
    if (current !== undefined && current.sequence >= tick.sequence) {
      return quotes;
    }

    const nextQuotes = new Map(quotes);
    nextQuotes.set(tick.symbol, tick);
    return nextQuotes;
  }, new Map<string, QuoteTick>()),
  auditTime(0, animationFrameScheduler),
  shareReplay({ bufferSize: 1, refCount: true }),
);
```

The zero-delay animation-frame scheduler publishes the latest accumulated value on the next frame. A positive delay would use timer scheduling instead. This copies the map only for accepted ticks. For very large feeds, copying a full map per tick may be too expensive. Partition by symbol, batch updates, or keep a mutable transport cache behind an immutable public snapshot. Measure before adding complexity.

## List identity

Use stable domain identity:

```html
@for (position of positions(); track position.id) {
  <app-position-row [position]="position" />
}
```

Tracking by array index is wrong when rows reorder, insert, or disappear. Angular can reuse the wrong DOM and local component state.

Virtualize long lists. Stable tracking reduces DOM replacement, but it does not make thousands of visible rows cheap.

## Startup performance

Measure before changing architecture:

- entry JavaScript bytes and parse time
- first route render
- authentication and configuration requests
- largest contentful paint
- interaction latency
- third-party script cost

Use route-level lazy loading for features not needed at startup. Use `@defer` for non-critical template dependencies such as education panels or secondary charts. Keep the order ticket and account-risk warnings out of an arbitrary deferred path if users need them immediately.

Preloading shifts cost rather than removing it. Choose it from likely navigation and network conditions. Server rendering can improve public content, but an authenticated trading screen still needs careful client startup and live-state initialization.

Check bundle analysis for duplicate libraries and large charting or localization packages. A smaller source file does not prove a smaller or faster production bundle.

## Higher-order mapping operators

Pick by product semantics:

| Operator | New value while work is active | Typical use |
| --- | --- | --- |
| `switchMap` | Cancels previous subscription | Instrument search, latest route selection |
| `concatMap` | Queues and preserves order | Commands that must all run in sequence |
| `mergeMap` | Runs concurrently | Independent reads with a concurrency limit |
| `exhaustMap` | Ignores new values | Block duplicate submit clicks |

### Search

```typescript
const results$ = query$.pipe(
  debounceTime(250),
  distinctUntilChanged(),
  switchMap((query) =>
    searchInstruments(query).pipe(
      catchError((error: unknown) => {
        logSearchFailure(query, error);
        return of([]);
      }),
    ),
  ),
);
```

Placing `catchError` inside `switchMap` keeps the outer query stream alive after one request fails.

### Order submission

Do not reflexively use `switchMap`. Cancelling a client subscription does not prove the server cancelled the order.

- Use `exhaustMap` when a second click while submitting is definitely a duplicate.
- Use `concatMap` when every intent must execute in order.
- Use an idempotency key either way.
- Disable the control and show explicit pending state.

## Hot and cold observables

A cold observable starts its producer per subscription. Angular `HttpClient` requests are cold. Two subscriptions can make two requests.

A hot observable has a producer independent of one subscriber. DOM events and a shared WebSocket connection are typical examples. A Subject is that producer when your code calls `next`. Variants, subscribe versus complete, and why not `error()` a quote bus are in [examples](examples.md#subject).

`share` and `shareReplay` can turn one subscription into shared work. That changes lifecycle semantics, so choose deliberately.

## `shareReplay` questions

`shareReplay({ bufferSize: 1, refCount: true })` is often useful for a latest-value cache.

Ask:

- Should the source disconnect when the last subscriber leaves?
- Should a completed value remain cached?
- Should an error be replayed or should a later subscriber retry?
- Can cached user data survive account or instrument changes?
- Is the source finite HTTP work or an infinite socket?

In RxJS 7.8, this configuration disconnects an active source when the subscriber count reaches zero because `refCount` is true. `shareReplay` resets after an error, but retains a completed buffer for late subscribers. A long-lived socket can reconnect after all subscribers leave. A completed HTTP result remains cached on that shared observable instance.

Never use an unbounded replay buffer for market data.

## Combination traps

### `combineLatest`

It emits only after every source has emitted. Represent loading or missing state explicitly. `startWith` is correct only when the initial value is true domain state.

### `withLatestFrom`

The primary stream controls emission. This is useful when a submit event should sample current form or account state.

### `forkJoin`

It waits for all inputs to complete. An infinite WebSocket stream prevents completion.

## Rate operators

- `debounceTime`: emit after silence. Good for text search, bad for a feed that never becomes quiet.
- `throttleTime`: emit one value, then suppress for a period. Configure leading and trailing behavior consciously.
- `auditTime`: after each period, emit the latest value. Often suitable for visual quote updates.
- `sampleTime`: emit the latest available value on a fixed schedule.
- `bufferTime`: keep every value in batches. Memory can grow under overload.

RxJS does not make a push source obey consumer capacity. If every event must be retained, put durable buffering and flow control outside the browser. If display may drop intermediate quotes, sample the latest state.

## Teardown and lifetime

Prefer template `AsyncPipe`, signals created with `toSignal`, or `takeUntilDestroyed`.

Why one of those, and not `ngOnDestroy`, `WeakMap`, or a root socket per screen, is in [memory handling](memory-handling.md).

```typescript
import { DestroyRef, inject, signal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export class PriceAlertPanel {
  private readonly destroyRef = inject(DestroyRef);
  private readonly alertService = inject(AlertService);
  readonly errorMessage = signal<string | null>(null);

  start(): void {
    this.alertService.alerts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (alert) => this.showAlert(alert),
        error: () => {
          this.errorMessage.set("Price alerts are unavailable");
        },
      });
  }

  private showAlert(alert: PriceAlert): void {
    // Update local state or call an imperative UI boundary.
  }
}

interface PriceAlert {
  readonly id: string;
}

abstract class AlertService {
  abstract readonly alerts$: import("rxjs").Observable<PriceAlert>;
}
```

Avoid nested subscriptions. They obscure cancellation, errors, and teardown.

## Error and retry policy

Classify failures:

- malformed message: reject, record metric, continue if safe
- temporary connection loss: reconnect with capped exponential backoff and jitter
- authentication failure: stop retrying and reauthenticate
- permission failure: show durable user state
- order outcome unknown: reconcile by idempotency key or order-status query

Never retry every error forever. A retry loop can amplify an outage.

Use `finalize` for local cleanup on complete, error, or unsubscribe. It does not mean a server-side operation rolled back.

## Dependency injection and ownership

Provider scope defines shared state lifetime.

- `providedIn: "root"` shares one service across the app.
- A route or component provider creates a scoped instance.
- Injecting stateful services at the wrong level causes cross-account leaks or unexpected resets.

Keep transport details behind a narrow service contract. Components should not know WebSocket reconnection protocol or wire formats.

## Typed forms

Use typed reactive forms for order tickets. Distinguish disabled controls, raw values, nullability, and domain validation.

Client validation improves feedback. Server validation remains authoritative for price, margin, account permissions, and market status.

Do not use a validator that reads changing market state without making that dependency and revalidation policy explicit.

In a zoneless application, reactive-form model calls such as `setValue` and `patchValue` do not by themselves schedule component change detection. Connect observable form state to a signal or mark the view through a controlled boundary.

## Security

- Angular sanitizes untrusted values in supported template contexts.
- Avoid direct DOM APIs and string-built HTML.
- Treat `bypassSecurityTrust...` as a security review point.
- Use Content Security Policy and Trusted Types where the deployment permits them.
- Do not put tokens or sensitive account data in logs.
- Route guards improve navigation, but only the server can enforce authorization.
- An HTTP interceptor centralizes transport behavior. It does not prove a request is authorized.

## Testing strategy

Test behavior at the smallest useful boundary:

- pure calculations with plain unit tests
- RxJS time behavior with a test scheduler or controlled subjects
- components through public inputs, outputs, and rendered DOM
- service integration with Angular HTTP testing tools
- a small number of end-to-end trading journeys

For live data, test:

- duplicate sequence
- out-of-order sequence
- reconnect and resubscribe
- malformed payload
- burst traffic
- stale instrument after route change
- auth expiry
- empty and closed-market state

Avoid testing private methods. It freezes implementation without protecting user behavior.

## Architecture prompt

If asked to design a trading screen, walk through:

1. Define data contracts and sequence semantics.
2. Parse untrusted messages at the transport boundary.
3. Keep one managed connection per authenticated session.
4. Multiplex subscriptions by instrument.
5. Normalize latest state by stable ID.
6. Separate raw tick state from visible cadence.
7. Expose explicit loading, stale, live, and error states.
8. Keep order commands separate from market-data queries.
9. Add idempotency, reconciliation, telemetry, and safe logs.
10. Test disconnects and out-of-order data before visual polish.

## Questions to answer aloud

1. What exactly makes an OnPush component run change detection?
2. When is a signal better than an observable?
3. Why is an effect a poor way to copy derived state?
4. Which flattening operator should submit an order, and why?
5. How would you keep one WebSocket connection for many components?
6. What does `shareReplay` retain and when does it disconnect?
7. Why can `combineLatest` show nothing?
8. How would you render 10,000 ticks per second without freezing the browser?
9. How do provider scopes affect user-specific state?
10. What security guarantees does Angular provide, and which remain server work?
11. Why would you pick `toSignal` once on a field instead of `subscribe` in `ngOnInit`?
