import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Swatch,
  Table,
  Text,
  TextInput,
  UsageBar,
  useCanvasState,
  useHostTheme,
  type Color,
} from "cursor/canvas";

type Topic = "javascript" | "typescript" | "react" | "angular" | "css" | "html";
type Level = "core" | "tricky" | "trap";
type LevelFilter = "all" | "senior" | Level;

type Source = { label: string; href: string };

type Question = {
  id: string;
  topic: Topic;
  level: Level;
  q: string;
  why: string;
  answer: string;
  trap: string;
};

const TOPICS: { id: Topic; label: string; color: Color }[] = [
  { id: "javascript", label: "JavaScript", color: "yellow" },
  { id: "typescript", label: "TypeScript", color: "blue" },
  { id: "react", label: "React", color: "cyan" },
  { id: "angular", label: "Angular", color: "red" },
  { id: "css", label: "CSS", color: "purple" },
  { id: "html", label: "HTML", color: "orange" },
];

const LEVELS: { id: LevelFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "senior", label: "Senior (tricky + trap)" },
  { id: "trap", label: "Trap" },
  { id: "tricky", label: "Tricky" },
  { id: "core", label: "Core" },
];

const LEVEL_LABEL: Record<Level, string> = {
  core: "Core",
  tricky: "Tricky",
  trap: "Trap",
};

const QUESTIONS: Question[] = [
  // --- JavaScript ---
  {
    id: "js-event-loop",
    topic: "javascript",
    level: "trap",
    q: "What prints, and in what order: console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); queueMicrotask(() => console.log(4)); console.log(5);",
    why: "Seniors must have a working event-loop model, not 'async is later'. This is the most common JS live-coding trap.",
    answer:
      "1, 5, 3, 4, 2. The call stack runs to completion first (1 then 5). Then the microtask queue drains fully: Promise.then and queueMicrotask are both microtasks, in enqueue order (3 then 4). Then a macrotask from setTimeout (2). await continuations are also microtasks. Nested microtasks (a then that queues another then) keep draining before any timer.",
    trap: "Saying 1, 2, 3, 4, 5 or putting setTimeout before Promises. Also: assuming queueMicrotask and Promise.then are different phases — they are the same queue.",
  },
  {
    id: "js-map-parseint",
    topic: "javascript",
    level: "trap",
    q: "What is [1, 2, 3].map(parseInt), and why?",
    why: "Tests whether you know callback signatures, not whether you memorized a puzzle. Seniors should name the radix argument immediately.",
    answer:
      "Typically [1, NaN, NaN]. Array.map calls the callback as (value, index, array). parseInt(string, radix) treats the index as radix: parseInt('1', 0) → 1 (radix 0 means auto), parseInt('2', 1) → NaN (invalid radix), parseInt('3', 2) → NaN (3 is not binary). Fix: .map(Number) or .map((n) => parseInt(n, 10)).",
    trap: "Answering [1, 2, 3]. That is what people who forget map's extra arguments say.",
  },
  {
    id: "js-this-method",
    topic: "javascript",
    level: "trap",
    q: "Why does button.addEventListener('click', obj.handleClick) lose `this`, and what are the correct fixes in modern JS?",
    why: "Shows you understand binding vs arrows vs class fields, and that you will not ship a 'works in the console, dies in the handler' bug.",
    answer:
      "A method extracted from an object is an unbound function. In sloppy mode `this` is the global; in modules/strict it is undefined. Fixes: obj.handleClick.bind(obj); a wrapping arrow () => obj.handleClick(); a class public field handleClick = () => { ... } which closes over the instance; or addEventListener with an AbortController and a bound function you can remove. Do not use a regular prototype method if it will be passed as a callback.",
    trap: "Only saying 'use an arrow function' without knowing why class prototype methods still lose `this` when detached.",
  },
  {
    id: "js-await-loop",
    topic: "javascript",
    level: "tricky",
    q: "When is `for (const x of items) { await work(x) }` correct, and when is it a performance bug?",
    why: "Senior async design: sequential vs concurrent vs bounded concurrency. Interviewers want the tradeoff, not 'always Promise.all'.",
    answer:
      "Sequential await is correct when each step depends on the previous result, when you must respect rate limits, or when you need fail-fast ordering. If work is independent, Promise.all runs them concurrently. Promise.allSettled when you need every outcome. For hundreds of tasks, unbounded all() can melt the browser or the API — use a pool (p-limit) or a simple worker count. for-await-of is for async iterables (streams), not a substitute for all().",
    trap: "Always rewriting loops to Promise.all, including dependent steps, or never mentioning backpressure.",
  },
  {
    id: "js-microtask-starve",
    topic: "javascript",
    level: "tricky",
    q: "Can a chain of Promises starve setTimeout(fn, 0)? How do you yield to rendering?",
    why: "Explains jank, infinite microtask loops, and why 'defer with Promise' is not the same as 'defer with timeout'.",
    answer:
      "Yes. The microtask queue is drained until empty before the next macrotask (timers, I/O, rendering). A tight then/await loop never gives the browser a chance to paint or run timeouts. Yield with setTimeout(0), scheduler.yield() / scheduler.postTask, requestAnimationFrame for visual work, or MessageChannel as a macrotask. Do not spin Promise.resolve() in a hot loop expecting UI to update.",
    trap: "Believing setTimeout(0) runs 'immediately after the current function' — it runs after all current microtasks.",
  },
  {
    id: "js-typeof-null-realms",
    topic: "javascript",
    level: "trap",
    q: "Why is typeof null === 'object', and why can instanceof Array fail for a real array?",
    why: "Type-checks in production code, postMessage, iframes, and multiple bundles. Seniors catch cross-realm bugs.",
    answer:
      "typeof null === 'object' is a historical spec bug; null is not an object. Use == null for null/undefined, or Object.is. instanceof Array fails across realms (iframes, workers, some VM boundaries) because each realm has its own Array constructor. Use Array.isArray. Same trap for instanceof Error / Date with values from another window or from structuredClone in some older cases — prefer Array.isArray, ArrayBuffer.isView, and duck-typing with brand checks where needed.",
    trap: "Using instanceof Array in a library that receives values from iframes or Electron webviews.",
  },
  {
    id: "js-esm-cjs",
    topic: "javascript",
    level: "tricky",
    q: "How do ESM live bindings differ from CommonJS exports, and how do circular imports fail differently?",
    why: "Build tooling, dual packages, and 'undefined export' bugs. Senior frontend work is half bundler/runtime module graph.",
    answer:
      "ESM imports are live bindings: if the exporter does `export let count` and later increments it, importers see the new value. CJS `require` returns the `exports` object; property mutations are visible, but `module.exports = newValue` after a require is already cached is not retroactive for the importer's binding. Circular ESM: you can hit the temporal dead zone if you read a binding before its initializing module finishes. Circular CJS: you get a partial exports object (whatever was assigned so far). That is why default-export cycles are a classic bundler footgun.",
    trap: "Treating import and require as interchangeable, or saying 'ESM is just syntactic sugar over CJS'.",
  },
  {
    id: "js-sort",
    topic: "javascript",
    level: "trap",
    q: "Why does [10, 2, 1].sort() surprise people, and is sort stable?",
    why: "Data-table bugs in production. Looks junior until it ships.",
    answer:
      "The default comparator stringifies: '10' < '2' because '1' < '2', so you get [1, 10, 2]. Always pass (a, b) => a - b for numbers. Sort is stable as of ES2019 (equal elements keep original order) in modern engines — do not rely on stability in very old browsers. sort mutates in place and returns the same array; copy first ([...arr].sort(...)) if you need purity.",
    trap: "Assuming numeric sort, or spreading after sort thinking sort is immutable.",
  },
  {
    id: "js-weakmap",
    topic: "javascript",
    level: "tricky",
    q: "When do you use WeakMap / WeakSet instead of Map, and what can you not do with them?",
    why: "GC-aware metadata on DOM nodes, private fields before #private, and leak-free caches.",
    answer:
      "WeakMap keys must be objects. The key is held weakly: if nothing else references that object, the entry can be collected. You cannot iterate, size, or clear-by-enumeration — there is no list of keys, by design, so GC is not observable. Use it for private metadata on DOM nodes, memoizing per-object without pinning the object, or a library associating data with caller-owned objects. Map is correct when keys are strings/primitives or you must iterate. WeakRef / FinalizationRegistry exist but are easy to misuse; interviewers want you to be cautious.",
    trap: "Using WeakMap as a 'faster Map', or expecting .size / forEach.",
  },
  {
    id: "js-promise-executor",
    topic: "javascript",
    level: "trap",
    q: "Does the Promise constructor callback run synchronously? What happens if it throws?",
    why: "People wrap async APIs incorrectly and create Zalgo (sometimes sync, sometimes async) bugs.",
    answer:
      "The executor runs synchronously, immediately, on `new Promise(fn)`. `new Promise((resolve) => { console.log('a'); resolve(); }); console.log('b')` prints a then b. Then-handlers still run as microtasks after the current stack. A throw inside the executor rejects the promise. The executor's return value is ignored. Prefer async functions unless you are adapting a callback API — and then always resolve/reject, never mix sync throw after an async path has started.",
    trap: "Assuming nothing inside new Promise runs until .then, or using the constructor around an async function (anti-pattern).",
  },
  {
    id: "js-delegation",
    topic: "javascript",
    level: "core",
    q: "Explain bubbling vs capturing vs delegation. When do you use stopPropagation vs preventDefault?",
    why: "Every UI kit, modal, and 'click outside' implementation. Core, but seniors are expected to be precise.",
    answer:
      "Capture phase root → target, then bubble target → root. addEventListener(type, fn, true) or { capture: true } listens in capture. Delegation: one listener on a parent, inspect event.target / closest(). preventDefault stops the browser action (form submit, link nav, check). stopPropagation stops other listeners on ancestors; stopImmediatePropagation also stops other listeners on the same node. Prefer not stopping propagation unless you must — it breaks analytics and other handlers. For 'click outside', listen on document in capture and check composedPath() if Shadow DOM is involved.",
    trap: "Confusing preventDefault with stopPropagation. Using stopPropagation as the default way to 'fix' double handlers.",
  },
  {
    id: "js-leaks",
    topic: "javascript",
    level: "tricky",
    q: "Name three SPA memory-leak patterns you have actually hunted, and how you confirm them.",
    why: "Senior production debugging. Trivia people list 'closures'; seniors talk about detached DOM, listeners, and retainers in DevTools.",
    answer:
      "Common: (1) event listeners / ResizeObserver / MutationObserver not disconnected on unmount; (2) setInterval, websocket, or RxJS subscribe without teardown; (3) closures or global caches retaining large detached DOM subtrees or old route state; (4) Map keyed by objects that never die. Confirm with heap snapshots: take baseline, interact, force GC, compare retainers. Look for Detached HTMLElement growing. WeakMap for node metadata, AbortController for listeners, and explicit teardown in framework destroy hooks.",
    trap: "Only saying 'closures cause leaks'. Closures leak only if something long-lived holds them.",
  },

  // --- TypeScript ---
  {
    id: "ts-param-variance",
    topic: "typescript",
    level: "tricky",
    q: "Is (x: string) => void assignable to (x: string | number) => void? Why does this matter for callbacks?",
    why: "This is the function-parameter variance question. Seniors who have been burned by it can explain it in one minute.",
    answer:
      "No. A function that only accepts string cannot be used where the caller may pass a number. Parameters are checked contravariantly (under strictFunctionTypes). The other direction is fine: (x: string | number) => void can be used where a string-only callback is expected. Return types are covariant. Practical hit: Array<string>.push is not safe if you treat the array as Array<string | number>. Event handlers and React setState callbacks fail this way. If TS surprises you, draw the caller/callee arrows: who is allowed to pass what.",
    trap: "Treating functions like objects ('narrower is always assignable') and ignoring parameter direction.",
  },
  {
    id: "ts-excess-props",
    topic: "typescript",
    level: "trap",
    q: "Why does `const o = { a: 1, b: 2 }; const x: { a: number } = o` compile, but `{ a: 1, b: 2 } as a variable assigned inline to that type` error?",
    why: "Excess property checks. People think TS is structural until an object literal is rejected.",
    answer:
      "TypeScript is structural: extra properties on an existing variable are allowed when assigning to a narrower object type. Excess property checking applies to fresh object literals, to catch typos (`onClick` vs `onclick`). Workarounds: widen via a variable, index signature, or a type assertion (last resort). `satisfies` checks the value against a type without widening, and still flags unknown keys. For public APIs, prefer exact types via helper brands or eslint rather than hoping excess checks cover every path.",
    trap: "Saying TS is nominally typed, or that extra properties are always errors.",
  },
  {
    id: "ts-omit-union",
    topic: "typescript",
    level: "trap",
    q: "What goes wrong with Omit<A | B, 'k'> when A and B are object types, and how do you omit per-union-member?",
    why: "Real-world API types. Omit is implemented as Pick<T, Exclude<keyof T, K>> which does not distribute the way people expect.",
    answer:
      "keyof (A | B) is the intersection of keys, so Omit on a union can drop the wrong keys or produce a mush type that is neither A nor B. To omit per member, distribute: type DistributiveOmit<T, K extends keyof T> = T extends unknown ? Omit<T, K> : never. Same class of bug with Partial/Pick on unions and with component prop unions. When modeling 'this or that shape', keep the discriminant and transform each branch.",
    trap: "Sprinkling Omit on a union of request payloads and shipping a type that allows illegal combinations.",
  },
  {
    id: "ts-unknown-never",
    topic: "typescript",
    level: "core",
    q: "Contrast any, unknown, never, and void. Where does never show up in exhaustiveness checks?",
    why: "Baseline senior TS. If this is shaky, later generic questions collapse.",
    answer:
      "any disables checking — assignable both ways. unknown is the type-safe top type: you must narrow before use. never is the empty type: no value. A function that always throws or infinite-loops returns never. In a switch on a discriminated union, assign the remainder to never (`const _exhaustive: never = x`) so adding a variant becomes a compile error. void is 'ignore the return'; it is not never. Catch clauses should be unknown (useUnknownInCatchVariables) and narrowed.",
    trap: "Using any 'just for now' in app code, or confusing void with undefined.",
  },
  {
    id: "ts-distributive",
    topic: "typescript",
    level: "tricky",
    q: "Why does `T extends Foo ? A : B` distribute over unions, and how do you stop it?",
    why: "Every non-trivial utility type. Interviewers use this to see if you can read the TS handbook mentally.",
    answer:
      "A naked type parameter in a conditional (`T extends …`) distributes: (A | B) extends Foo ? X : Y becomes (A extends Foo ? X : Y) | (B extends Foo ? X : Y). That is why `NonNullable<T>` and `Extract` work. Wrap in a tuple to disable: `[T] extends [Foo] ? …`. Also watch `T extends any` as a distribute-on-purpose trick. Infer in conditionals (`infer R`) is how you unpack Promise/array/function return types.",
    trap: "Writing a conditional that accidentally splits a union and produces a type that is too wide.",
  },
  {
    id: "ts-enum",
    topic: "typescript",
    level: "trap",
    q: "Why do many codebases ban TypeScript enums? What do you use instead?",
    why: "Culture + runtime. Seniors should know numeric enums are a runtime object with reverse mappings.",
    answer:
      "Numeric enums are real objects at runtime, reverse-mapped (Enum[0] === 'A'), and a non-const enum is not a set of numbers — you can assign any number to a numeric enum in some configs. They complicate ESM/erasure and tree-shaking. Prefer union of string literals (`type Status = 'idle' | 'loading'`), or `as const` objects plus `typeof obj[keyof typeof obj]`. const enum inlines and has its own pitfalls with isolatedModules / Babel. If you need a runtime object, use the const object pattern explicitly.",
    trap: "Defending numeric enums as 'the TypeScript way' without knowing reverse mapping.",
  },
  {
    id: "ts-interface-type",
    topic: "typescript",
    level: "core",
    q: "When do you choose interface vs type alias? What can only one of them do?",
    why: "Asked constantly. A senior answer is short and accurate, not religious.",
    answer:
      "Both can describe object shapes. interface can be reopened (declaration merging) — required for module augmentation and lib DOM patches. type can express unions, tuples, mapped types, and intersections more naturally. For public object APIs that may be augmented, interface. For unions, mapped helpers, and function types, type. Do not bikeshed on app-internal props; be consistent. `implements` works with both in modern TS. Performance differences are rarely the reason in app code.",
    trap: "A long holy war with no mention of declaration merging.",
  },
  {
    id: "ts-branded",
    topic: "typescript",
    level: "tricky",
    q: "TypeScript is structural. How do you make UserId not assignable to OrderId?",
    why: "Domain modeling. This is how you stop 'stringly typed' IDs at a senior level.",
    answer:
      "Brand the type: `type UserId = string & { readonly __brand: 'UserId' }`. You cannot accidentally pass an OrderId. Create values via a constructor/assert function. Same idea for validated email, cents vs dollars, sanitized HTML vs raw string. Cost: JSON, APIs, and runtime are still strings — branding is compile-time only. Zod/io-ts give you runtime plus types. Do not over-brand every string; brand IDs and security boundaries.",
    trap: "Using class wrappers everywhere for IDs, or thinking branding is a runtime check.",
  },
  {
    id: "ts-satisfies",
    topic: "typescript",
    level: "tricky",
    q: "What problem does `satisfies` solve that a type annotation and `as const` do not?",
    why: "TS 4.9+ interview favorite. Shows you keep up without chasing trivia.",
    answer:
      "A type annotation (`const c: Config = { … }`) checks keys but widens values (string instead of 'dark'). `as const` preserves literals but does not check against Config. `const c = { theme: 'dark', … } as const satisfies Config` keeps literal types and still errors on missing/unknown keys. Use it for route tables, theme tokens, and exhaustiveness-friendly maps. `as const` on a mutating structure is the wrong tool.",
    trap: "Using `as Config` (assertion) which skips checking extra/missing keys.",
  },
  {
    id: "ts-index-access",
    topic: "typescript",
    level: "trap",
    q: "What does noUncheckedIndexedAccess change, and why do teams turn it on for senior-quality code?",
    why: "The `arr[0]` is T lie. Production undefined crashes.",
    answer:
      "With the flag, `arr[i]`, `record[key]`, and `tuple[n]` (for non-literal n) become T | undefined. You must narrow. That matches runtime: JS does not throw on bad indexes. Cost: more noise at map lookups you believe are complete. Mitigations: `.at()`, `Map.get` (already T | undefined), tiny helpers, or a checked `getOrThrow`. Pair with strictNullChecks. Interviewers like 'I want this flag in new apps'.",
    trap: "Writing `users[0].id` in a typed codebase and calling it safe.",
  },
  {
    id: "ts-discriminated",
    topic: "typescript",
    level: "core",
    q: "How do you type a result that is either success or failure so that data is only available on success?",
    why: "Everyday API/state modeling. If they use boolean `error` plus optional `data`, they are junior.",
    answer:
      "Discriminated union: `{ ok: true; data: T } | { ok: false; error: E }`. Switch/if on `ok` narrows. Same for UI state: `{ status: 'idle' } | { status: 'loading' } | { status: 'success'; data: T } | { status: 'error'; error: E }` — never `data?: T` on a loading state. Type predicates (`function isCat(x: Animal): x is Cat`) and `in` checks are the other narrowing tools. Avoid overlapping optionals that allow `{ data, error }` both set.",
    trap: "A single interface with optional fields for every state.",
  },

  // --- React ---
  {
    id: "re-stale-closure",
    topic: "react",
    level: "trap",
    q: "A component has const [n, setN] = useState(0) and useEffect(() => { const id = setInterval(() => setN(n + 1), 1000); return () => clearInterval(id) }, []). Why does it stuck at 1?",
    why: "The stale-closure question. If you miss this, you miss half of hooks.",
    answer:
      "The effect captured n = 0 forever because of []. Each tick does setN(0 + 1). Fix with the updater: setN(c => c + 1), which reads latest state. Other fixes: include n in deps (resets the interval every tick — usually wrong), or store latest in a ref. Rules: effects close over render values; deps must match what you read; functional updates and refs are how you read 'latest' without resubscribing. React Compiler reduces some of this; do not assume it in interviews unless they use it.",
    trap: "Adding n to the dependency array as the first answer without noticing it recreates the interval every second.",
  },
  {
    id: "re-keys",
    topic: "react",
    level: "tricky",
    q: "What does a key actually do? When is changing a key a feature, and when is it a bug?",
    why: "Reconciliation, form state, animations, and 'why did my input keep the wrong value'.",
    answer:
      "Keys are identity for the reconciler among siblings. Same key + same type → update in place (state preserved). Different key → unmount/remount (state reset). Index keys break on insert/reorder/filter — items reuse the wrong state. Using key={user.id} is correct when the row is that user. Changing key on a form or a router outlet is a legitimate reset. Accidental key changes (Math.random(), new Date()) remount every render and kill perf plus wipe state.",
    trap: "Saying keys are 'for performance' only, or using index keys 'because ESLint is optional'.",
  },
  {
    id: "re-strict-effect",
    topic: "react",
    level: "trap",
    q: "Why does React 18 Strict Mode run effects twice in development, and what must your effect do about it?",
    why: "People think they have a double-fetch bug. Seniors know it is a purity check.",
    answer:
      "Dev-only remount: mount → cleanup → mount, to surface missing cleanup and impure subscriptions. Production mounts once (unless you actually unmount). Effects must be idempotent: subscribe/unsubscribe, connect/disconnect, AbortController on fetch. Do not 'fix' this by removing Strict Mode or with a ref lock that skips the second run in a way that also skips cleanup. For data fetching, abort in cleanup or use a library (TanStack Query) that dedupes.",
    trap: "Disabling Strict Mode, or a module-level `let loaded = false` that breaks HMR and tests.",
  },
  {
    id: "re-context",
    topic: "react",
    level: "tricky",
    q: "Why does putting a huge object on Context re-render the whole tree, and what are the senior mitigations?",
    why: "State architecture. This is where people invent Redux without knowing why.",
    answer:
      "Any consumer of that context re-renders when the provider value fails Object.is. A new object/array/function each provider render invalidates everyone. Mitigate: split context (state vs dispatch), memoize the value, put unstable callbacks behind useCallback, consume in a small child so siblings skip, or a selector library. React 19 compiler / `use` changes some of this — still do not pass a 50-field app store through one context. Colocate state first; context is not global state by default.",
    trap: "Wrapping every consumer in memo() while the provider still does value={{ ...state, setState }} every render.",
  },
  {
    id: "re-useless-memo",
    topic: "react",
    level: "trap",
    q: "You wrap an expensive child in memo and pass style={{ margin: 8 }}. Why does memo not help?",
    why: "Referential equality. Seniors should know when memo is a no-op.",
    answer:
      "Inline objects/functions are new references every parent render, so memo's shallow compare fails. Same for children={<Icon />} if that creates a new element identity you depend on incorrectly. Fix: hoist static style, useMemo for real derived objects, or stop memoing. Parent re-render still runs the parent function; memo only skips the child. Profile first. useMemo of a number/string is usually noise. After React Compiler, manual memo is often redundant — say that, then still explain the model.",
    trap: "Sprinkling memo/useCallback everywhere as a style, with no profiler evidence.",
  },
  {
    id: "re-concurrent",
    topic: "react",
    level: "tricky",
    q: "When do you use startTransition vs useDeferredValue vs Suspense?",
    why: "React 18+ senior bar. They want a product example, not the API list.",
    answer:
      "startTransition marks a setState as non-urgent (filtered list, tab switch) so typing stays snappy; isPending for pending UI. useDeferredValue keeps showing the previous derived value (deferred search results) while the urgent input updates. Suspense is for a component that suspends on an async read (lazy, a cache that throws a promise / `use`). Do not put character-by-character input inside a transition. Do not use Suspense as a substitute for error handling — pair with an error boundary. Transitions can be interrupted; they are not 'run later for sure'.",
    trap: "Wrapping everything in startTransition, or saying Concurrent Mode makes useEffect run in parallel.",
  },
  {
    id: "re-error-boundary",
    topic: "react",
    level: "trap",
    q: "What will an error boundary not catch?",
    why: "Production 'white screen of death' reviews. People over-trust the boundary.",
    answer:
      "It catches render/lifecycle errors in descendants. It does not catch: event handlers, async code (setTimeout, fetch then), SSR errors in some setups, errors in the boundary itself, or errors in the parent. Handle those with try/catch, promise .catch, and window onunhandledrejection as a last net. In function components you still need a class boundary or react-error-boundary. Reset with a key on the boundary after a recoverable error.",
    trap: "Wrapping a click handler's logic in an error boundary and expecting it to catch thrown errors from onClick.",
  },
  {
    id: "re-hydration",
    topic: "react",
    level: "tricky",
    q: "What causes a hydration mismatch, and why does useId exist?",
    why: "Next.js / SSR interviews. Senior frontend is server HTML plus client takeover.",
    answer:
      "The first client render must produce the same DOM as the server HTML. Mismatches: Date.now(), Math.random(), `typeof window` branches that change markup, locale/timezone formatting, invalid HTML that the browser 'fixed' before React hydrates, extensions injecting nodes. Symptoms: warnings, broken event handlers, duplicated UI. useId generates stable, isomorphic IDs for a11y (label/input) without a counter that drifts. suppressHydrationWarning is a last resort on a specific text node (e.g. a timestamp), not a global mute.",
    trap: "Guarding with `if (typeof window)` inside render to 'fix' SSR, which is exactly how you get a mismatch.",
  },
  {
    id: "re-mutate",
    topic: "react",
    level: "trap",
    q: "You push into stateArray then setState(stateArray). Why does the UI not update?",
    why: "Immutability is not style — it is how React decides to re-render.",
    answer:
      "React bails out when Object.is(next, prev) is true. Mutating the same array/object keeps the same reference. Copy: setItems([...items, x]), or immer, or a library. Nested updates need copies at each changed level (or structural sharing via a helper). The same bug exists with useReducer. Mutating then returning a new wrapper that still shares a mutated child can also confuse memo children. DevTools 'highlight updates' will show nothing because there was no update.",
    trap: "Blaming memo, Redux, or 'React is broken' instead of the reference.",
  },
  {
    id: "re-layout-effect",
    topic: "react",
    level: "tricky",
    q: "useLayoutEffect vs useEffect — and why does the SSR warning exist?",
    why: "Measure/tooltip/focus bugs vs paint delay. Seniors know the paint timing.",
    answer:
      "useEffect runs after paint (async). useLayoutEffect runs after DOM mutations, before the browser paints — use it to measure (getBoundingClientRect) and synchronously adjust to avoid a flicker. It blocks paint, so keep it tiny. There is no layout effect on the server, so using it in a component that SSR's warns: the server skipped it, the client will run it, which can mismatch. Pattern: useEffect unless you see a flash; or a useIsomorphicLayoutEffect that degrades on server. Prefer CSS for layout that you were about to measure.",
    trap: "Using useLayoutEffect for data fetching 'because it is faster'.",
  },
  {
    id: "re-rsc",
    topic: "react",
    level: "tricky",
    q: "What can you not pass from a Server Component into a Client Component, and why?",
    why: "React 19 / Next app-router senior interviews. The serialization boundary is the whole point.",
    answer:
      "Props across the `'use client'` boundary must be serializable: JSON-like data, richer Flight types (Date, Map in supported runtimes), and Server Actions (special tagged functions). You cannot pass class instances, arbitrary functions, or Symbols. Children can be a server-rendered slot into a client wrapper — that is composition, not 'passing a function'. Fetch on the server, pass data down. Client components can import other client modules freely; they cannot import server-only modules. Keep client leaves small.",
    trap: "Passing an onClick from a server file, or marking the whole app `'use client'` to make the error go away.",
  },
  {
    id: "re-portal-events",
    topic: "react",
    level: "trap",
    q: "A modal is portaled to document.body. A click inside it still triggers a parent React onClick. Why?",
    why: "Modal + 'click outside' bugs. Distinguishes DOM tree from React tree.",
    answer:
      "createPortal puts DOM in body, but React synthetic events bubble through the React tree (the component that rendered the portal), not the DOM parent. A parent with onClick will see the inner click. Native document listeners still see DOM bubbling from body. For click-outside: listen on document, ignore composedPath that includes the dialog, or use the Dialog/popover top layer. stopPropagation inside the modal stops React bubbling to React parents — and can surprise you the other way.",
    trap: "Assuming portal events only exist on document.body and never reach React parents.",
  },

  // --- Angular ---
  {
    id: "ng-expr-changed",
    topic: "angular",
    level: "trap",
    q: "What is ExpressionChangedAfterItHasBeenCheckedError, and what is the wrong fix?",
    why: "The Angular rite of passage. Seniors explain the dev-mode extra CD pass.",
    answer:
      "In development Angular runs an extra change-detection pass to verify the model is stable. If a binding changes after it was checked in the same cycle (classic: write to a parent-bound value in ngAfterViewInit, or a getter that is not pure), you get this error. Correct fixes: compute the value earlier, use a pipe/async or signal so CD is scheduled properly, afterNextRender / queue a microtask then markForCheck for legitimate view-measurement cases. Wrong: setTimeout to paper over it, or turning off the error. The bug is still there in production; you just lose the assertion.",
    trap: "setTimeout(0) as the standard fix, or 'it only happens in dev so ignore it'.",
  },
  {
    id: "ng-onpush",
    topic: "angular",
    level: "tricky",
    q: "With ChangeDetectionStrategy.OnPush, when does Angular actually check the component?",
    why: "This is the Angular senior question. Default vs OnPush is not enough — they want the trigger list.",
    answer:
      "OnPush checks when: an @Input reference changes, an event originated from the component or its children, you call markForCheck() (or async pipe / signal write, which do that for you), or the component is explicitly detectChanges()'d. detectChanges runs now on that view tree. markForCheck marks the path to root dirty for the next cycle. Default strategy checks every component every cycle — fine until the tree is huge. OnPush is not 'skip forever'; it is 'skip unless one of those triggers'.",
    trap: "Saying OnPush 'only checks when inputs change' and forgetting events, async pipe, and signals.",
  },
  {
    id: "ng-onpush-mutate",
    topic: "angular",
    level: "trap",
    q: "You mutate this.user.name = 'Ada' in an OnPush component. The template still shows the old name. Why?",
    why: "Same family as React mutation, plus Angular CD. Two frameworks, one lesson.",
    answer:
      "OnPush compares @Input by reference. Mutating a field does not change the reference, and a local mutation is not an @Input change. No event fired if you mutated from a non-template path (a service callback without markForCheck). Fix: replace the object ({ ...user, name }), use a signal, call markForCheck, or use immutable patterns in the store. Default strategy might still refresh on the next global CD, which hides the bug until you switch to OnPush — that is why teams hit this during a performance pass.",
    trap: "Switching back to Default CD instead of fixing the data flow.",
  },
  {
    id: "ng-di",
    topic: "angular",
    level: "tricky",
    q: "providedIn: 'root' vs 'platform' vs 'any' vs component providers — which instance do you get?",
    why: "Angular DI is a hierarchy. Seniors debug 'why are there two services'.",
    answer:
      "root: one tree-shakable singleton for the app. platform: one per platform injector (rare; multiple Angular apps on a page). any: one per lazily loaded route injector — easy to accidentally create multiple caches. Component/directive providers: one instance per component instance, useful for a widget's local state. Element vs environment injectors matter for directives. inject() vs constructor is style; @Self @SkipSelf @Optional @Host change lookup. A providedIn root service that depends on a component-level service is a design smell.",
    trap: "providedIn: 'any' thinking it means 'whatever, just inject it', then seeing duplicate HTTP caches in lazy routes.",
  },
  {
    id: "ng-subscribe",
    topic: "angular",
    level: "trap",
    q: "Why is a raw subscribe() in ngOnInit a leak, and what is the modern teardown?",
    why: "Angular memory leaks. Still happens in 2026 codebases.",
    answer:
      "Observables can be hot and infinite (fromEvent, websocket, store). The component dies; the subscription lives and calls set-on-destroyed-view. Use async pipe, takeUntilDestroyed() (injection context or pass DestroyRef), or firstValueFrom for one-shot. Signals + resource/rxjs interop (toSignal with { manualCleanup } care) for template reads. Do not unsubscribe in ngOnDestroy by hand for every stream if takeUntilDestroyed covers it — but do still think about whether the source should complete. HTTP Client typically completes; fromEvent does not.",
    trap: "Unsubscribing HTTP calls religiously while leaving fromEvent and store subscriptions open.",
  },
  {
    id: "ng-signals-rxjs",
    topic: "angular",
    level: "tricky",
    q: "When do you use a signal vs an RxJS stream in current Angular?",
    why: "Post-zone, signals-era Angular interviews. They want judgment, not a rewrite manifesto.",
    answer:
      "Signals: synchronous component/local state, derived values (computed), cheap template reads, OnPush-friendly. RxJS: time (debounce, retry, exhaustMap), multicasting, websockets, composition of async sources. Bridge with toSignal / toObservable. Do not rebuild exhaustMap in an effect. Do not put every mouse move in a signal. effects are for side effects, not for deriving state — derived state belongs in computed. untracked() to read without creating a dependency. Zoneless apps rely on signals (and explicit marks) instead of monkey-patched async.",
    trap: "Rewriting a working websocket pipeline into nested effects because 'signals replaced RxJS'.",
  },
  {
    id: "ng-changes-ref",
    topic: "angular",
    level: "trap",
    q: "Why does ngOnChanges not fire when the parent mutates a property on the same object it passed in?",
    why: "Input identity. Pairs with OnPush mutation.",
    answer:
      "ngOnChanges runs when Angular sees a new input binding value (new reference for objects). Mutating a field on the same object is invisible. SimpleChanges previous/current will look equal by ref. Prefer immutable inputs, a setter on @Input, an input signal, or a setter + ngOnChanges for primitives. Do not deep-watch in ngDoCheck unless you measured and you know you are writing a custom CD check — ngDoCheck runs a lot.",
    trap: "Implementing ngDoCheck JSON.stringify deep compare on a large tree.",
  },
  {
    id: "ng-content-view",
    topic: "angular",
    level: "tricky",
    q: "ViewChild vs ContentChild: what do they query, and when are they set?",
    why: "Projection vs view. People mix them up in reusable components.",
    answer:
      "ViewChild/ViewChildren query the component's own template. ContentChild/ContentChildren query projected light-DOM (ng-content). Timing: static: true available in ngOnInit (only if always present). Otherwise ViewChild after ngAfterViewInit, ContentChild after ngAfterContentInit. Querying a projected component that itself is inside *ngIf can be undefined until later — subscribe to changes QueryList. ng-content select='[slot]' is not a portal; it is projection, not moving lifecycle to the parent unexpectedly. After Angular 17+, viewChild() / contentChild() signal queries are the modern API.",
    trap: "ViewChild for a projected tab pane, then wondering why it is always undefined.",
  },
  {
    id: "ng-zone",
    topic: "angular",
    level: "tricky",
    q: "What does NgZone.runOutsideAngular do, and how does zoneless change the answer?",
    why: "Perf + high-frequency events (scroll, mousemove, charts).",
    answer:
      "Zone.js patches async APIs so Angular knows to CD after timeouts, XHR, events. runOutsideAngular skips that for noisy work (canvas rAF, third-party widgets); re-enter with zone.run() or markForCheck when you have a real UI update. Cost of zones: overhead and surprising CD. Zoneless / signals: you do not rely on patches; updates come from signals, async pipe, markForCheck, or event coalescing. Then 'runOutsideAngular' is less central; you still avoid doing heavy work in CD. Know both answers — many enterprises are mid-migration.",
    trap: "runOutsideAngular around a click handler that must update the view, then wondering why the view is stale.",
  },
  {
    id: "ng-trackby",
    topic: "angular",
    level: "trap",
    q: "What goes wrong with *ngFor / @for without trackBy / track, especially with inputs that have focus?",
    why: "Lists, tables, forms. Same idea as React keys.",
    answer:
      "Without identity, Angular tears down and recreates DOM when the array is replaced (new fetch, sort, immutable store emit). Inputs lose focus, videos restart, component state dies, animations glitch, perf tanks. trackBy: (i, item) => item.id. In new @for, `track item.id` is required. Do not track by index if the list reorders. Do not track by object identity if you replace objects every emit — use a stable business id.",
    trap: "trackBy: index as a default, which is as wrong as React index keys on a sortable list.",
  },
  {
    id: "ng-cva",
    topic: "angular",
    level: "tricky",
    q: "When do you implement ControlValueAccessor, and what happens if you skip it?",
    why: "Reusable form controls. Senior Angular library work.",
    answer:
      "CVA is the bridge between Angular forms (template or reactive) and a custom UI control. You implement writeValue, registerOnChange, registerOnTouched, setDisabledState. Provide NG_VALUE_ACCESSOR. Without it, [(ngModel)] / formControlName will not write into your component; you will fight with two sources of truth. Also implement validators via NG_VALIDATORS when the control has internal rules. Prefer composing native inputs when you can — CVA is for real widgets (date picker, tag input), not for wrapping a single <input> unless you need extra behavior.",
    trap: "Using @Input() value + @Output() valueChange and calling it 'works with forms' because you also have ngModel on a child input.",
  },
  {
    id: "ng-encapsulation",
    topic: "angular",
    level: "core",
    q: "Emulated vs ShadowDom vs None view encapsulation — which do you pick and why?",
    why: "Styling bugs, :host, and design systems.",
    answer:
      "Emulated (default): Angular rewrites selectors with attributes, no real Shadow DOM — global styles can still leak in depending on how they are written; ::ng-deep is deprecated. ShadowDom: real shadow root, true isolation, slots; some global CSS and third-party libs break; good for widgets. None: all styles global, last-wins, easy to leak; sometimes used at the app shell. :host and :host-context are the supported piercing tools. Prefer Emulated + a design-system layer over None.",
    trap: "::ng-deep everywhere, or ShadowDom on the whole app without checking a component library.",
  },

  // --- CSS ---
  {
    id: "css-stacking",
    topic: "css",
    level: "trap",
    q: "You set z-index: 9999 and the element still paints under a sibling with z-index: 1. Why?",
    why: "Modals, dropdowns, sticky headers. The stacking-context trap.",
    answer:
      "z-index only compares among siblings in the same stacking context. A new context is created by positioned + z-index other than auto, opacity < 1, transform, filter, isolation, will-change, and a few others. Your 9999 is trapped inside a parent context that sits under the sibling's context. Fix: hoist the overlay (portal to body), or manage stacking at the parent that actually competes. Inspect in DevTools 'Layers' / stacking. Do not keep raising 9999.",
    trap: "z-index: 2147483647 as a strategy.",
  },
  {
    id: "css-flex-min",
    topic: "css",
    level: "trap",
    q: "A flex/grid child with overflow: auto will not shrink and blows out the layout. What is the default you forgot?",
    why: "Every dashboard, table, and chat pane. Seniors have a reflex for this.",
    answer:
      "Flex items default to min-width: auto (min-height: auto in a column), which means they refuse to shrink below their content's intrinsic size. Overflow never kicks in. Fix: min-width: 0 (or minmax(0, 1fr) on the grid track), or overflow: hidden on the flex item. 1fr is minmax(auto, 1fr), so it has the same trap — use minmax(0, 1fr). This is not a browser bug.",
    trap: "max-width: 100% on a random ancestor until it 'kinda works'.",
  },
  {
    id: "css-fixed-transform",
    topic: "css",
    level: "trap",
    q: "position: fixed no longer tracks the viewport. What CSS on an ancestor did that?",
    why: "Sticky headers, transform animations, will-change, and filter on a parent.",
    answer:
      "A transform, perspective, filter, or contain on an ancestor creates a containing block for fixed (and a new stacking context). The 'fixed' element is then positioned against that ancestor, not the viewport. Same family: transform on a parent breaks position: sticky because sticky is relative to its nearest scroll ancestor / containing block rules. Fix: do not put transform on the page wrapper; apply animation on a child; portal the overlay out.",
    trap: "Rewriting to position: absolute and fighting scroll, instead of finding the transforming ancestor.",
  },
  {
    id: "css-bfc-margin",
    topic: "css",
    level: "tricky",
    q: "Why do vertical margins collapse, and how does a BFC change that?",
    why: "Spacing bugs, 'my margin disappeared', float containment.",
    answer:
      "Adjacent vertical margins of in-flow block boxes collapse to the max (with rules for negative). Parent/child collapse when the parent has no padding/border/BFC separating them — the child's margin 'hangs out'. A block formatting context (BFC) contains internals: overflow other than visible, display: flow-root, flex/grid items, floats, etc. flow-root is the modern 'contain floats and stop collapse' without a scrollbar. Flex/grid children do not collapse margins with each other the same way. Prefer gap on flex/grid over sibling margins.",
    trap: "Adding extra wrapper divs with padding: 1px to 'fix' collapse without knowing why.",
  },
  {
    id: "css-vh",
    topic: "css",
    level: "trap",
    q: "Why is 100vh wrong on mobile, and what do you use instead?",
    why: "Full-screen layouts, iOS URL bar. Product bug, not trivia.",
    answer:
      "vh is 1% of the large viewport on many mobile browsers, so 100vh is taller than the visible area when the toolbars show — content sits under the chrome or causes scroll. Use dvh (dynamic), svh (small), lvh (large). 100dvh tracks the visible viewport as chrome shows/hides. Also consider dvh + safe-area-inset-* for notches. 100% height only works with a definite-height parent chain. For desktop, 100dvh ≈ 100vh.",
    trap: "JS window.innerHeight listeners as the first tool, ignoring dvh.",
  },
  {
    id: "css-is-where",
    topic: "css",
    level: "tricky",
    q: "How do :is(), :where(), and :has() affect specificity? Where do @layer fit?",
    why: "Modern cascade. Design-system seniors live here.",
    answer:
      ":is() takes the specificity of its most specific argument. :where() is always zero-specificity — ideal for resets and base components you want easy to override. :has() is a parent selector; its specificity includes the argument. @layer orders entire buckets (reset, components, utilities) so a simple class in a later layer wins over a high-specificity selector in an earlier one — better than !important wars. Important in a layer vs unlayered has its own inversion rules; know that unlayered styles beat layered ones unless !important is involved.",
    trap: "Still using !important in component CSS because 'specificity is too high', without :where or layers.",
  },
  {
    id: "css-box",
    topic: "css",
    level: "core",
    q: "Content-box vs border-box: which do you set globally, and what still surprises people?",
    why: "Baseline. Still asked. Answer fast and move to a harder follow-up.",
    answer:
      "content-box (default): width is the content; padding and border add. border-box: width includes padding and border — what layout math wants. Global `*, *::before, *::after { box-sizing: border-box }` is standard. Exceptions: some third-party widgets. width: 100% plus padding on a content-box parent still overflows. min/max-width interact with box-sizing. Stretching replaced elements (img) has object-fit, not box-sizing, as the usual issue.",
    trap: "Setting box-sizing only on body, which does not inherit to children (box-sizing is not inherited).",
  },
  {
    id: "css-containing",
    topic: "css",
    level: "tricky",
    q: "What is the containing block for absolute vs sticky vs fixed, in one pass?",
    why: "Positioning interviews. Sticky bugs are containing-block bugs.",
    answer:
      "absolute: nearest positioned ancestor (not static), else the initial containing block. fixed: the viewport, unless a transform/filter/perspective/contain ancestor makes a new containing block. sticky: relative until a threshold in its nearest scroll ancestor; it cannot stick outside that ancestor. A parent with overflow: hidden/auto is a common reason sticky 'does nothing'. Percent top/left resolve against the containing block, not the parent’s padding box in every case — check spec for the mode you are in.",
    trap: "Putting overflow: auto on a wrapper and then wondering why position: sticky on a child header failed.",
  },
  {
    id: "css-pct-height",
    topic: "css",
    level: "trap",
    q: "height: 100% does nothing. What must be true of the parent?",
    why: "Classic. Still fails take-homes.",
    answer:
      "Percentage height resolves against the parent's specified height. If the parent's height is auto (content-sized), the percentage is treated as auto. You need a definite height on the chain: html, body { height: 100% } or a flex/grid child that stretches (align-items: stretch with a definite container). min-height: 100% has similar traps. Prefer flex/grid fill (`flex: 1; min-height: 0`) over percentage-height pyramids.",
    trap: "height: 100vh on every nested container until scrollbars appear.",
  },
  {
    id: "css-cls",
    topic: "css",
    level: "tricky",
    q: "Name three CSS/HTML causes of layout shift (CLS) you would fix in a senior performance pass.",
    why: "Core Web Vitals. Frontend seniors own this with perf, not just 'add a spinner'.",
    answer:
      "Images/video without width/height or aspect-ratio; web fonts swapping (FOIT/FOUT) without fallback metrics / font-display / size-adjust; injecting banners/ads above in-flow content; late CSS that changes sizes; animations that change top/left instead of transform. Fixes: width/height attributes or aspect-ratio, reserved slots, font-display: optional/swap with matched fallback, transform/opacity for motion, content-visibility with care. Measure in field data (INP/LCP/CLS), not only Lighthouse locally.",
    trap: "Animating top/left for a 'smooth' drawer and then being surprised by CLS and main-thread cost.",
  },
  {
    id: "css-layer-order",
    topic: "css",
    level: "tricky",
    q: "A utility class loses to a component selector even though it comes later in the file. Walk the cascade.",
    why: "They want origin → layer → specificity → order, not 'whoever is last'.",
    answer:
      "Cascade: origin and importance (user-agent, user, author; then !important inverted), then @layer order (earlier layers lose to later; unlayered author styles beat layered), then specificity, then appearance order. A component ID/element combo in an unlayered stylesheet beats a later utility in @layer utilities. Tailwind-style systems win because utilities sit in a last layer. Shadow DOM has its own order. Inline style beats classes except !important wars. Answer with this stack; then pick the smallest lever (layer, not !important).",
    trap: "Only comparing class vs class specificity and ignoring layers/origin.",
  },

  // --- HTML ---
  {
    id: "html-aria-first",
    topic: "html",
    level: "trap",
    q: "What is the first rule of ARIA, and why is <div role='button'> a senior-level smell?",
    why: "A11y interviews. Seniors reach for native HTML before ARIA.",
    answer:
      "If a native element has the semantics and behavior, use it. A real <button> gives keyboard (Enter/Space), focus, form default-type, disabled, and AT role for free. role='button' on a div needs tabindex, key handlers, disabled styling, and still misses form semantics. ARIA names things; it does not add behavior. Prefer <a href> for navigation, <button> for actions, <input> types for data. role='menu' without keyboard model is worse than a list of links.",
    trap: "Adding aria-label to a div click handler and calling the page accessible.",
  },
  {
    id: "html-script-defer",
    topic: "html",
    level: "tricky",
    q: "Compare script, async, defer, and type='module' for parser blocking and order.",
    why: "Performance and 'why is my widget undefined'. Classic HTML interview.",
    answer:
      "Classic <script src> without async/defer: fetch+execute, parser blocked. async: download parallel, execute as soon as ready (order not preserved), still blocks parser at execute. defer: download parallel, execute after document parse, in order. type='module' is deferred by default, plus CORS and strict mode; async on a module means don't wait for document parse order. modulepreload for critical modules. document.write from a late script is a disaster. Put classic blocking scripts in the wrong place and you wreck LCP.",
    trap: "async on a bundle that assumes jQuery loaded first, or putting type=module and also defer (redundant, not the bug — the bug is async on ordered modules).",
  },
  {
    id: "html-button-type",
    topic: "html",
    level: "trap",
    q: "Why does a <button> inside a <form> submit the form when you did not ask it to?",
    why: "The most expensive one-line HTML bug in admin UIs.",
    answer:
      "The default type of <button> is submit, not button. Inside a form, a click (or Enter in an input) activates the submit button. Always set type='button' for non-submit actions, type='submit' for the real submit. Implicit submission: Enter in a single text field submits even without a click. One submit control + novalidate / requestSubmit() / constraint validation API for custom UX. type='reset' is almost never what users want.",
    trap: "preventDefault on the click of a nested button and still seeing a submit because Enter triggered requestSubmit.",
  },
  {
    id: "html-noopener",
    topic: "html",
    level: "trap",
    q: "Why did target='_blank' used to be a security bug, and is rel='noopener' still required?",
    why: "Tabnabbing. Interviewers still ask; a senior should know the current default too.",
    answer:
      "The opened page could access window.opener and navigate the original tab (phishing). rel='noopener' (and noreferrer) severs opener. Modern browsers now set noopener by default for target=_blank, but many codebases still add it for older browsers and for intent documentation. rel='noreferrer' also drops the Referer. Do not use target=_blank without a reason — it surprises users and can look like an overlay attack. window.open should pass noopener as well.",
    trap: "Saying it is only a SEO hint, or that noopener is obsolete so you never think about opener.",
  },
  {
    id: "html-label",
    topic: "html",
    level: "core",
    q: "Two correct ways to associate a label with a control. What breaks if you do neither?",
    why: "Forms + a11y. Easy points if precise.",
    answer:
      "Wrap the control in <label>, or set label[for] = control.id (id must be unique in the document). Clicking the label then focuses/activates the control — bigger hit target. Screen readers announce the name. Placeholder is not a label. aria-label is a backup when visible text is truly absent. Nested interactive content inside a label (a link plus an input) is a mess. Don't use a <div> with a click handler as a fake label.",
    trap: "Matching with a wrapper <div> and CSS only, no for/id, then failing an a11y audit.",
  },
  {
    id: "html-sandbox",
    topic: "html",
    level: "tricky",
    q: "iframe sandbox='allow-scripts allow-same-origin' — why is that combination dangerous?",
    why: "Embeds, CMS, design tools. Security-aware frontend.",
    answer:
      "sandbox uniquely origins the iframe and disables powerful features. allow-scripts lets it run JS. allow-same-origin lets it access the origin's storage/DOM as that origin. Together, the framed page can remove the sandbox attribute and escape. If you need scripts, do not also grant same-origin unless the content is fully trusted. Prefer a distinct origin (CSP frame-ancestors, cookie SameSite, COOP/COEP as relevant). allow-top-navigation is another privilege to treat as dangerous.",
    trap: "Copy-pasting a sandbox attribute list until the embed 'works', including both flags.",
  },
  {
    id: "html-srcset",
    topic: "html",
    level: "tricky",
    q: "Why does srcset without sizes often pick the wrong image?",
    why: "Responsive images. Seniors should not ship 3x desktop PNGs to phones.",
    answer:
      "For width descriptors (1000w), the browser needs sizes to know the layout width; default is 100vw, so it may download a huge image for a 200px slot. sizes='(min-width: 800px) 400px, 100vw' is the contract. Density descriptors (2x) are simpler for fixed CSS-pixel sizes. <picture> is for art direction / format (webp/avif), not a substitute for srcset on a single image. Always include a src fallback. width/height or aspect-ratio to avoid CLS.",
    trap: "Only adding srcset='a.jpg 1x, b.jpg 2x' on a fluid full-bleed hero.",
  },
  {
    id: "html-hidden-inert",
    topic: "html",
    level: "trap",
    q: "hidden vs aria-hidden vs inert vs display: none — which still leaves a focusable control in the tab order?",
    why: "Modals and 'offscreen' menus that trap keyboard users. High-severity a11y.",
    answer:
      "display: none and the hidden attribute (typically display: none) remove from rendering and the a11y tree; not focusable. visibility: hidden is invisible but may still affect layout; generally not focusable. aria-hidden='true' hides from AT but does not remove focus — a control can still be tabbed to, announced as empty or skipped inconsistently: a serious bug. inert (and dialog's top layer) makes a subtree unfocusable and inert to AT. For a closed menu, inert or hidden, not only aria-hidden. Offscreen CSS (clip) without inert is a classic screen-reader-only vs keyboard mismatch.",
    trap: "aria-hidden on a modal's background while a button behind it is still tabbable.",
  },
  {
    id: "html-dialog",
    topic: "html",
    level: "tricky",
    q: "When do you use <dialog>, popover, or details/summary instead of a custom modal?",
    why: "Native HTML caught up. Seniors should not reimplement focus trap by default.",
    answer:
      "<dialog>.showModal() gives top layer, backdrop, Esc to close (light dismiss depends), and focus trap. popover attribute is for non-modal lightweight UI (menus, tooltips) with light dismiss and top layer, no full modal inerting of the page the same way. details/summary is disclosure, not a dialog — no focus trap, good for FAQ. Custom div modals must recreate focus trap, labelling (aria-labelledby), scroll lock, and stacking. Prefer native, then a tested library. Auto-focus the first field carefully; don't yank focus on every rerender.",
    trap: "A custom modal that sets aria-modal=true but never moves focus into it.",
  },
  {
    id: "html-xss",
    topic: "html",
    level: "trap",
    q: "Why is innerHTML with API data a vulnerability even if you 'strip script tags'?",
    why: "Frontend owns XSS as much as backend. Senior bar.",
    answer:
      "XSS is not only <script>. Event handlers (onerror on <img>), javascript: URLs, svg/mathml, and incomplete sanitizer bypasses. textContent / innerText assign text. For rich text, a real sanitizer (DOMPurify) with a strict allowlist, or a framework that default-escapes (React children). href, src, and style are injection sinks too. Trusted Types make accidental innerHTML throw. Never use innerHTML to 'set text'. Markdown rendered without sanitization is HTML injection.",
    trap: "replace('<script>', '') as sanitization, or dangerouslySetInnerHTML because the CMS 'is trusted'.",
  },
  {
    id: "html-preload",
    topic: "html",
    level: "tricky",
    q: "preload vs prefetch vs preconnect vs modulepreload — which one can hurt LCP if you misuse it?",
    why: "Perf interviews. Resource hints are not free.",
    answer:
      "preconnect / dns-prefetch: early connection to a critical origin (font CDN, API). preload: this navigation, high priority, you will use it now (hero image, font, critical CSS). modulepreload: JS modules and their graph. prefetch: likely next navigation, lowest priority. Over-preloading competes with the real LCP image/CSS and can delay LCP. preload without matching use is wasted bytes. Fonts: preload the used subset/weight, font-display, and avoid preloading every weight. Measure; don't cargo-cult a dozen preloads.",
    trap: "preload on every route's JS and images 'for speed'.",
  },
  {
    id: "html-parser",
    topic: "html",
    level: "tricky",
    q: "Give two HTML parser quirks that make the DOM not match your source, and how that breaks React/Angular hydration or CSS.",
    why: "Invalid HTML is a framework bug factory. Seniors read the parsed tree, not the file.",
    answer:
      "A <p> cannot contain a <div>; the parser closes the p first — your 'inside' div is a sibling. Tables invent a tbody. Nested <a> or <button> is illegal; the parser repairs it. <li> implied closures. If the server renders invalid HTML, the browser repairs it, then the framework hydrates against a different tree → mismatch. CSS selectors written for the source nest fail. Validate, use the right parent (div/section), and look at the Accessibility / Elements tree, not just the component template.",
    trap: "Blaming the framework for 'duplicate tags' that the HTML parser created.",
  },
];

const SOURCES: Record<string, Source> = {
  "js-event-loop": {
    label: "MDN: Microtasks and the JavaScript runtime",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide/In_depth",
  },
  "js-map-parseint": {
    label: "MDN: Array.prototype.map callback arguments",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#parameters",
  },
  "js-this-method": {
    label: "MDN: this as a DOM event handler",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this#as_a_dom_event_handler",
  },
  "js-await-loop": {
    label: "MDN: Promise.all",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
  },
  "js-microtask-starve": {
    label: "MDN: Using microtasks with queueMicrotask()",
    href: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide",
  },
  "js-typeof-null-realms": {
    label: "MDN: Array.isArray (works across realms)",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray",
  },
  "js-esm-cjs": {
    label: "MDN: JavaScript modules",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
  },
  "js-sort": {
    label: "MDN: Array.prototype.sort (default compare + stability)",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
  },
  "js-weakmap": {
    label: "MDN: WeakMap",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap",
  },
  "js-promise-executor": {
    label: "MDN: Promise() constructor (executor runs immediately)",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise",
  },
  "js-delegation": {
    label: "MDN: Event bubbling and capture",
    href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling",
  },
  "js-leaks": {
    label: "Chrome DevTools: Fix memory problems",
    href: "https://developer.chrome.com/docs/devtools/memory-problems",
  },
  "ts-param-variance": {
    label: "TypeScript: strictFunctionTypes",
    href: "https://www.typescriptlang.org/tsconfig/strictFunctionTypes.html",
  },
  "ts-excess-props": {
    label: "TypeScript Handbook: Excess property checks",
    href: "https://www.typescriptlang.org/docs/handbook/2/objects.html#excess-property-checks",
  },
  "ts-omit-union": {
    label: "TypeScript Handbook: Distributive conditional types",
    href: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types",
  },
  "ts-unknown-never": {
    label: "TypeScript Handbook: never and exhaustiveness",
    href: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking",
  },
  "ts-distributive": {
    label: "TypeScript Handbook: Conditional types",
    href: "https://www.typescriptlang.org/docs/handbook/2/conditional-types.html",
  },
  "ts-enum": {
    label: "TypeScript Handbook: Enums",
    href: "https://www.typescriptlang.org/docs/handbook/enums.html",
  },
  "ts-interface-type": {
    label: "TypeScript Handbook: Type aliases vs interfaces",
    href: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces",
  },
  "ts-branded": {
    label: "TypeScript FAQ: Can I make a type alias nominal?",
    href: "https://github.com/microsoft/TypeScript/wiki/FAQ#can-i-make-a-type-alias-nominal",
  },
  "ts-satisfies": {
    label: "TypeScript 4.9: The satisfies operator",
    href: "https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-9.html#the-satisfies-operator",
  },
  "ts-index-access": {
    label: "TypeScript: noUncheckedIndexedAccess",
    href: "https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html",
  },
  "ts-discriminated": {
    label: "TypeScript Handbook: Discriminated unions",
    href: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
  },
  "re-stale-closure": {
    label: "React: Updating state based on the previous state",
    href: "https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state",
  },
  "re-keys": {
    label: "React: Keeping list items in order with key",
    href: "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key",
  },
  "re-strict-effect": {
    label: "React: Strict Mode (re-running Effects in development)",
    href: "https://react.dev/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development",
  },
  "re-context": {
    label: "React: Passing data deeply with Context",
    href: "https://react.dev/learn/passing-data-deeply-with-context",
  },
  "re-useless-memo": {
    label: "React: memo",
    href: "https://react.dev/reference/react/memo",
  },
  "re-concurrent": {
    label: "React: startTransition",
    href: "https://react.dev/reference/react/startTransition",
  },
  "re-error-boundary": {
    label: "React: Catching rendering errors with an error boundary",
    href: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
  },
  "re-hydration": {
    label: "React: hydrateRoot (mismatches)",
    href: "https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html",
  },
  "re-mutate": {
    label: "React: Updating arrays in state",
    href: "https://react.dev/learn/updating-arrays-in-state",
  },
  "re-layout-effect": {
    label: "React: useLayoutEffect",
    href: "https://react.dev/reference/react/useLayoutEffect",
  },
  "re-rsc": {
    label: "React: 'use client' (serializing props to Client Components)",
    href: "https://react.dev/reference/rsc/use-client",
  },
  "re-portal-events": {
    label: "React: createPortal",
    href: "https://react.dev/reference/react-dom/createPortal",
  },
  "ng-expr-changed": {
    label: "Angular: NG0100 ExpressionChangedAfterItHasBeenCheckedError",
    href: "https://angular.dev/errors/NG0100",
  },
  "ng-onpush": {
    label: "Angular: Skipping component subtrees (OnPush)",
    href: "https://angular.dev/best-practices/skipping-subtrees",
  },
  "ng-onpush-mutate": {
    label: "Angular: Skipping subtrees — mutating object references",
    href: "https://angular.dev/best-practices/skipping-subtrees",
  },
  "ng-di": {
    label: "Angular: Hierarchical injectors",
    href: "https://angular.dev/guide/di/hierarchical-dependency-injection",
  },
  "ng-subscribe": {
    label: "Angular: takeUntilDestroyed",
    href: "https://angular.dev/api/core/rxjs-interop/takeUntilDestroyed",
  },
  "ng-signals-rxjs": {
    label: "Angular: RxJS interoperability with signals",
    href: "https://angular.dev/guide/signals/rxjs-interop",
  },
  "ng-changes-ref": {
    label: "Angular: ngOnChanges / OnChanges",
    href: "https://angular.dev/api/core/OnChanges",
  },
  "ng-content-view": {
    label: "Angular: Component queries (view vs content)",
    href: "https://angular.dev/guide/components/queries",
  },
  "ng-zone": {
    label: "Angular: Zoneless",
    href: "https://angular.dev/guide/zoneless",
  },
  "ng-trackby": {
    label: "Angular: @for (track is required)",
    href: "https://angular.dev/api/core/@for",
  },
  "ng-cva": {
    label: "Angular: ControlValueAccessor",
    href: "https://angular.dev/api/forms/ControlValueAccessor",
  },
  "ng-encapsulation": {
    label: "Angular: Component styling / view encapsulation",
    href: "https://angular.dev/guide/components/styling",
  },
  "css-stacking": {
    label: "MDN: Stacking context",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context",
  },
  "css-flex-min": {
    label: "CSS Flexbox spec: Automatic Minimum Size of Flex Items",
    href: "https://www.w3.org/TR/css-flexbox-1/#min-size-auto",
  },
  "css-fixed-transform": {
    label: "MDN: position fixed (transformed ancestors)",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/position#fixed",
  },
  "css-bfc-margin": {
    label: "MDN: Mastering margin collapsing",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing",
  },
  "css-vh": {
    label: "MDN: Viewport-percentage lengths (svh, lvh, dvh)",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport",
  },
  "css-is-where": {
    label: "MDN: :where() (zero specificity) vs :is()",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/:where",
  },
  "css-box": {
    label: "MDN: box-sizing",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing",
  },
  "css-containing": {
    label: "MDN: Containing block",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block",
  },
  "css-pct-height": {
    label: "MDN: height percentage",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/height#percentage",
  },
  "css-cls": {
    label: "web.dev: Cumulative Layout Shift (CLS)",
    href: "https://web.dev/articles/cls",
  },
  "css-layer-order": {
    label: "MDN: @layer / cascade layers",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS/@layer",
  },
  "html-aria-first": {
    label: "W3C: First rule of ARIA use",
    href: "https://www.w3.org/TR/using-aria/#firstrule",
  },
  "html-script-defer": {
    label: "MDN: script async, defer, and type=module",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#blocking_and_deferring_scripts",
  },
  "html-button-type": {
    label: "MDN: button type (default is submit)",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#type",
  },
  "html-noopener": {
    label: "MDN: <a> target=_blank and noopener",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target",
  },
  "html-label": {
    label: "MDN: label",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label",
  },
  "html-sandbox": {
    label: "MDN: iframe sandbox",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#sandbox",
  },
  "html-srcset": {
    label: "MDN: img srcset and sizes",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset",
  },
  "html-hidden-inert": {
    label: "MDN: inert",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert",
  },
  "html-dialog": {
    label: "MDN: dialog",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog",
  },
  "html-xss": {
    label: "OWASP: Cross Site Scripting Prevention Cheat Sheet",
    href: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html",
  },
  "html-preload": {
    label: "MDN: rel=preload",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel/preload",
  },
  "html-parser": {
    label: "MDN: p (parser closes on nested blocks)",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p",
  },
};

function sourceOf(q: Question): Source {
  return SOURCES[q.id];
}

const DRILL = [
  "js-event-loop",
  "js-map-parseint",
  "re-stale-closure",
  "ng-expr-changed",
  "css-stacking",
  "css-flex-min",
  "html-button-type",
  "html-sandbox",
] as const;

function topicMeta(id: Topic) {
  return TOPICS.find((t) => t.id === id)!;
}

function matchesLevel(q: Question, filter: LevelFilter) {
  if (filter === "all") return true;
  if (filter === "senior") return q.level === "tricky" || q.level === "trap";
  return q.level === filter;
}

function matchesQuery(q: Question, raw: string) {
  const s = raw.trim().toLowerCase();
  if (!s) return true;
  return (
    q.q.toLowerCase().includes(s) ||
    q.answer.toLowerCase().includes(s) ||
    q.trap.toLowerCase().includes(s) ||
    q.why.toLowerCase().includes(s) ||
    q.topic.includes(s) ||
    (SOURCES[q.id]?.label.toLowerCase().includes(s) ?? false)
  );
}

function QuestionRow({ q }: { q: Question }) {
  const theme = useHostTheme();
  const meta = topicMeta(q.topic);
  const source = sourceOf(q);
  return (
    <CollapsibleSection
      title={q.q}
      leading={<Swatch color={meta.color} />}
      trailing={
        <Text size="small" tone="tertiary">
          {LEVEL_LABEL[q.level]}
        </Text>
      }
    >
      <Stack gap={10} style={{ paddingBottom: 8 }}>
        <Stack gap={4}>
          <Text size="small" weight="semibold" tone="secondary">
            Why they ask
          </Text>
          <Text>{q.why}</Text>
        </Stack>
        <Stack gap={4}>
          <Text size="small" weight="semibold" tone="secondary">
            Strong senior answer
          </Text>
          <Text
            style={{
              padding: 10,
              background: theme.fill.tertiary,
              borderRadius: 6,
            }}
          >
            {q.answer}
          </Text>
        </Stack>
        <Callout tone="warning" title="Common fail">
          {q.trap}
        </Callout>
        <Stack gap={4}>
          <Text size="small" weight="semibold" tone="secondary">
            Source
          </Text>
          <Link href={source.href}>{source.label}</Link>
        </Stack>
      </Stack>
    </CollapsibleSection>
  );
}

export default function SeniorFrontendInterviewQuestions() {
  const [topic, setTopic] = useCanvasState<Topic | "all">("topic", "all");
  const [level, setLevel] = useCanvasState<LevelFilter>("level", "senior");
  const [query, setQuery] = useCanvasState("query", "");

  const filtered = QUESTIONS.filter(
    (q) =>
      (topic === "all" || q.topic === topic) &&
      matchesLevel(q, level) &&
      matchesQuery(q, query),
  );

  const trapN = QUESTIONS.filter((q) => q.level === "trap").length;
  const trickyN = QUESTIONS.filter((q) => q.level === "tricky").length;
  const coreN = QUESTIONS.filter((q) => q.level === "core").length;

  const byTopic = TOPICS.map((t) => ({
    ...t,
    n: QUESTIONS.filter((q) => q.topic === t.id).length,
  }));

  const drillRows = DRILL.map((id) => {
    const q = QUESTIONS.find((x) => x.id === id)!;
    const meta = topicMeta(q.topic);
    const source = sourceOf(q);
    return [
      meta.label,
      LEVEL_LABEL[q.level],
      q.q,
      <Link href={source.href}>{source.label}</Link>,
    ];
  });

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Senior frontend interview questions</H1>
        <Text tone="secondary">
          React, Angular, JavaScript, TypeScript, CSS, HTML — core questions
          plus the traps that actually fail senior rounds. Open a question for
          a strong answer and the common fail.
        </Text>
      </Stack>

      <Callout tone="info" title="How seniors get scored">
        Interviewers rarely want a textbook recitation. State the mental model,
        name the tradeoff, mention production consequences (a11y, leaks, CD,
        hydration, XSS). “It depends” only counts if you say on what. Talk
        through a time you shipped the wrong default. Each question links to
        the spec or official doc the answer is grounded in — the interview
        phrasing is still synthesized.
      </Callout>

      <Grid columns={4} gap={12}>
        <Stat value={String(QUESTIONS.length)} label="Questions" />
        <Stat value={String(trapN)} label="Traps" tone="danger" />
        <Stat value={String(trickyN)} label="Tricky" tone="warning" />
        <Stat value={String(coreN)} label="Core" tone="info" />
      </Grid>

      <Stack gap={8}>
        <Text size="small" weight="semibold" tone="secondary">
          Questions by topic
        </Text>
        <UsageBar
          total={QUESTIONS.length}
          segments={byTopic.map((t) => ({
            id: t.id,
            value: t.n,
            color: t.color,
          }))}
          topLeftLabel={byTopic.map((t) => `${t.label} ${t.n}`).join(" · ")}
          topRightLabel={`${QUESTIONS.length} total`}
        />
      </Stack>

      <Card>
        <CardHeader trailing={<Pill size="sm" active>Drill first</Pill>}>
          Highest-fail traps
        </CardHeader>
        <CardBody style={{ padding: 0 }}>
          <Table
            framed={false}
            headers={["Topic", "Level", "Question", "Source"]}
            rows={drillRows}
            columnAlign={["left", "left", "left", "left"]}
          />
        </CardBody>
      </Card>

      <Stack gap={10}>
        <H2>Filter</H2>
        <Row gap={8} wrap>
          <Pill active={topic === "all"} onClick={() => setTopic("all")}>
            All topics
          </Pill>
          {TOPICS.map((t) => (
            <span key={t.id}>
              <Pill
                active={topic === t.id}
                leadingContent={<Swatch color={t.color} />}
                onClick={() => setTopic(t.id)}
              >
                {t.label}
              </Pill>
            </span>
          ))}
        </Row>
        <Row gap={8} wrap>
          {LEVELS.map((l) => (
            <span key={l.id}>
              <Pill active={level === l.id} onClick={() => setLevel(l.id)}>
                {l.label}
              </Pill>
            </span>
          ))}
        </Row>
        <TextInput
          value={query}
          onChange={setQuery}
          placeholder="Search questions, answers, traps…"
          type="search"
        />
        <Text size="small" tone="tertiary">
          Showing {filtered.length} of {QUESTIONS.length}. Default filter is
          senior (tricky + trap). Switch to All if you want the core set too.
        </Text>
      </Stack>

      <Divider />

      {topic === "all" && !query.trim()
        ? TOPICS.map((t) => {
            const qs = filtered.filter((q) => q.topic === t.id);
            if (qs.length === 0) return null;
            return (
              <div key={t.id}>
                <Stack gap={8}>
                  <Row gap={8} align="center">
                    <Swatch color={t.color} />
                    <H2>{t.label}</H2>
                    <Text size="small" tone="tertiary">
                      {qs.length}
                    </Text>
                  </Row>
                  <Stack gap={4}>
                    {qs.map((q) => (
                      <div key={q.id}>
                        <QuestionRow q={q} />
                      </div>
                    ))}
                  </Stack>
                </Stack>
              </div>
            );
          })
        : filtered.length > 0
          ? (
            <Stack gap={4}>
              {filtered.map((q) => (
                <div key={q.id}>
                  <QuestionRow q={q} />
                </div>
              ))}
            </Stack>
          )
          : (
            <Callout tone="neutral" title="No matches">
              Clear search or switch topic/level. Every question is tagged core,
              tricky, or trap.
            </Callout>
          )}
    </Stack>
  );
}
