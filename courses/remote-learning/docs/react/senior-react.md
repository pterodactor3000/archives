# Senior React

These notes target React 19.2. Start answers with React's render model. Hook names matter less than knowing when React reads state, commits DOM, and runs effects.

Official references:

- [Thinking in React](https://react.dev/learn/thinking-in-react)
- [State as a snapshot](https://react.dev/learn/state-as-a-snapshot)
- [Queueing state updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Synchronizing with effects](https://react.dev/learn/synchronizing-with-effects)
- [You might not need an effect](https://react.dev/learn/you-might-not-need-an-effect)
- [React Hooks](https://react.dev/reference/react/hooks)
- [React Compiler](https://react.dev/learn/react-compiler)

## The render model

A component render is a function call. React gives that render a snapshot of props, state, and context. Event handlers created by the render close over that snapshot.

Rendering must stay pure:

- same inputs produce the same JSX
- no network calls, timers, subscriptions, or DOM writes during render
- do not mutate props, state, or values created outside the render

React may render more than once, pause work, or abandon a render. A side effect inside render can therefore run without a matching commit.

The rough sequence is:

```text
update scheduled
  -> render components
  -> reconcile element trees
  -> commit DOM changes
  -> run layout effects
  -> browser normally paints
  -> run remaining passive effects
```

`useLayoutEffect` runs after DOM mutation but before paint. It can block paint, so reserve it for layout measurement or a DOM correction that must happen before users see the frame.

React may run a passive effect caused by a discrete interaction before paint. Do not use `useEffect` when code must always wait for paint.

## State is a snapshot

This does not add three:

```tsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

Each call reads the same `count` from the current render. Use updater functions when the next state depends on queued state:

```tsx
setCount((currentCount) => currentCount + 1);
setCount((currentCount) => currentCount + 1);
setCount((currentCount) => currentCount + 1);
```

React batches state updates and processes them after the event handler finishes. Do not expect a state variable to change inside the handler that called its setter.

An event handler retains the render that created it. This explains stale closures in timers, promise callbacks, socket handlers, and effects.

## Choose state by ownership

Keep the smallest source of truth:

- derive values during render when possible
- keep transient form state near the form
- lift state to the nearest common owner when siblings must coordinate
- keep server data in a server-data layer
- keep high-rate external streams in a store built for subscriptions
- put state in the URL when navigation, sharing, or reload should preserve it

Do not copy props into state unless the copy is an intentional editable draft. Otherwise the two values drift.

Use a reducer when transitions matter more than individual setters. A reducer makes invalid transitions, audit logging, and tests easier to reason about.

```tsx
interface OrderDraft {
  readonly side: "buy" | "sell";
  readonly quantity: string;
}

interface ChangeQuantityAction {
  readonly type: "quantityChanged";
  readonly quantity: string;
}

interface ChangeSideAction {
  readonly type: "sideChanged";
  readonly side: OrderDraft["side"];
}

type OrderDraftAction = ChangeQuantityAction | ChangeSideAction;

function reduceOrderDraft(
  state: OrderDraft,
  action: OrderDraftAction,
): OrderDraft {
  switch (action.type) {
    case "quantityChanged":
      return { ...state, quantity: action.quantity };
    case "sideChanged":
      return { ...state, side: action.side };
  }
}
```

The reducer must be pure. Side effects belong at the command boundary.

## Identity, reconciliation, and keys

React preserves component state while the same component type remains at the same position in the tree. A different type or key resets that subtree.

Keys describe identity among siblings. They are not array positions.

Bad keys:

- array index when rows can reorder, insert, or disappear
- random values created during render
- display labels that are not unique or stable

Use a stable domain ID. A wrong key can attach local state, focus, or an in-progress edit to the wrong financial instrument.

`key` is special. A child does not receive it as a normal prop. Pass the ID separately if the child needs it.

## Effects synchronize external systems

An effect connects rendered state to something outside React:

- a browser API
- a WebSocket subscription
- a timer
- an imperative chart
- telemetry

Do not use an effect for:

- values derivable from props or state
- work caused by a specific click
- resetting all state when a key can define identity
- filtering or sorting that can run during render
- chains of state updates that encode one transition

Effect cleanup runs before the next setup with changed dependencies and on unmount. In development, Strict Mode runs an extra setup and cleanup cycle to expose missing cleanup.

```tsx
useEffect(() => {
  const controller = new AbortController();

  async function loadInstrument(): Promise<void> {
    try {
      const response = await fetch(`/api/instruments/${instrumentId}`, {
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load instrument ${instrumentId}: HTTP ${response.status}`,
        );
      }

      const payload: unknown = await response.json();
      setInstrument(parseInstrument(payload));
    } catch (error: unknown) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      reportInstrumentLoadFailure(instrumentId, error);
      setError(`Instrument ${instrumentId} is unavailable`);
    }
  }

  void loadInstrument();
  return () => controller.abort();
}, [instrumentId]);
```

Aborting avoids wasted client work when supported. The server may still have received a request. Never equate client cancellation with rollback of a financial command.

## Dependency arrays and stale closures

An effect dependency is every reactive value read by its setup code. Props, state, and functions declared inside the component are reactive.

Do not silence `exhaustive-deps` to force timing. Change the code:

- move an object or function inside the effect
- move non-reactive constants outside the component
- use a state updater to avoid reading current state
- split unrelated synchronization into separate effects
- use an Effect Event where current values must be read without resubscribing

A new object or function has new identity on each render. That matters only when something compares identity, such as a dependency array, a memoized child, or a context provider.

## Refs are mutable escape hatches

`useRef` stores a value across renders without scheduling another render.

Good uses:

- DOM references
- timer or request handles
- an imperative third-party instance
- a latest value needed by a callback that must keep stable identity

Do not read or write refs during render except for predictable one-time initialization. If changing the value should update the screen, it belongs in state.

## Memoization is a measured optimization

`memo`, `useMemo`, and `useCallback` can avoid work when identity stability lets React skip it.

They do not:

- fix impure rendering
- make a slow child cheap if its props always change
- stop context updates
- replace correct effect dependencies
- guarantee that cached values live forever

Measure first. A comparison can cost more than the render it avoids.

React Compiler can apply memoization automatically in compiled code. A project may not use the compiler, and third-party or unsupported code may opt out. Explain the render cause before proposing manual memoization.

## Context and external stores

When a provider value changes, React schedules consumers of that context. A freshly created provider object changes every render.

Ways to limit broad updates:

- split contexts by update rate and ownership
- keep the provider value stable when its contents did not change
- move frequently changing data to a selector-based external store
- place providers close to the consumers that need them

Do not put every market quote into one large context value. A tick can wake every consumer.

Use `useSyncExternalStore` for mutable data outside React. It defines subscription and snapshot semantics that work with concurrent rendering and server rendering.

```tsx
interface QuoteStore {
  subscribe: (onStoreChange: () => void) => () => void;
  getQuoteSnapshot: (instrumentId: string) => Quote | null;
}

interface Quote {
  readonly bid: number;
  readonly ask: number;
  readonly sequence: number;
}

function useQuote(
  quoteStore: QuoteStore,
  instrumentId: string,
): Quote | null {
  return useSyncExternalStore(
    quoteStore.subscribe,
    () => quoteStore.getQuoteSnapshot(instrumentId),
    () => null,
  );
}
```

`getSnapshot` must return the same value while the store has not changed. Returning a fresh object every call can cause repeated renders.

## Forms

A controlled input receives its current value from React and updates that value in `onChange`. Do not pass `value` without a synchronous change path.

An uncontrolled input keeps its value in the DOM. It can be simpler for basic forms and file inputs.

For financial forms:

- preserve the user's text while it is incomplete, such as `"-"` or `"1."`
- parse and validate at a defined boundary
- distinguish format errors from server rejection
- associate errors with controls
- disable accidental repeat submission, but rely on server idempotency
- keep the server authoritative for price, margin, permissions, and market status

Avoid formatting on every keystroke if it moves the caret or destroys valid intermediate input.

## Suspense, transitions, and errors

Suspense shows a fallback when a supported child suspends. It does not detect arbitrary data fetching started in an effect.

Place boundaries around useful loading units. One boundary around the whole application creates a disruptive blank state. Too many tiny boundaries cause visual noise.

`useTransition` marks non-urgent state updates. Urgent input stays responsive while React prepares lower-priority UI. It does not make CPU work disappear. Long synchronous JavaScript still blocks the main thread.

Error boundaries catch rendering errors in descendant components and show fallback UI. They do not catch errors from event handlers, most asynchronous callbacks, server rendering, or the boundary itself.

Handle command failures where the command runs. Use an error boundary for a broken render subtree.

## Strict Mode

Strict Mode adds development-only checks. It may:

- render components an extra time
- run effect setup and cleanup an extra time
- run ref callbacks an extra time
- check deprecated APIs

Do not remove Strict Mode to hide duplicate connections. Fix cleanup or move the side effect out of render.

## React 19 features worth knowing

### Actions

An Action is an async function used in a transition or form action. React can coordinate pending state, errors, optimistic state, and form reset around it.

- `useActionState` returns action state, a dispatch function, and pending state
- `useFormStatus` reads the nearest parent form's submission status
- `useOptimistic` shows a temporary value while an Action completes

Optimistic state is a user-experience choice. Do not show an order as filled before the server confirms it. A watchlist edit may be safe to show optimistically if rejection can roll it back clearly.

Actions do not add authentication, authorization, validation, or idempotency. The server boundary still owns those guarantees.

### The `use` API

`use` reads a supported resource such as a promise or context during render. A pending promise activates Suspense. A rejected promise reaches an error boundary.

Unlike ordinary Hooks, `use` may appear in a conditional or loop. It must still run inside a component or Hook.

Prefer a promise created by a server framework or cache. Creating a new promise during every Client Component render can suspend repeatedly.

### Effect Events

`useEffectEvent` extracts non-reactive logic from an effect. The Effect Event reads current props and state without causing the effect to resubscribe.

Call an Effect Event only from an effect. Do not use it to hide a dependency that should trigger synchronization.

### Refs

Function components can receive `ref` as a prop in React 19. New code often does not need `forwardRef`.

A callback ref may return cleanup. React runs it when the element detaches. Keep ref setup and cleanup symmetric, especially around imperative widgets.

### Activity

React 19.2 adds `<Activity>` with `"visible"` and `"hidden"` modes. Hidden content uses `display: none`, keeps its DOM and state, cleans up Effects, and processes updates at lower priority. React recreates Effects when the Activity becomes visible.

Use it for UI that is likely to return, such as inactive tabs with valuable draft state, or to prepare supported Suspense data before reveal. Do not use it as an authorization or confidentiality boundary because hidden DOM remains mounted.

Preserved DOM can keep native side effects alive. Media may continue playing unless effect cleanup pauses it. Test hidden and restored behavior, subscriptions, focus, memory, and background work.

## Real-time finance UI

Keep business ingestion separate from visible rendering:

```text
socket
  -> parse unknown payload
  -> validate sequence and units
  -> update latest state by instrument ID
  -> select rows used by this screen
  -> publish at a measured visual cadence
```

You may drop intermediate visual frames. Do not drop business events needed for positions, orders, audit, or reconciliation.

Track:

- input messages per second
- rejected and duplicate sequences
- sequence gaps
- socket reconnects
- message-to-visible latency
- long tasks and dropped frames

## Testing

Test behavior users can observe:

- render through public props and providers
- query by role and accessible name
- click, type, and tab as a user would
- verify loading, empty, stale, failure, and recovery states
- test cleanup by changing identity or unmounting
- test races with controlled deferred promises

Avoid tests that call component functions directly or assert hook implementation details.

## Questions to answer aloud

1. Why does calling a setter not change the current render's state?
2. When do three state updates produce one update versus three?
3. What causes React to preserve or reset component state?
4. What belongs in an effect?
5. Why is a missing effect dependency a correctness bug?
6. When does `useMemo` make performance worse?
7. Why can one context make a market watchlist rerender too broadly?
8. What contract does `useSyncExternalStore` provide?
9. What can an error boundary not catch?
10. How would you keep a live search responsive and race-free?
