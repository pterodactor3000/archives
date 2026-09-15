# Angular implementation examples

Copy these into a coding interview. Each example is the shape I would write first. The subsection under it is the decision, not a second implementation.

These APIs match current Angular docs as of September 2026. OnPush change detection has been the default since v22. Zoneless has been the default since v21. Ask which version the interviewer runs before diagnosing Zone.js behavior.

Related notes: [senior Angular and RxJS](senior-angular-rxjs.md), [memory handling](memory-handling.md).

Official references:

- [Pipes](https://angular.dev/guide/templates/pipes)
- [Directives](https://angular.dev/guide/directives)
- [Components](https://angular.dev/guide/components)
- [Routing](https://angular.dev/guide/routing)
- [Signals](https://angular.dev/guide/signals)
- [Effects](https://angular.dev/guide/signals/effect)
- [RxJS interop](https://angular.dev/ecosystem/rxjs-interop)
- [RxJS Subject](https://rxjs.dev/guide/subject)
- [NgRx SignalStore](https://ngrx.io/guide/signals/signal-store)

Pick the tool from the consumer.

```text
Reusable pure display transform -> pipe
Behavior on an existing element -> directive
A view with inputs, outputs, and a template -> component
URL owns which view is alive -> router
Synchronous state and derivation -> signal and computed
Time, cancel, retry, share -> observable
You produce values and many listeners share them -> Subject variant
Template needs the latest value -> AsyncPipe or toSignal
Imperative work when a signal changes -> effect
Several consumers share feature state and methods -> store
Lifetime and ownership of work -> service and its provider scope
```

## Pipe

A pipe formats a value in a template. It does not own HTTP, sockets, or mutation.

```typescript
import { Pipe, PipeTransform } from "@angular/core";

interface Quote {
  readonly bid: number;
  readonly ask: number;
}

@Pipe({
  name: "priceSpread",
})
export class PriceSpreadPipe implements PipeTransform {
  transform(quote: Quote | null): string {
    if (quote === null) {
      return "n/a";
    }

    const spread = quote.ask - quote.bid;
    return spread.toFixed(2);
  }
}
```

```html
<span>{{ quote() | priceSpread }}</span>
```

Import `PriceSpreadPipe` in the component `imports` array. Pure is the default. Angular reruns the pipe when the `quote` identity changes.

### Why this, not otherwise

I use a pipe when the same pure formatting appears in more than one template and depends only on its arguments. Angular memoizes a pure pipe on input identity, so a watchlist of two hundred rows does not reformat a quote that did not change.

I do not put this in a component method called from the template. That method runs on every check of that view, including checks that have nothing to do with the quote.

If TypeScript on this screen also needs the number, use `computed` on that screen. If several templates need the same display string, use a pipe. Do not pipe a value you already expose as `computed` in the same view.

I do not set `pure: false`. An impure pipe runs on every change-detection cycle. That is the wrong cost model for market data. Give the quote a new object when bid or ask changes.

I do not fetch inside `transform`. A pipe must be synchronous and pure. Async work belongs in a service, `resource`, or an Observable.

I do not use Angular's `number` or `currency` pipes for order notional, margin, or anything that must be exact. Those pipes use JavaScript `number`. `toFixed` in this example is a display shortcut for a spread on a quote board. Accounting values belong in integer minor units or a decimal library. See [trading domain](../shared/trading-finance-domain.md).

## Directive

A directive attaches behavior to an element you already have. It should not wrap that element in extra DOM unless the product needs a new host.

```typescript
import { computed, Directive, input } from "@angular/core";

@Directive({
  selector: "[appQuoteDirection]",
  host: {
    "[class.quote-up]": 'direction() === "up"',
    "[class.quote-down]": 'direction() === "down"',
    "[attr.aria-label]": "label()",
  },
})
export class QuoteDirectionDirective {
  readonly mid = input.required<number>();
  readonly previousMid = input<number | null>(null);

  readonly direction = computed(() => {
    const previousMid = this.previousMid();
    if (previousMid === null) {
      return "flat";
    }
    if (this.mid() > previousMid) {
      return "up";
    }
    if (this.mid() < previousMid) {
      return "down";
    }
    return "flat";
  });

  readonly label = computed(() => {
    switch (this.direction()) {
      case "up":
        return "Price up";
      case "down":
        return "Price down";
      case "flat":
        return "Price unchanged";
    }
  });
}
```

```html
<td appQuoteDirection [mid]="row.mid" [previousMid]="row.previousMid">
  {{ row.mid }}
</td>
```

The host object is the current way to bind class, style, attributes, and events. The parent owns `previousMid`. The directive only paints.

### Why this, not otherwise

I use a directive when several elements need the same DOM behavior and I do not want a wrapper component. A component for a class toggle on a `<td>` adds a host element, or forces an attribute selector plus a template you do not need.

I do not rebuild `NgIf` or `NgFor`. Current templates have `@if` and `@for`. A custom structural directive is for a reusable view-creation policy the control flow does not cover, such as a permission template that creates and destroys an embedded view from `TemplateRef`. Most screens never need that.

I do not use `@HostBinding` and `@HostListener` on new code. The `host` object on the decorator is what current Angular docs show. It stays next to the selector and is easier to scan in review.

I do not put quote history inside the directive. History is state. A `scan` on the tick stream, or the parent row model, owns "what was mid last frame." The directive would otherwise hide product semantics behind CSS.

## Component

A component owns a template. Keep fetch and transport out of presentational rows. Keep DOM details out of the page that loads data.

```typescript
import { ChangeDetectionStrategy, Component, input, output } from "@angular/core";
import { QuoteDirectionDirective } from "./quote-direction.directive";

interface WatchlistRowModel {
  readonly instrumentId: string;
  readonly symbol: string;
  readonly mid: number;
  readonly previousMid: number | null;
}

@Component({
  selector: "app-watchlist-row",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button type="button" (click)="select.emit(row().instrumentId)">
      <span>{{ row().symbol }}</span>
      <span
        appQuoteDirection
        [mid]="row().mid"
        [previousMid]="row().previousMid"
      >
        {{ row().mid }}
      </span>
    </button>
  `,
  imports: [QuoteDirectionDirective],
})
export class WatchlistRow {
  readonly row = input.required<WatchlistRowModel>();
  readonly select = output<string>();
}
```

```typescript
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { WatchlistStore } from "./watchlist.store";

@Component({
  selector: "app-watchlist-page",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (row of store.rows(); track row.instrumentId) {
      <app-watchlist-row [row]="row" (select)="store.selectInstrument($event)" />
    }
  `,
  imports: [WatchlistRow],
})
export class WatchlistPage {
  readonly store = inject(WatchlistStore);
}
```

`input()` is a signal. The template still binds with `[row]`. `output()` replaces `@Output()` plus `EventEmitter` on new code. I still write `OnPush` when the interviewer may be on a version before v22.

### Why this, not otherwise

I split the row from the page because the row is easy to test with a frozen model and a click. Mixing HTTP into the row means every test of a price flash also stubs a socket. The route `providers` array owns `WatchlistStore`. The page only injects it.

I do not use `@Input()` and `@Output()` on new code. `input()` is readable as a signal in the template and in `computed`. That is the OnPush and zoneless notification path. The decorator form still exists for older compilers. Match the repo in front of you.

I do not use `model()` for the selected instrument. `model()` is two-way binding for a widget the child and parent both write, such as an expanded flag on a disclosure. Selection is page state. The child emits. The parent writes the store.

I do not call `ChangeDetectorRef.detectChanges` to "make OnPush work." If the row does not update, the model kept a stable identity while mutating fields. Replace the row object. See [OnPush notes](senior-angular-rxjs.md).

I do not put `HttpClient` on `WatchlistRow`. A presentational component receives data. It does not decide how quotes are subscribed.

## Router

The router decides which component tree exists for a URL. Guards change navigation. They do not authorize the server.

```typescript
import { inject } from "@angular/core";
import {
  CanActivateFn,
  provideRouter,
  Router,
  Routes,
  withComponentInputBinding,
} from "@angular/router";
import { SessionService } from "./session.service";
import { WatchlistStore } from "./watchlist.store";

export const authGuard: CanActivateFn = () => {
  const session = inject(SessionService);
  if (session.isAuthenticated()) {
    return true;
  }

  return inject(Router).createUrlTree(["/login"]);
};

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./login-page").then((module) => module.LoginPage),
    title: "Sign in",
  },
  {
    path: "watchlist",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./watchlist-page").then((module) => module.WatchlistPage),
    title: "Watchlist",
    providers: [WatchlistStore],
  },
  {
    path: "instruments/:symbol",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./instrument-page").then((module) => module.InstrumentPage),
    title: "Instrument",
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "watchlist",
  },
  {
    path: "**",
    loadComponent: () =>
      import("./not-found-page").then((module) => module.NotFoundPage),
    title: "Not found",
  },
];

export const appConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};
```

```typescript
import { Component, input } from "@angular/core";

@Component({
  selector: "app-instrument-page",
  template: `<h1>{{ symbol() }}</h1>`,
})
export class InstrumentPage {
  readonly symbol = input.required<string>();
}
```

`withComponentInputBinding()` maps the `:symbol` route param to the `symbol` input. Put more specific paths before parameterized ones. Put `**` last. Angular first-match wins.

### Why this, not otherwise

I use `loadComponent` for screens that are not needed to paint the first trading view. An eager `import` of the instrument page and its chart package puts that JavaScript on the critical path.

I use a functional `CanActivateFn` with `inject()`. Current routing docs start there. A class guard is extra types for a boolean check. Keep a class only when the codebase already has one and you are not converting it today.

I return a `UrlTree` on failure. Returning `false` leaves the user on a broken URL. Calling `router.navigate` inside the guard and also returning `false` races.

I put `WatchlistStore` on the route `providers` when that state should die with the watchlist URL. `providedIn: "root"` on that store would keep the previous account's rows after logout until something resets it. I do not also add `providers: [WatchlistStore]` on the page. Two providers mean two instances, and the page would not see the route store.

I do not treat `canActivate` as security. The API still serves quotes to a forged request. The guard is navigation UX.

I do not read `ActivatedRoute.snapshot.paramMap` in the constructor and ignore later param changes. Snapshot is one moment. The same component instance can be reused when only `:symbol` changes. `input()` plus `withComponentInputBinding`, or `toSignal(route.paramMap)`, stay current.

I do not bootstrap a new app with `RouterModule.forRoot`. `provideRouter` is the standalone entry.

I do not put the order ticket behind `@defer` or a lazy route if the user must see risk warnings on first paint. Lazy loading is a startup budget, not a hiding place for required UI. See [startup notes](senior-angular-rxjs.md).

## Signal

A signal is synchronously readable state. Call the getter. Angular tracks that read in templates, `computed`, `effect`, and `resource` params.

```typescript
import { computed, Injectable, signal } from "@angular/core";

interface Instrument {
  readonly id: string;
  readonly symbol: string;
  readonly contractMultiplier: number;
}

@Injectable({ providedIn: "root" })
export class InstrumentSelection {
  private readonly selectedId = signal<string | null>(null);
  private readonly catalog = signal<readonly Instrument[]>([]);

  readonly selectedIdView = this.selectedId.asReadonly();

  readonly selectedInstrument = computed(() => {
    const id = this.selectedId();
    if (id === null) {
      return null;
    }
    return this.catalog().find((instrument) => instrument.id === id) ?? null;
  });

  setCatalog(instruments: readonly Instrument[]): void {
    this.catalog.set(instruments);
  }

  select(id: string): void {
    this.selectedId.set(id);
  }

  clear(): void {
    this.selectedId.set(null);
  }
}
```

Expose `asReadonly()` so a panel can read selection and cannot call `set` on the field. `asReadonly` does not freeze nested objects. Do not mutate an `Instrument` in place.

### Why this, not otherwise

I use a writable signal for UI state the view can read now: selected id, panel open, ticket draft quantity. The template `{ selectedId() }` is enough for OnPush and zoneless to know the view is stale.

I do not use a `BehaviorSubject` for this. A subject is the right tool when callers subscribe, cancel, retry, or combine over time. Selected instrument is a current value. A signal is that current value. Wrapping it in RxJS adds subscribe and teardown for no time semantics.

I do not create the signal inside a method that the template calls. That allocates a new signal every check and never shares updates.

I do not deep-compare quotes with a custom `equal` by default. Default equality is `Object.is`. A new object with the same bid is a real update if sequence moved. Deep equality can hide that and can cost more than rendering. Normalize upstream. See [signal equality](senior-angular-rxjs.md).

I do not put the live WebSocket into a signal by assigning ticks in a random callback. Convert at a boundary with `toSignal` once, or keep the stream as an Observable until a view needs a signal.

## Computed

A computed signal derives a value from other signals. It is lazy and memoized. It is not writable.

```typescript
import { computed, inject, Injectable } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { QuoteFeed } from "./quote-feed";
import { InstrumentSelection } from "./instrument-selection";

@Injectable({ providedIn: "root" })
export class QuoteViewModel {
  private readonly quoteFeed = inject(QuoteFeed);
  private readonly selection = inject(InstrumentSelection);

  readonly quote = toSignal(this.quoteFeed.quotes$, { initialValue: null });

  readonly selectedQuote = computed(() => {
    const instrument = this.selection.selectedInstrument();
    const quotes = this.quote();
    if (instrument === null || quotes === null) {
      return null;
    }
    return quotes.get(instrument.id) ?? null;
  });

  readonly spread = computed(() => {
    const quote = this.selectedQuote();
    if (quote === null) {
      return null;
    }
    return quote.ask - quote.bid;
  });

  readonly notional = computed(() => {
    const instrument = this.selection.selectedInstrument();
    const quote = this.selectedQuote();
    if (instrument === null || quote === null) {
      return null;
    }
    return quote.ask * instrument.contractMultiplier;
  });
}
```

Create `toSignal` once on the field. It subscribes immediately and tears down with the injector.

### Why this, not otherwise

I use `computed` when the value is a function of signals already in memory. Spread is `ask - bid`. Recalculating it in three templates without memoization is wasted work. Duplicating it into another writable signal is a bug factory.

I do not write another signal from an `effect` to hold `spread`. That is derived state with extra timing. Angular's own guidance is to derive, not copy. If you need writable state that resets when a source signal changes, use `linkedSignal`. Not an effect.

I do not call HTTP inside `computed`. The derivation must be synchronous and pure. Async reads use `resource` or `rxResource`, or RxJS then `toSignal`.

I do not read signals after `await` inside a computed. The reactive context is synchronous. Those reads would not be tracked.

I do not use a plain getter on the class for values the template reads on every check. A getter is not memoized. `computed` caches until a dependency changes.

## Observable

An Observable models values over time. Use it for HTTP, sockets, user events you need to cancel or pace, and any stream you must share.

```typescript
import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from "rxjs";

interface Instrument {
  readonly id: string;
  readonly symbol: string;
}

@Injectable({ providedIn: "root" })
export class InstrumentSearch {
  private readonly http = inject(HttpClient);

  searchByQuery(query: string): Observable<readonly Instrument[]> {
    if (query.trim().length === 0) {
      return of([]);
    }

    return this.http
      .get<unknown>("/api/instruments", { params: { q: query } })
      .pipe(map((payload) => parseInstrumentList(payload)));
  }

  search(query$: Observable<string>): Observable<readonly Instrument[]> {
    return query$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((query) =>
        this.searchByQuery(query).pipe(
          catchError((error: unknown) => {
            logSearchFailure(query, error);
            return of([]);
          }),
        ),
      ),
    );
  }
}

declare function parseInstrumentList(payload: unknown): readonly Instrument[];
declare function logSearchFailure(query: string, error: unknown): void;
```

`HttpClient` is cold. Each subscription can start a new request. `switchMap` cancels the previous in-flight search when the query changes. `catchError` sits inside `switchMap` so one failed request does not kill the outer query stream.

### Why this, not otherwise

I use RxJS here because search has time semantics. Debounce, distinct query, cancel stale HTTP, keep listening after an error. A `Promise` per keystroke cannot cancel the previous request unless you thread `AbortSignal` yourself and still rebuild the rest of that pipeline.

I do not use `concatMap` for search. Old queries would still complete and could overwrite newer results.

I do not use `switchMap` for order submit. Cancelling the client subscription does not cancel the order on the server. Use `exhaustMap` or `concatMap` plus an idempotency key. See [flattening operators](senior-angular-rxjs.md).

I do not `subscribe` inside `switchMap`. Flattening operators already subscribe to the inner Observable. Nested `subscribe` hides cancel and error.

I do not put `shareReplay` on this search method's return value by default. Search is per consumer and per query. Sharing a socket is a different problem. See [hot and cold](senior-angular-rxjs.md).

I do not type `http.get<Instrument[]>`. Generics are erased. Parse `unknown` at the boundary.

`searchByQuery` lets a failed HTTP call error. `search` catches inside `switchMap` so the typeahead stays subscribed. I do not swallow errors in the HTTP method and then try to show an error banner from a store. The banner would never appear.

## Subject

A Subject is an Observable you can push into. It is hot and multicast. Values go to whoever is subscribed right now. The producer exists whether anyone is listening.

```text
Subject              late subscriber gets nothing until the next next()
BehaviorSubject      has a current value. Late subscriber gets that value now
ReplaySubject(n)     late subscriber gets up to n past values, then live values
AsyncSubject         everyone gets the last next(), and only after complete()
```

You subscribe the same way as any Observable. You unsubscribe the same way. Completing or erroring the Subject is a different act. That ends the stream for every consumer.

Do not expose the Subject on a public API. Keep `next`, `error`, and `complete` private. Publish `asObservable()`.

### Plain Subject. Events, not current state

Use this when a value is a moment. An alert fired. A user dismissed a banner. There is no "current alert" that a late screen should replay.

```typescript
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

interface PriceAlert {
  readonly id: string;
  readonly message: string;
}

@Injectable({ providedIn: "root" })
export class PriceAlertBus {
  private readonly alerts = new Subject<PriceAlert>();
  readonly alerts$: Observable<PriceAlert> = this.alerts.asObservable();

  publish(alert: PriceAlert): void {
    if (!this.alerts.observed) {
      logDroppedAlert(alert.id);
    }
    this.alerts.next(alert);
  }
}

declare function logDroppedAlert(alertId: string): void;
```

Two screens subscribe. Both hear `publish`. A third screen that arrives later hears nothing until the next alert. That is the point.

### BehaviorSubject. There is a current value

Use this when RxJS consumers need the latest value the instant they subscribe, and you must stay in Observables. It requires an initial value. A late subscriber gets that current value, then later `next` calls.

```typescript
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ActiveAccount {
  private readonly accountId = new BehaviorSubject<string | null>(null);
  readonly accountId$: Observable<string | null> = this.accountId.asObservable();

  setAccountId(accountId: string | null): void {
    this.accountId.next(accountId);
  }

  getAccountId(): string | null {
    return this.accountId.getValue();
  }
}
```

In Angular I still prefer a `signal` for this unless I need operators such as `distinctUntilChanged`, `switchMap`, or `combineLatest` on the account stream. A signal is a current value. A BehaviorSubject is a current value plus subscribe. Do not pay subscribe for a field the template can read with `accountId()`.

Do not invent a fake `Quote` so you can construct `new BehaviorSubject<Quote>(dummy)`. Use `ReplaySubject<Quote>(1)` or a `signal<Quote | null>(null)`.

### ReplaySubject. Last N without a dummy initial

Use `bufferSize: 1` when a late panel should see the last tick, and there is no honest initial tick.

```typescript
import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

interface QuoteTick {
  readonly instrumentId: string;
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
}

@Injectable({ providedIn: "root" })
export class LastTick {
  private readonly tick = new ReplaySubject<QuoteTick>(1);
  readonly tick$: Observable<QuoteTick> = this.tick.asObservable();

  setTick(tick: QuoteTick): void {
    this.tick.next(tick);
  }
}
```

`new ReplaySubject<QuoteTick>(100, 5_000)` also drops values older than five seconds. That is a time window, not a leak fix by itself.

Never `new ReplaySubject<QuoteTick>()` with no buffer size for market data. The default buffer is unbounded. Every tick stays in memory for the life of the Subject.

### AsyncSubject. Last value, and only when the work finishes

Use this for one-shot work whose consumers should wait until completion. It stores `next` calls and emits **only the last one**, and only when you `complete()`. After complete, late subscribers still get that last value, then complete.

```typescript
import { Injectable } from "@angular/core";
import { AsyncSubject, Observable } from "rxjs";

interface SessionSnapshot {
  readonly accountId: string;
  readonly instrumentIds: readonly string[];
}

@Injectable({ providedIn: "root" })
export class SessionBootstrap {
  private readonly ready = new AsyncSubject<SessionSnapshot>();
  readonly ready$: Observable<SessionSnapshot> = this.ready.asObservable();

  completeWith(snapshot: SessionSnapshot): void {
    this.ready.next(snapshot);
    this.ready.complete();
  }

  fail(error: unknown): void {
    this.ready.error(error);
  }
}
```

If you never `complete()`, nobody receives a value. That is the usual bug.

I almost never use this in a trading UI. A `resource`, a `Promise`, or a signal for session state is clearer. I would use AsyncSubject if I am already inside RxJS and several streams must wait for one finite result.

### Subscribe, unsubscribe, complete, error

These four are easy to mix up in an interview. They are not synonyms.

```typescript
import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PriceAlertBus } from "./price-alert-bus";

@Injectable()
export class PriceAlertToaster {
  private readonly bus = inject(PriceAlertBus);
  private readonly destroyRef = inject(DestroyRef);

  start(): void {
    this.bus.alerts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (alert) => showToast(alert.message),
        error: (error: unknown) => logAlertFailure(error),
        complete: () => logAlertComplete(),
      });
  }
}

declare function showToast(message: string): void;
declare function logAlertFailure(error: unknown): void;
declare function logAlertComplete(): void;
```

What each call does:

- `subscribe` adds one observer. The Subject does not start a new producer. It is already hot. If nobody is subscribed, `next` is thrown away. `observed` is false.
- One observer's `unsubscribe` removes that observer. Other screens keep receiving. The Subject stays open. `takeUntilDestroyed` does this on injector destroy.
- `subject.complete()` notifies every current observer with `complete`, then the Subject is dead. Later `next` calls are ignored. A new `subscribe` gets `complete` immediately and no values. `BehaviorSubject.getValue()` still returns the last value.
- `subject.error(error)` notifies every current observer with `error`, then the Subject is dead. Same terminal rules for `next`. `getValue()` throws that error. You cannot `next` your way out of it. Create a new Subject if the bus must live again.
- `subject.unsubscribe()` disposes the Subject itself. Further `next` or `subscribe` throws `ObjectUnsubscribedError`. `getValue()` throws too. Do not call this because one screen left. That is how you kill a root bus from a child.

`HttpClient` unsubscribe aborts an in-flight request. Subject unsubscribe does not. There is no request to abort unless you wired one.

Do not `http.get(url).subscribe(subject)` on a root Subject and walk away. That inner HTTP subscription is not tied to any component. It completes on its own for one-shot HTTP. For an infinite source it is a leak.

### Why this, not otherwise

I use a Subject when this code is the producer. Bridging `websocket.onmessage`, a DOM callback, or a button that several RxJS pipelines must hear.

I use `share` or `shareReplay` when the producer already is an Observable. Wrapping `connectQuoteSocket()` in a hand-rolled Subject is extra state. `shareReplay({ bufferSize: 1, refCount: true })` already multicasts and can disconnect at zero subscribers. See [hot and cold](senior-angular-rxjs.md).

I do not put a Subject on a component `output`. Use `output()`. Template `(alert)="..."` and `outputToObservable` when a parent needs operators. `EventEmitter` still exists. It extends Subject. New code uses `output()`.

I do not put `EventEmitter` in a service. Services are not template event bindings. A private Subject plus `asObservable()` is the service shape.

I do not use `new Subject<void>()` plus `takeUntil(this.destroyed$)` to tear down. `takeUntilDestroyed` is that pattern without a field you can forget to `complete()`.

I do not `error()` a shared quote or alert bus because one message failed to parse. That kills every subscriber. Log, skip, keep the bus. Error the inner HTTP Observable. Catch inside `switchMap`. Leave the multicast alive.

I do not `complete()` a root bus on navigate-away. Screens unsubscribe. The bus stays. Complete on process end or on a product event such as logout, and only if you will not `next` again on that instance.

I do not store quotes, tickets, and DOM refs in one `BehaviorSubject<AppState>`. Account switch never shrinks that object. See [Store](#store).

I do not `subscribe` inside `subscribe` to fan a Subject into another Subject. Operators already do that. Nested subscribe hides cancel.

I do not read `subject.observers`. That API is not how you decide lifetime. Use `observed`, or `refCount` on `share`.

## Subscription

Unsubscription is lifetime. Pick the API from what the consumer needs, not from the teardown helper you remember.

### Template only. AsyncPipe

```typescript
import { AsyncPipe } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, startWith } from "rxjs";
import { InstrumentSearch } from "./instrument-search";

@Component({
  selector: "app-instrument-search",
  imports: [AsyncPipe, ReactiveFormsModule],
  template: `
    <input [formControl]="query" type="search" />
    @if (results$ | async; as results) {
      <ul>
        @for (instrument of results; track instrument.id) {
          <li>{{ instrument.symbol }}</li>
        }
      </ul>
    }
  `,
})
export class InstrumentSearchBox {
  private readonly instrumentSearch = inject(InstrumentSearch);
  readonly query = new FormControl("", { nonNullable: true });
  readonly results$ = this.instrumentSearch.search(
    this.query.valueChanges.pipe(startWith(this.query.value)),
  );
}
```

### Value in TypeScript and the template. toSignal once

```typescript
import { Component, computed } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { interval } from "rxjs";

@Component({
  selector: "app-clock",
  template: `{{ seconds() }}`,
})
export class Clock {
  readonly seconds = toSignal(interval(1000), { initialValue: 0 });
  readonly isEven = computed(() => this.seconds() % 2 === 0);
}
```

### Imperative side effect. takeUntilDestroyed

```typescript
import { DestroyRef, inject, Injectable } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AlertFeed } from "./alert-feed";

@Injectable()
export class AlertToaster {
  private readonly alerts = inject(AlertFeed);
  private readonly destroyRef = inject(DestroyRef);

  start(): void {
    this.alerts.alerts$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (alert) => showToast(alert.message),
        error: (error: unknown) => logAlertFailure(error),
      });
  }
}

interface PriceAlert {
  readonly message: string;
}

declare function showToast(message: string): void;
declare function logAlertFailure(error: unknown): void;

abstract class AlertFeed {
  abstract readonly alerts$: import("rxjs").Observable<PriceAlert>;
}
```

Pass `DestroyRef` because `start()` is not an injection context. In a constructor, `takeUntilDestroyed()` with no argument is enough.

### Why this, not otherwise

If the template is the only reader, `AsyncPipe` subscribes, unsubscribes on destroy, and marks the view. A second `subscribe` on the same source in the same component doubles the HTTP or the socket work and splits teardown.

If TypeScript needs the current value and the template reads a signal, `toSignal` once on a field. Calling `toSignal` inside a click handler or inside `computed` opens a new subscription each time. That is a leak. `{ initialValue }` is a product state. An undefined first frame is also a product state. Pick one on purpose.

If the work is a toast, analytics, or any fire-and-forget side effect, `takeUntilDestroyed`. Do not `toSignal` a stream you never read as a view value.

I do not start with `ngOnDestroy` plus a `Subscription` bag. It works. It is more code. It is easy to forget one `add`. `takeUntilDestroyed` is the same lifetime.

I do not use `takeUntilDestroyed` for `setInterval` or `chart.destroy()`. Those are not Observables. Use `DestroyRef.onDestroy`.

I do not nest `subscribe` calls. Flatten with `switchMap` and friends.

Full decision tree: [memory handling](memory-handling.md).

## Effect

An effect runs imperative code when tracked signals change. Use it to talk to APIs that are not signals. Do not use it to store derived state.

```typescript
import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from "@angular/core";

interface QuoteTick {
  readonly bid: number;
  readonly ask: number;
}

@Component({
  selector: "app-sparkline",
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
})
export class Sparkline {
  readonly ticks = input.required<readonly QuoteTick[]>();
  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>("canvas");
  private readonly chart = signal<SparklineChart | null>(null);

  constructor() {
    afterNextRender(() => {
      this.chart.set(createSparkline(this.canvas().nativeElement));
    });

    effect((onCleanup) => {
      const chart = this.chart();
      const ticks = this.ticks();
      if (chart === null) {
        return;
      }

      chart.setTicks(ticks);
      onCleanup(() => {
        chart.clearDraft();
      });
    });

    inject(DestroyRef).onDestroy(() => {
      this.chart()?.destroy();
      this.chart.set(null);
    });
  }
}

interface SparklineChart {
  setTicks(ticks: readonly QuoteTick[]): void;
  clearDraft(): void;
  destroy(): void;
}

declare function createSparkline(canvas: HTMLCanvasElement): SparklineChart;
```

Create the third-party chart after the canvas exists. Update it when `ticks` change. Destroy the instance when the view dies. `onCleanup` runs when the effect re-runs or is destroyed. That is where you cancel work started by this run, not where you destroy a chart that should live for the whole component.

### Why this, not otherwise

I use `effect` for chart libraries, `localStorage` writes, and focus moves. Those APIs do not read signals. Something has to push.

I do not use `effect` to set `spreadSignal` from `bid` and `ask`. That is `computed`. Effects that write signals create extra invalidations and timing bugs. Interviewers notice.

I do not create the chart in the `effect` before the first render. Constructor effects can run before the canvas is in the DOM. `afterNextRender` is the hook that runs after the view commits. `afterRenderEffect` is the hook that should read layout after paint.

I do not skip `onCleanup` when the effect starts a timer or an inner request. Destroying the component later is too late if `ticks` changed and the old timer is still running.

I do not put a view-scoped chart effect in a `providedIn: "root"` service. That effect lives until the application dies and will capture the first canvas it saw.

I do not fetch in an effect and then `set` a result signal. Use `resource` or `rxResource` so Angular can abort on param change. Order submit is still not a resource. Aborting a GET is not rolling back a trade.

## Store

A store is shared feature state plus the methods that update it. Start with an injectable class of signals. Reach for NgRx SignalStore when that class grows methods, computed views, and RxJS in several consumers.

### Injectable signal store

Enough for one feature with a clear owner.

```typescript
import { computed, inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { QuoteFeed } from "./quote-feed";

interface WatchlistRowModel {
  readonly instrumentId: string;
  readonly symbol: string;
  readonly mid: number;
  readonly previousMid: number | null;
}

@Injectable()
export class WatchlistStore {
  private readonly quoteFeed = inject(QuoteFeed);
  private readonly instrumentIds = signal<readonly string[]>([]);
  private readonly selectedId = signal<string | null>(null);
  private readonly quotes = toSignal(this.quoteFeed.quotes$, {
    initialValue: new Map<string, QuoteTick>(),
  });

  readonly selectedIdView = this.selectedId.asReadonly();

  readonly rows = computed(() => {
    const quotes = this.quotes();
    return this.instrumentIds().flatMap((instrumentId) => {
      const tick = quotes.get(instrumentId);
      if (tick === undefined) {
        return [];
      }
      return [
        {
          instrumentId,
          symbol: tick.symbol,
          mid: (tick.bid + tick.ask) / 2,
          previousMid: tick.previousMid,
        } satisfies WatchlistRowModel,
      ];
    });
  });

  setInstruments(ids: readonly string[]): void {
    this.instrumentIds.set(ids);
  }

  selectInstrument(id: string): void {
    this.selectedId.set(id);
  }
}

interface QuoteTick {
  readonly instrumentId: string;
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
  readonly previousMid: number | null;
}
```

Provide this on the watchlist route or page, not `root`, if rows are session-specific.

### NgRx SignalStore when the feature grows

```typescript
import { computed, inject } from "@angular/core";
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from "rxjs";
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";
import { InstrumentSearch } from "./instrument-search";

interface WatchlistState {
  readonly query: string;
  readonly isLoading: boolean;
  readonly ids: readonly string[];
  readonly errorMessage: string | null;
}

const initialState: WatchlistState = {
  query: "",
  isLoading: false,
  ids: [],
  errorMessage: null,
};

export const WatchlistSearchStore = signalStore(
  withState(initialState),
  withComputed((store) => ({
    hasQuery: computed(() => store.query().trim().length > 0),
  })),
  withMethods((store, instrumentSearch = inject(InstrumentSearch)) => ({
    setQuery(query: string): void {
      patchState(store, { query });
    },
    search: rxMethod<string>(
      pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true, errorMessage: null })),
        switchMap((query) => instrumentSearch.searchByQuery(query)),
        tapResponse({
          next: (instruments) =>
            patchState(store, {
              ids: instruments.map((instrument) => instrument.id),
              isLoading: false,
            }),
          error: (error: unknown) => {
            logSearchFailure(error);
            patchState(store, {
              isLoading: false,
              errorMessage: "Search failed",
            });
          },
        }),
      ),
    ),
  })),
);

declare function logSearchFailure(error: unknown): void;
```

Provide `WatchlistSearchStore` on the component or route. `providedIn: "root"` only if every screen should share this search session.

`rxMethod` is the SignalStore way to run an Observable pipeline against store inputs. It is still `switchMap` for search. The flattening rule did not change.

### Why this, not otherwise

I start with an `@Injectable()` class of signals for a coding interview. The interviewer can read `set` and `computed` without a library. Provider scope still decides lifetime.

I move to SignalStore when the same feature has several consumers, a pile of `withMethods`, and RxJS that should live next to the state. `patchState` keeps updates in one place. `rxMethod` avoids a private `Subject` on the class.

I do not start a watchlist with classic NgRx `Store`, actions, reducers, and `@ngrx/effects`. That pattern pays off when many teams share one event log and you need time-travel on a large domain. For one screen it is a lot of types and files. If the company already runs it, match the company.

I do not keep a root `BehaviorSubject<AppState>` that holds quotes, tickets, and DOM refs. That object never shrinks. Account switch leaks. Components cannot OnPush on a slice without selectors you then have to invent.

I do not mutate `ids.push(id)` on store state. Same identity, OnPush skips, UI lies. `patchState` and `signal.set` take a new array.

I do not put `ElementRef` or chart instances in the store. The store is data and commands. The component that owns the canvas destroys the chart.

## Service

A service is a DI-backed object with a lifetime. The provider scope is the product decision.

```typescript
import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

@Injectable({ providedIn: "root" })
export class QuoteFeed {
  readonly quotes$: Observable<Map<string, QuoteTick>>;

  constructor() {
    this.quotes$ = connectQuoteSocket().pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
}

interface QuoteTick {
  readonly instrumentId: string;
  readonly symbol: string;
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
  readonly previousMid: number | null;
}

declare function connectQuoteSocket(): Observable<Map<string, QuoteTick>>;
```

```typescript
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";

@Injectable()
export class AccountWatchlistApi {
  private readonly http = inject(HttpClient);

  load(accountId: string): Observable<readonly string[]> {
    return this.http
      .get<unknown>(`/api/accounts/${accountId}/watchlist`)
      .pipe(map((payload) => parseInstrumentIds(payload)));
  }
}

declare function parseInstrumentIds(payload: unknown): readonly string[];
```

Register `AccountWatchlistApi` on the authenticated route `providers`. Inject `QuoteFeed` from root. Components depend on these contracts. They do not open WebSockets.

### Why this, not otherwise

`QuoteFeed` is `root` because many screens share one authenticated market connection. Two component-scoped sockets is a disconnect bug and extra subscriptions on the server.

`AccountWatchlistApi` is not `root` if it caches the last response in a field. A root cache keeps user A's list until the next load. Route or session providers die on logout. If the API is stateless HTTP with no cache, `providedIn: "root"` is fine.

I do not write `new QuoteFeed()` in a component. You lose the shared instance and you lose teardown tied to an injector.

I do not store `ElementRef`, template callbacks, or component instances on `QuoteFeed`. The feed outlives every screen. That is the leak in [memory handling](memory-handling.md).

I do not put reconnection protocol in the watchlist page. The page asks for quotes. The feed owns backoff, jitter, and when to stop retrying on auth failure.

I do not use a service as a dumping ground for pipes, directives, and routing. Those are different consumers. The service is ownership of one job.

## How I would say this in an interview

> Spread in five templates is a pure pipe. Spread used in TypeScript on one screen is `computed`. Bid class on a cell is a directive. The cell is not a component. The page is a component because it owns the template. The route owns the store provider. The URL owns which page exists, so the router lazy-loads it and binds `:symbol` to `input()`. Selected symbol is a signal. HTTP search is an Observable with `switchMap`. Alerts I produce myself are a private `Subject` and `asObservable()`. Last tick for a late panel is `ReplaySubject(1)`, not a dummy `BehaviorSubject`. The list in the template is `AsyncPipe`. A toast is `takeUntilDestroyed`. One screen unsubscribing does not `complete()` the root bus. A chart is an effect plus `afterNextRender`. Shared rows are a store provided on the route. The socket is a root service.

If they ask why not the other tool, start from lifetime and time semantics, not from which API you memorized last week.
