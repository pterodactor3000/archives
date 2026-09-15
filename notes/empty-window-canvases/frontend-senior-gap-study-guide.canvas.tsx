import {
  Callout,
  Card,
  CardBody,
  CardHeader,
  Code,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Link,
  Pill,
  Row,
  Stack,
  Stat,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type TopicId =
  | "typescript"
  | "react-hooks"
  | "hydration"
  | "auth"
  | "vite"
  | "memory"
  | "testing"
  | "monorepo"
  | "observability";

type Topic = {
  id: TopicId;
  title: string;
  phase: "1 · Foundations" | "2 · Auth & tooling" | "3 · Tests & infra";
  score: string;
  why: string;
  overview: string[];
  howTo: { step: string; detail: string }[];
  practice: string[];
  docs: { label: string; href: string }[];
};

const TOPICS: Topic[] = [
  {
    id: "typescript",
    title: "TypeScript fundamentals",
    phase: "1 · Foundations",
    score: "L3−",
    why: "Mixed up interfaces vs types, extension, unions — weakest area in the report.",
    overview: [
      "TypeScript adds static types on top of JavaScript. Everyday types cover primitives, arrays, objects, unions, and type aliases.",
      "Interfaces describe object shapes. You extend them with extends. Type aliases can also describe objects and compose with intersections (&).",
      "Interfaces can be re-opened (declaration merging). Type aliases cannot. Prefer interfaces for object shapes you may extend; type aliases for unions, tuples, and mapped helpers.",
      "Utility types Partial, Pick, Omit, and Record transform existing types. keyof produces a union of an object's property names.",
    ],
    howTo: [
      {
        step: "Read Everyday Types",
        detail:
          "Work through typescriptlang.org handbook Everyday Types. Type every example in the playground until unions, aliases, and object types are automatic.",
      },
      {
        step: "Read Object Types + interfaces",
        detail:
          "Study interface declaration, extends, optional/readonly fields, and how interfaces differ from type aliases for extensibility.",
      },
      {
        step: "Drill utility types",
        detail:
          "Implement Partial / Pick / Omit / Record by hand once, then use the built-ins. Explain keyof T out loud.",
      },
      {
        step: "Interview drill",
        detail:
          "Without notes: define User, extend AdminUser, make a Partial update payload, and a status union 'idle' | 'loading' | 'error'.",
      },
    ],
    practice: [
      "Rewrite a small JS module in .ts with no any.",
      "Create a discriminated union for API result { ok: true, data } | { ok: false, error }.",
      "Explain interface extends vs type A & B in one minute.",
    ],
    docs: [
      {
        label: "Everyday Types (handbook)",
        href: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
      },
      {
        label: "Object Types",
        href: "https://www.typescriptlang.org/docs/handbook/2/objects.html",
      },
      {
        label: "Narrowing",
        href: "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
      },
      {
        label: "Utility Types",
        href: "https://www.typescriptlang.org/docs/handbook/utility-types.html",
      },
      {
        label: "TypeScript Playground",
        href: "https://www.typescriptlang.org/play",
      },
    ],
  },
  {
    id: "react-hooks",
    title: "React hooks (useRef, useReducer)",
    phase: "1 · Foundations",
    score: "L3−",
    why: "Needed guidance on useRef / useReducer and fundamental React concepts.",
    overview: [
      "useRef holds a mutable .current value that survives re-renders without triggering a re-render. Use it for DOM nodes, interval IDs, and other non-UI memory.",
      "Do not read or write ref.current during render (except careful initialization). Read/write in effects and event handlers.",
      "useReducer is for state that updates through named actions. You get [state, dispatch]. Prefer it when next state depends on complex previous state or many related fields.",
      "useEffect runs after paint for syncing with external systems. Always clean up subscriptions, timers, and listeners in the return function.",
    ],
    howTo: [
      {
        step: "useRef reference page",
        detail:
          "Read react.dev useRef. Build the stopwatch (interval in a ref + time in state) and an input focus example.",
      },
      {
        step: "useReducer + context pattern",
        detail:
          "Follow Scaling Up with Reducer and Context. Convert a multi-field form or task list from several useState calls to one reducer.",
      },
      {
        step: "Contrast hooks aloud",
        detail:
          "State = UI memory. Ref = non-UI memory. Reducer = structured updates. Effect = sync with outside world.",
      },
    ],
    practice: [
      "Component: focus input on mount via ref.",
      "Component: undo/redo or multi-step wizard with useReducer.",
      "Find and fix a fake leak: setInterval without clearInterval in cleanup.",
    ],
    docs: [
      {
        label: "useRef",
        href: "https://react.dev/reference/react/useRef",
      },
      {
        label: "useReducer",
        href: "https://react.dev/reference/react/useReducer",
      },
      {
        label: "useEffect",
        href: "https://react.dev/reference/react/useEffect",
      },
      {
        label: "Scaling Up with Reducer and Context",
        href: "https://react.dev/learn/scaling-up-with-reducer-and-context",
      },
      {
        label: "Referencing Values with Refs",
        href: "https://react.dev/learn/referencing-values-with-refs",
      },
    ],
  },
  {
    id: "hydration",
    title: "Hydration & rendering strategies",
    phase: "1 · Foundations",
    score: "L3−",
    why: "Not familiar with hydration; only basic SPA/SSR/SSG awareness.",
    overview: [
      "SPA: browser downloads JS, creates the DOM on the client (createRoot). Fast navigations after load; first paint waits on JS.",
      "SSR: server sends HTML for the first request. Client then hydrates — React attaches event handlers and state to that existing markup via hydrateRoot.",
      "SSG: HTML is generated at build time. Still hydrates on the client if interactive. Best for content that is known ahead of time.",
      "Hydration requires the client tree to match the server HTML. Mismatches (window checks, random IDs, different data) are bugs. Fix them; do not paper over casually.",
    ],
    howTo: [
      {
        step: "Read hydrateRoot",
        detail:
          "Study react.dev hydrateRoot: attach to server HTML, mismatch causes, two-pass client-only content with useEffect.",
      },
      {
        step: "Map strategies",
        detail:
          "For a product page, a dashboard, and a blog post, pick SPA vs SSR vs SSG and justify with SEO, data freshness, and TTFB.",
      },
      {
        step: "Mismatch lab",
        detail:
          "Intentionally render Date.now() on server and client; observe the warning; then fix with suppressHydrationWarning only where docs allow, or two-pass pattern.",
      },
    ],
    practice: [
      "Draw the request path: HTML → JS download → hydrate → interactive.",
      "List three common hydration mismatch causes from the React docs.",
      "Explain when createRoot vs hydrateRoot is correct.",
    ],
    docs: [
      {
        label: "hydrateRoot",
        href: "https://react.dev/reference/react-dom/client/hydrateRoot",
      },
      {
        label: "createRoot",
        href: "https://react.dev/reference/react-dom/client/createRoot",
      },
      {
        label: "react-dom/server",
        href: "https://react.dev/reference/react-dom/server",
      },
    ],
  },
  {
    id: "auth",
    title: "Authentication & authorization",
    phase: "2 · Auth & tooling",
    score: "JS gap",
    why: "Auth flow explanation lacked important details (interview JS weakness).",
    overview: [
      "Authentication verifies identity (who you are). Authorization decides what that identity may do.",
      "After login, the site keeps a session. Centralized model: server stores session state; client gets a session ID (prefer HttpOnly Secure cookie).",
      "Decentralized model: server issues a signed token (often JWT). Client presents it; resource servers verify the signature. Harder to revoke — use short-lived access tokens + refresh tokens.",
      "Cookie sessions need CSRF defenses (SameSite plus tokens / fetch metadata). Tokens in localStorage are easier to steal via XSS — cookies with HttpOnly are preferred when possible.",
      "CORS is separate: it controls which origins browsers allow for cross-origin requests. Auth cookies on cross-site requests need careful SameSite / CORS credential setup.",
    ],
    howTo: [
      {
        step: "MDN Authentication hub",
        detail:
          "Read methods overview (passwords, OTP, federated, passkeys), then Session management end to end.",
      },
      {
        step: "Draw both models",
        detail:
          "Diagram centralized session ID vs JWT access + refresh. Mark where revocation happens in each.",
      },
      {
        step: "CORS + cookies",
        detail:
          "Read MDN CORS. Explain Access-Control-Allow-Credentials and why * origin cannot pair with credentials.",
      },
      {
        step: "Build a tiny flow",
        detail:
          "Login form → server sets session cookie → protected route checks session → logout invalidates server session. Narrate every hop.",
      },
    ],
    practice: [
      "One-minute answer: session cookie vs JWT access token.",
      "Name defenses for session hijacking and session fixation from MDN.",
      "Explain CSRF risk when session ID lives in a cookie.",
    ],
    docs: [
      {
        label: "MDN Authentication",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Authentication",
      },
      {
        label: "MDN Session management",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Authentication/Session_management",
      },
      {
        label: "MDN CORS",
        href: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS",
      },
      {
        label: "OWASP Session Management Cheat Sheet",
        href: "https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html",
      },
      {
        label: "MDN CSRF",
        href: "https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/CSRF",
      },
    ],
  },
  {
    id: "vite",
    title: "Vite, tooling & tree shaking",
    phase: "2 · Auth & tooling",
    score: "JS gap",
    why: "Not familiar with Vite; tree shaking weaker than expected for senior.",
    overview: [
      "Vite is a modern frontend build tool: native-ESM dev server with fast HMR, and a production bundler that outputs optimized static assets.",
      "Scaffold with npm create vite@latest (react-ts template). Scripts: vite (dev), vite build, vite preview.",
      "Tree shaking removes unused ESM exports from the production bundle. Prefer ES modules; avoid side-effectful modules unless marked correctly.",
      "import.meta.env.DEV / PROD and VITE_* env vars let you gate code so dead branches are eliminated in production builds.",
      "You already know Webpack — map concepts: entry, loaders/plugins ≈ Vite plugins, code splitting via dynamic import().",
    ],
    howTo: [
      {
        step: "Scaffold Vite + React + TS",
        detail:
          "Follow vite.dev Getting Started. Create react-ts app, run dev/build/preview, inspect dist/ output size.",
      },
      {
        step: "Env & tree-shake demo",
        detail:
          "Wrap debug logging in if (import.meta.env.DEV). Confirm it disappears from the production bundle.",
      },
      {
        step: "Code splitting",
        detail:
          "Use dynamic import() for a route or heavy component. Verify a separate chunk in the build output.",
      },
      {
        step: "Contrast with Webpack",
        detail:
          "Prepare a 60-second comparison: HMR model, config surface, ESM-first vs historical CommonJS bundling.",
      },
    ],
    practice: [
      "Migrate a tiny Webpack demo mental model to Vite config (alias, env, proxy).",
      "Explain tree shaking requirements: ESM, no unexpected side effects.",
      "Show one dynamic import and name the chunk it creates.",
    ],
    docs: [
      {
        label: "Vite Getting Started",
        href: "https://vite.dev/guide/",
      },
      {
        label: "Features (HMR, ESM)",
        href: "https://vite.dev/guide/features.html",
      },
      {
        label: "Env Variables and Modes",
        href: "https://vite.dev/guide/env-and-mode.html",
      },
      {
        label: "Building for Production",
        href: "https://vite.dev/guide/build.html",
      },
      {
        label: "Dep Pre-Bundling",
        href: "https://vite.dev/guide/dep-pre-bundling.html",
      },
    ],
  },
  {
    id: "memory",
    title: "Memory leaks",
    phase: "2 · Auth & tooling",
    score: "JS gap",
    why: "Memory leaks knowledge weaker than expected for senior.",
    overview: [
      "A memory leak is when the page keeps retaining memory that should have been released — usage climbs over time.",
      "Common frontend causes: detached DOM nodes still referenced from JS, uncleared timers/intervals, forgotten event listeners, closures holding large objects.",
      "Chrome DevTools: Task Manager for live usage, Performance with Memory checkbox for trends, Heap Snapshot for Detached nodes, Allocation Timeline for growing allocations.",
      "In React, always clear intervals/subscriptions in useEffect cleanup. Avoid storing DOM nodes in module-level variables.",
    ],
    howTo: [
      {
        step: "Read Chrome memory guide",
        detail:
          "Follow Fix memory problems on developer.chrome.com. Reproduce the detached DOM example and find it in a Heap Snapshot.",
      },
      {
        step: "Allocation Timeline",
        detail:
          "Record while clicking a grow action. Blue bars that never get collected are leak candidates.",
      },
      {
        step: "React cleanup audit",
        detail:
          "Scan your practice app for setInterval, addEventListener, WebSocket — every one needs a matching cleanup.",
      },
    ],
    practice: [
      "Plant a leak (global array push on click), confirm in DevTools, then fix.",
      "Explain detached DOM in one sentence.",
      "Show useEffect cleanup that clears an interval.",
    ],
    docs: [
      {
        label: "Fix memory problems (Chrome DevTools)",
        href: "https://developer.chrome.com/docs/devtools/memory-problems/",
      },
      {
        label: "Memory panel overview",
        href: "https://developer.chrome.com/docs/devtools/memory-inspector/",
      },
      {
        label: "React useEffect (cleanup)",
        href: "https://react.dev/reference/react/useEffect#connecting-to-an-external-system",
      },
    ],
  },
  {
    id: "testing",
    title: "Testing (unit → E2E → experiments)",
    phase: "3 · Tests & infra",
    score: "L3",
    why: "Basics only; no A/B testing; limited broader process / user monitoring.",
    overview: [
      "Unit tests: pure functions and small modules in isolation (Vitest).",
      "Component / integration tests: render UI, interact like a user (Testing Library + user-event). Guiding principle: tests that resemble usage give more confidence.",
      "E2E: real browser flows across the app (Playwright). Fewer of these; cover critical paths.",
      "A/B testing is product experimentation: split users into variants, measure a primary metric, ship the winner. Not a unit-test tool — know the vocabulary for interviews.",
      "User monitoring closes the loop: errors (Sentry) + Core Web Vitals (LCP, INP, CLS) in the field.",
    ],
    howTo: [
      {
        step: "Vitest setup",
        detail:
          "npm i -D vitest. Write sum.test.ts, add \"test\": \"vitest\". Focus assertions on observable contracts, not internals.",
      },
      {
        step: "React Testing Library",
        detail:
          "render + screen + userEvent. Prefer getByRole / getByLabelText. Arrange → Act → Assert.",
      },
      {
        step: "Playwright E2E",
        detail:
          "npm init playwright@latest. Write one login or checkout-happy-path test with getByRole.",
      },
      {
        step: "A/B vocabulary",
        detail:
          "Be ready to define: hypothesis, control vs variant, primary metric, sample size / duration, feature flag as delivery mechanism. Tie outcomes to analytics or Web Vitals.",
      },
    ],
    practice: [
      "Unit test a typed price calculator.",
      "Component test: form validation with user-event.",
      "One Playwright test for the critical path of your practice app.",
      "Explain testing pyramid vs Testing Library philosophy in 90 seconds.",
    ],
    docs: [
      {
        label: "Vitest Getting Started",
        href: "https://vitest.dev/guide/",
      },
      {
        label: "Vitest Writing Tests",
        href: "https://vitest.dev/guide/learn/writing-tests",
      },
      {
        label: "React Testing Library intro",
        href: "https://testing-library.com/docs/react-testing-library/intro/",
      },
      {
        label: "Testing Library guiding principles",
        href: "https://testing-library.com/docs/guiding-principles/",
      },
      {
        label: "Playwright intro",
        href: "https://playwright.dev/docs/intro",
      },
      {
        label: "user-event",
        href: "https://testing-library.com/docs/user-event/intro",
      },
    ],
  },
  {
    id: "monorepo",
    title: "Monorepo tooling",
    phase: "3 · Tests & infra",
    score: "L3",
    why: "No practical monorepo tooling experience.",
    overview: [
      "A monorepo holds multiple packages/apps in one git repo with shared tooling and local package links.",
      "pnpm workspaces (or npm/yarn workspaces) define which folders are packages and how they depend on each other.",
      "Turborepo orchestrates tasks (build, test, lint) with a dependency graph, caching, and ^build-style package ordering.",
      "Typical layout: apps/web, apps/api, packages/ui, packages/tsconfig — one shared Button used by multiple apps.",
    ],
    howTo: [
      {
        step: "Scaffold with create-turbo",
        detail:
          "Use the official create-turbo flow from turborepo.dev. Explore apps/ and packages/, run turbo build.",
      },
      {
        step: "Read turbo.json tasks",
        detail:
          "Define build with dependsOn: [\"^build\"], outputs for dist, and a persistent uncached dev task.",
      },
      {
        step: "Add a shared package",
        detail:
          "Create packages/utils with a typed helper. Depend on it from an app via workspace protocol. Rebuild and confirm cache hits on second run.",
      },
    ],
    practice: [
      "Explain why ^build runs dependencies first.",
      "Name what remote caching buys a team (without claiming you've run a huge fleet).",
      "Sketch folder layout for web + shared UI package.",
    ],
    docs: [
      {
        label: "Turborepo docs",
        href: "https://turborepo.dev/docs",
      },
      {
        label: "Crafting your repository",
        href: "https://turborepo.dev/docs/crafting-your-repository/structuring-a-repository",
      },
      {
        label: "turbo.json configuration",
        href: "https://turborepo.dev/docs/reference/configuration",
      },
      {
        label: "pnpm Workspaces",
        href: "https://pnpm.io/workspaces",
      },
    ],
  },
  {
    id: "observability",
    title: "Observability & user monitoring",
    phase: "3 · Tests & infra",
    score: "L3",
    why: "Limited knowledge of observability / monitoring / advanced deploy awareness.",
    overview: [
      "Frontend observability = knowing what users hit in production: errors, performance, and key user flows.",
      "Error monitoring (Sentry React SDK): init early with DSN, capture uncaught/boundary errors, optionally Session Replay and tracing.",
      "Core Web Vitals (web.dev): LCP (loading ≤2.5s), INP (interactivity ≤200ms), CLS (stability ≤0.1) at the 75th percentile.",
      "Measure in the field with the web-vitals library; lab tools (Lighthouse/DevTools) help during development but do not replace RUM.",
      "Deploy basics to discuss: health checks, rollback, preview environments — pair with whatever host you already use (Docker/CI experience noted as a strength).",
    ],
    howTo: [
      {
        step: "Sentry React guide",
        detail:
          "Install @sentry/react, create instrument file, import it first in the entry. Wire Error Boundary / React 19 error hooks per docs.",
      },
      {
        step: "Web Vitals",
        detail:
          "Read web.dev Web Vitals. Add onLCP / onINP / onCLS and send metrics to an analytics endpoint (or console in practice).",
      },
      {
        step: "Connect the story",
        detail:
          "Interview answer: alert on error rate spike → Sentry issue → reproduce → fix → watch LCP/INP after deploy.",
      },
    ],
    practice: [
      "Throw a handled error and confirm it appears in Sentry (or SDK console transport in local practice).",
      "Name the three Core Web Vitals and their thresholds from memory.",
      "Describe rollback criteria for a bad frontend release.",
    ],
    docs: [
      {
        label: "Sentry React SDK",
        href: "https://docs.sentry.io/platforms/javascript/guides/react/",
      },
      {
        label: "Sentry React Error Boundary",
        href: "https://docs.sentry.io/platforms/javascript/guides/react/features/error-boundary/",
      },
      {
        label: "Web Vitals (web.dev)",
        href: "https://web.dev/articles/vitals",
      },
      {
        label: "web-vitals library",
        href: "https://github.com/GoogleChrome/web-vitals",
      },
      {
        label: "Chrome UX Report",
        href: "https://developer.chrome.com/docs/crux",
      },
    ],
  },
];

const PHASES = [
  "1 · Foundations",
  "2 · Auth & tooling",
  "3 · Tests & infra",
] as const;

function DocLinks({ docs }: { docs: Topic["docs"] }) {
  return (
    <Stack gap={6}>
      {docs.map((d) => (
        <div key={d.href}>
          <Text size="small">
            <Link href={d.href}>{d.label}</Link>
          </Text>
        </div>
      ))}
    </Stack>
  );
}

function TopicPanel({ topic }: { topic: Topic }) {
  const theme = useHostTheme();

  return (
    <Stack gap={16}>
      <Row gap={8} align="center" wrap>
        <H2>{topic.title}</H2>
        <Pill size="sm" active>
          {topic.score}
        </Pill>
        <Pill size="sm">{topic.phase}</Pill>
      </Row>

      <Callout tone="warning" title="Why this topic">
        {topic.why}
      </Callout>

      <Card>
        <CardHeader>Overview</CardHeader>
        <CardBody>
          <Stack gap={8}>
            {topic.overview.map((line) => (
              <div key={line}>
                <Text>{line}</Text>
              </div>
            ))}
          </Stack>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>How to learn it</CardHeader>
        <CardBody>
          <Stack gap={12}>
            {topic.howTo.map((item, i) => (
              <div key={item.step}>
                <Stack gap={4}>
                  <Text weight="semibold">
                    {i + 1}. {item.step}
                  </Text>
                  <Text tone="secondary" size="small">
                    {item.detail}
                  </Text>
                </Stack>
              </div>
            ))}
          </Stack>
        </CardBody>
      </Card>

      <Grid columns={2} gap={16}>
        <Card>
          <CardHeader>Practice until you can teach it</CardHeader>
          <CardBody>
            <Stack gap={8}>
              {topic.practice.map((p) => (
                <div key={p}>
                  <Text size="small">• {p}</Text>
                </div>
              ))}
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Official docs only</CardHeader>
          <CardBody>
            <DocLinks docs={topic.docs} />
          </CardBody>
        </Card>
      </Grid>

      <div
        style={{
          background: theme.fill.tertiary,
          borderRadius: 8,
          padding: 12,
        }}
      >
        <Text size="small" tone="secondary">
          Sources: TypeScript handbook, react.dev, vite.dev, MDN, OWASP, Vitest,
          Testing Library, Playwright, Turborepo, pnpm, Sentry docs, web.dev,
          Chrome Developers.
        </Text>
      </div>
    </Stack>
  );
}

export default function FrontendSeniorGapStudyGuide() {
  const theme = useHostTheme();
  const [topicId, setTopicId] = useCanvasState<TopicId>(
    "topicId",
    "typescript",
  );
  const [done, setDone] = useCanvasState<Record<string, boolean>>(
    "doneTopics",
    {},
  );

  const topic = TOPICS.find((t) => t.id === topicId) ?? TOPICS[0];
  const doneCount = TOPICS.filter((t) => done[t.id]).length;

  return (
    <Stack gap={24} style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          background: theme.fill.secondary,
          borderRadius: 8,
          padding: 20,
        }}
      >
        <Stack gap={8}>
          <H1>Frontend senior gap study guide</H1>
          <Text tone="secondary">
            Overviews and how-tos for weaknesses from the JIT recruitment
            summary. All links point at official docs and standards bodies.
          </Text>
        </Stack>
      </div>

      <Grid columns={4} gap={12}>
        <Stat value="9" label="Topics" tone="info" />
        <Stat value={`${doneCount}/9`} label="Marked done" />
        <Stat value="L3−" label="Worst scores (TS / React)" tone="danger" />
        <Stat value="8–12w" label="Suggested plan window" tone="warning" />
      </Grid>

      <Callout tone="info" title="How to use this canvas">
        Pick a topic below. Read overview, follow how-to steps against the
        official links, complete practice, then mark done. Order: Foundations →
        Auth & tooling → Tests & infra.
      </Callout>

      <Stack gap={10}>
        <H3>Topics by phase</H3>
        {PHASES.map((phase) => (
          <div key={phase}>
            <Stack gap={8}>
              <Text weight="semibold" size="small" tone="secondary">
                {phase}
              </Text>
              <Row gap={8} wrap>
                {TOPICS.filter((t) => t.phase === phase).map((t) => (
                  <div key={t.id}>
                    <Pill
                      active={topicId === t.id}
                      onClick={() => setTopicId(t.id)}
                    >
                      {done[t.id] ? "done · " : ""}
                      {t.title}
                    </Pill>
                  </div>
                ))}
              </Row>
            </Stack>
          </div>
        ))}
      </Stack>

      <Divider />

      <TopicPanel topic={topic} />

      <Row gap={8} align="center">
        <Pill
          active={!!done[topic.id]}
          onClick={() =>
            setDone((prev) => ({
              ...prev,
              [topic.id]: !prev[topic.id],
            }))
          }
        >
          {done[topic.id] ? "Done — click to undo" : "Mark topic done"}
        </Pill>
        <Text size="small" tone="tertiary">
          Progress persists in this canvas.
        </Text>
      </Row>

      <Divider />

      <CollapsibleSection title="Quick reference cheat cards" defaultOpen={false}>
        <Stack gap={12}>
          <Card>
            <CardHeader trailing={<Pill size="sm">TypeScript</Pill>}>
              Interface vs type
            </CardHeader>
            <CardBody>
              <Code>
                {`interface Animal { name: string }
interface Bear extends Animal { honey: boolean }

type AnimalT = { name: string }
type BearT = AnimalT & { honey: boolean }`}
              </Code>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm">React</Pill>}>
              useRef vs useState
            </CardHeader>
            <CardBody>
              <Text size="small">
                Changing <Code>ref.current</Code> does not re-render. Changing
                state does. Store interval IDs and DOM nodes in refs; store
                anything shown in the UI in state.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm">Auth</Pill>}>
              Session checklist (MDN)
            </CardHeader>
            <CardBody>
              <Text size="small">
                Prefer centralized sessions when architecture allows. Store ID
                in HttpOnly + Secure cookie. Defend CSRF. Prefer short-lived
                access tokens + refresh if using JWTs. Invalidate on login and
                high-risk events.
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader trailing={<Pill size="sm">Vite</Pill>}>
              Tree-shake gate
            </CardHeader>
            <CardBody>
              <Code>
                {`if (import.meta.env.DEV) {
  // dropped from production builds
  console.log("Dev mode")
}`}
              </Code>
            </CardBody>
          </Card>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection title="Suggested weekly order" defaultOpen={false}>
        <TableLike />
      </CollapsibleSection>
    </Stack>
  );
}

function TableLike() {
  return (
    <Stack gap={8} style={{ paddingTop: 8 }}>
      <Text size="small">
        <Text weight="semibold">Weeks 1–3:</Text> TypeScript → React hooks →
        Hydration
      </Text>
      <Text size="small">
        <Text weight="semibold">Weeks 4–6:</Text> Auth → Vite/tree shaking →
        Memory leaks
      </Text>
      <Text size="small">
        <Text weight="semibold">Weeks 7–9:</Text> Testing → Monorepo →
        Observability
      </Text>
      <Text size="small">
        <Text weight="semibold">Weeks 10–12:</Text> Side project that forces all
        three layers + mock interviews from these overviews
      </Text>
    </Stack>
  );
}
