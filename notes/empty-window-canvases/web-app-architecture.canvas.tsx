import {
  Button,
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
  Pill,
  Row,
  Stack,
  Stat,
  Table,
  Text,
  useCanvasState,
} from "cursor/canvas";

type Section =
  | "overview"
  | "principles"
  | "layers"
  | "angular"
  | "react"
  | "compare"
  | "backend"
  | "decide"
  | "path";

type Scenario =
  | "enterprise"
  | "product"
  | "content"
  | "dashboard"
  | "startup"
  | "team";

const SECTIONS: { id: Section; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "layers", label: "Layers" },
  { id: "angular", label: "Angular" },
  { id: "react", label: "React" },
  { id: "compare", label: "Compare" },
  { id: "backend", label: "Backend & Data" },
  { id: "decide", label: "Decide" },
  { id: "path", label: "Learn path" },
];

const SCENARIOS: {
  id: Scenario;
  label: string;
  pick: string;
  why: string;
  stack: string;
  avoid: string;
}[] = [
  {
    id: "enterprise",
    label: "Large enterprise SPA",
    pick: "Angular (or React + strict conventions)",
    why: "DI, opinionated structure, long-lived teams, shared services, route-scoped providers. Predictable scale beats DIY architecture.",
    stack: "Angular + Nest/Java/.NET API + Postgres + Redis cache",
    avoid: "Unstructured React folder-by-type with ad-hoc global state",
  },
  {
    id: "product",
    label: "SaaS product UI",
    pick: "React + Next.js (or Vite SPA)",
    why: "Composition flexibility, huge ecosystem, fast iteration. Next when SEO/SSR or API routes help; Vite SPA when pure app behind login.",
    stack: "Next App Router or Vite + React Query/TanStack + REST/tRPC + Postgres",
    avoid: "Over-engineering CQRS on day one; Redux for every form field",
  },
  {
    id: "content",
    label: "Marketing / content site",
    pick: "Next.js (or Astro) — not Angular SPA",
    why: "Server Components + caching/revalidate fit content. Angular SPA is wrong tool for mostly-static pages.",
    stack: "Next App Router + CMS (or MDX) + CDN + edge cache",
    avoid: "Client-heavy SPA with empty shell HTML",
  },
  {
    id: "dashboard",
    label: "Internal admin / dashboard",
    pick: "Either — pick team skill",
    why: "Auth wall, no SEO. Angular DI + tables OR React + TanStack Table both fine. Consistency > framework brand.",
    stack: "SPA (Angular or Vite React) + BFF/API + RBAC + Postgres",
    avoid: "SSR complexity you do not need",
  },
  {
    id: "startup",
    label: "Small team, ship fast",
    pick: "React + Next.js (full-stack)",
    why: "One language, Server Actions/Route Handlers, fewer repos. Angular shines later when structure pays off.",
    stack: "Next + Prisma/Drizzle + Postgres (or Supabase) + auth library",
    avoid: "Microservices + event bus before product-market fit",
  },
  {
    id: "team",
    label: "Many teams, shared design system",
    pick: "Angular OR React monorepo with boundaries",
    why: "Architecture problem is ownership + contracts, not framework. Feature folders, shared UI lib, clear API versioning.",
    stack: "Nx/Turborepo + feature packages + OpenAPI/GraphQL contract + CI boundaries",
    avoid: "One giant shared store everyone mutates",
  },
];

export default function WebAppArchitectureGuide() {
  const [section, setSection] = useCanvasState<Section>("section", "overview");
  const [scenario, setScenario] = useCanvasState<Scenario>("scenario", "product");

  const active = SCENARIOS.find((s) => s.id === scenario)!;

  return (
    <Stack gap={20}>
      <Stack gap={6}>
        <H1>Web App Architecture — Learning Guide</H1>
        <Text tone="secondary">
          Principles first, then Angular vs React, then backend/data, then
          decision rules. Open beside chat; click sections to explore.
        </Text>
      </Stack>

      <Row gap={6} wrap>
        {SECTIONS.map((s) => (
          <span key={s.id}>
            <Button
              variant={section === s.id ? "primary" : "secondary"}
              onClick={() => setSection(s.id)}
            >
              {s.label}
            </Button>
          </span>
        ))}
      </Row>

      <Divider />

      {section === "overview" && <Overview onGo={setSection} />}
      {section === "principles" && <Principles />}
      {section === "layers" && <Layers />}
      {section === "angular" && <AngularSection />}
      {section === "react" && <ReactSection />}
      {section === "compare" && <Compare />}
      {section === "backend" && <BackendData />}
      {section === "decide" && (
        <Decide
          scenario={scenario}
          setScenario={setScenario}
          active={active}
        />
      )}
      {section === "path" && <LearnPath onGo={setSection} />}
    </Stack>
  );
}

function Overview({ onGo }: { onGo: (s: Section) => void }) {
  return (
    <Stack gap={16}>
      <Callout tone="info" title="Core idea">
        Architecture is how you split responsibilities so change stays local.
        Frameworks differ in how much structure they give you; principles stay
        the same.
      </Callout>

      <Grid columns={3} gap={12}>
        <Stat value="Same" label="Principles everywhere" tone="info" />
        <Stat value="Different" label="Where structure lives" />
        <Stat value="Context" label="Best stack = situation" tone="success" />
      </Grid>

      <H2>Mental model</H2>
      <Table
        headers={["Layer", "Job", "Typical pieces"]}
        rows={[
          [
            "UI / presentation",
            "Render + capture input",
            "Components, routes, forms, design system",
          ],
          [
            "Client state / orchestration",
            "What UI knows right now",
            "Local state, stores, signals, React Query cache",
          ],
          [
            "API / BFF",
            "Auth, validation, aggregation",
            "REST, GraphQL, tRPC, Nest controllers, Next Route Handlers",
          ],
          [
            "Domain / application",
            "Business rules",
            "Services, use-cases, domain models",
          ],
          [
            "Data",
            "Persist + query",
            "SQL/NoSQL, ORM, migrations, caches, search",
          ],
        ]}
        rowTone={["info", undefined, undefined, undefined, "success"]}
      />

      <H2>How to use this guide</H2>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>1. Lock principles</CardHeader>
          <CardBody>
            <Text>
              Separation of concerns, dependency direction, feature cohesion.
            </Text>
            <Row gap={8} style={{ marginTop: 10 }}>
              <Button  onClick={() => onGo("principles")}>
                Principles
              </Button>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>2. Map frameworks</CardHeader>
          <CardBody>
            <Text>
              Angular = opinionated platform. React = library + your conventions
              (or Next as framework).
            </Text>
            <Row gap={8} style={{ marginTop: 10 }}>
              <Button  onClick={() => onGo("angular")}>
                Angular
              </Button>
              <Button  onClick={() => onGo("react")}>
                React
              </Button>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>3. Add backend & data</CardHeader>
          <CardBody>
            <Text>
              Same layering on server: handlers thin, domain clear, persistence
              isolated.
            </Text>
            <Row gap={8} style={{ marginTop: 10 }}>
              <Button  onClick={() => onGo("backend")}>
                Backend & Data
              </Button>
            </Row>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>4. Decide by situation</CardHeader>
          <CardBody>
            <Text>
              Pick stack from constraints (team, SEO, scale, time), not hype.
            </Text>
            <Row gap={8} style={{ marginTop: 10 }}>
              <Button  variant="primary" onClick={() => onGo("decide")}>
                Decision guide
              </Button>
            </Row>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function Principles() {
  return (
    <Stack gap={16}>
      <H2>Architecture principles (framework-agnostic)</H2>
      <Text tone="secondary">
        Learn these once. Every Angular/React debate is usually one of these in
        disguise.
      </Text>

      <CollapsibleSection title="1. Separation of concerns" defaultOpen>
        <Stack gap={8}>
          <Text>
            UI should not know SQL. Forms should not own auth tokens. Domain
            rules should not depend on React hooks or Angular templates.
          </Text>
          <Text tone="secondary">
            Smell: components that fetch, validate, mutate DB shape, and render
            in one file.
          </Text>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection title="2. Dependency rule (inward)">
        <Stack gap={8}>
          <Text>
            Outer layers depend on inner ones, not the reverse. Domain does not
            import HTTP clients or component libraries.
          </Text>
          <Text tone="secondary">
            Angular DI and Nest providers make this explicit. In React you
            enforce it with folder boundaries and types.
          </Text>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection title="3. Feature cohesion over type folders">
        <Stack gap={8}>
          <Text>
            Prefer <Code>orders/</Code> (UI + state + API client) over giant{" "}
            <Code>components/</Code> + <Code>services/</Code> +{" "}
            <Code>hooks/</Code> dumps.
          </Text>
          <Text tone="secondary">
            Angular style guide: structure by feature areas. Same idea works in
            React (feature slices / vertical slices).
          </Text>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection title="4. Single source of truth for state">
        <Stack gap={8}>
          <Text>
            Decide where each fact lives: server (canonical), client cache
            (derived), UI (ephemeral). Duplicate truths cause sync bugs.
          </Text>
          <Text tone="secondary">
            Server data: prefer query libraries (TanStack Query) or Angular
            resource/signals patterns — not a second Redux copy of the API.
          </Text>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection title="5. Explicit boundaries & contracts">
        <Stack gap={8}>
          <Text>
            Front ↔ API via OpenAPI/GraphQL schema. Feature ↔ feature via public
            exports only. Auth at edges (guards, middleware).
          </Text>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection title="6. Design for change, not for perfection">
        <Stack gap={8}>
          <Text>
            Start with clear folders and thin layers. Add CQRS, event sourcing,
            micro-frontends only when pain is real.
          </Text>
        </Stack>
      </CollapsibleSection>

      <Callout tone="warning" title="Common trap">
        Copying Clean Architecture folder names without enforcing dependency
        direction. Names alone do nothing — boundaries do.
      </Callout>
    </Stack>
  );
}

function Layers() {
  return (
    <Stack gap={16}>
      <H2>Typical web app layers</H2>
      <Text tone="secondary">
        Same cake in SPA, SSR app, or BFF. Thickness of each layer changes by
        product.
      </Text>

      <Table
        headers={["Layer", "Angular home", "React / Next home", "Failure mode"]}
        rows={[
          [
            "Presentation",
            "Standalone components, templates",
            "Components, Server/Client split",
            "God components",
          ],
          [
            "UI state",
            "Signals, component state",
            "useState, useReducer, Zustand",
            "Everything in global store",
          ],
          [
            "Server state",
            "HttpClient + services / resources",
            "TanStack Query, RSC fetch",
            "Manual useEffect fetch soup",
          ],
          [
            "Cross-cutting",
            "Interceptors, guards, DI tokens",
            "Middleware, context, HOCs rare",
            "Auth logic in every page",
          ],
          [
            "API edge",
            "Separate Nest/Spring/.NET",
            "Route Handlers, Nest, or BFF",
            "Business rules only in UI",
          ],
          [
            "Persistence",
            "ORM behind repositories",
            "Same — Prisma/Drizzle/SQL",
            "SQL strings in controllers",
          ],
        ]}
      />

      <H3>Where data should live</H3>
      <Grid columns={3} gap={12}>
        <Card>
          <CardHeader trailing={<Pill tone="success" size="sm">Server</Pill>}>
            Canonical data
          </CardHeader>
          <CardBody>
            <Text>Users, orders, permissions, money. Source of truth in DB.</Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="info" size="sm">Cache</Pill>}>
            Derived / cached
          </CardHeader>
          <CardBody>
            <Text>
              Lists, detail views, React Query / HTTP cache. Invalidate on
              mutation.
            </Text>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill size="sm">Client</Pill>}>
            Ephemeral UI
          </CardHeader>
          <CardBody>
            <Text>
              Modal open, draft form fields, selected tab. Die on refresh — OK.
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function AngularSection() {
  return (
    <Stack gap={16}>
      <Row gap={8} align="center">
        <H2>Angular architecture</H2>
        <Pill tone="info" size="sm">
          Opinionated platform
        </Pill>
      </Row>
      <Text tone="secondary">
        From angular.dev: modular via components + dependency injection;
        feature folders; Signals for fine-grained reactivity; route-level
        providers for scoped services.
      </Text>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Built-in architecture tools</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• Dependency injection (inject / providers)</Text>
              <Text>• Standalone components (modern default)</Text>
              <Text>• Router + lazy routes + route providers</Text>
              <Text>• Interceptors, guards, resolvers</Text>
              <Text>• Signals / RxJS for reactivity</Text>
              <Text>• CLI + style guide enforce structure</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Recommended shape</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>
                Feature folders (e.g. <Code>movie-reel/show-times/</Code>), not
                type dumps.
              </Text>
              <Text>
                Shared UI + core (auth, HTTP) as libraries when monorepo.
              </Text>
              <Text>
                Services hold orchestration; components stay presentational when
                possible.
              </Text>
              <Text>
                Scope providers to routes for feature isolation (admin vs shop
                carts).
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3>Mental model</H3>
      <Table
        headers={["Concept", "Role"]}
        rows={[
          ["Component", "View + local interaction; inject collaborators"],
          ["Service (providedIn / route)", "Shared logic, state, HTTP, domain ops"],
          ["Token / provider", "Swap implementations (mock, env, feature flag)"],
          ["Guard / interceptor", "Cross-cutting at edges"],
          ["Signal / Observable", "Reactive state and async streams"],
        ]}
      />

      <Callout tone="info" title="When Angular wins">
        Large teams, long projects, enterprise consistency, heavy forms, need for
        one blessed way to do DI, routing, and HTTP. You trade flexibility for
        guardrails.
      </Callout>

      <CollapsibleSection title="Modern Angular notes (standalone + signals)">
        <Stack gap={8}>
          <Text>
            Prefer standalone APIs over NgModules for new apps. Use{" "}
            <Code>inject()</Code> in components/services. Route{" "}
            <Code>providers</Code> isolate feature services until that route
            loads.
          </Text>
          <Text tone="secondary">
            Signals reduce change-detection noise; keep RxJS for true streams
            (WebSocket, complex pipelines).
          </Text>
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}

function ReactSection() {
  return (
    <Stack gap={16}>
      <Row gap={8} align="center">
        <H2>React architecture</H2>
        <Pill tone="warning" size="sm">
          Library — you bring structure
        </Pill>
      </Row>
      <Text tone="secondary">
        From react.dev: Thinking in React (UI hierarchy → static → state
        location). Context + reducer for app state. Server Components cannot use
        interactive APIs — compose with Client Components.
      </Text>

      <H3>Thinking in React (build order)</H3>
      <Table
        headers={["Step", "Do this"]}
        rows={[
          ["1", "Break UI into a component hierarchy from the mock"],
          ["2", "Build a static version with props only"],
          ["3", "Identify minimal state (not derived duplicates)"],
          ["4", "Place state at nearest common owner"],
          ["5", "Add inverse data flow (callbacks / dispatch)"],
        ]}
        columnAlign={["center", "left"]}
      />

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>SPA (Vite + React)</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>You choose: router, data fetching, state, bundling.</Text>
              <Text>
                Common: React Router + TanStack Query + Zustand/Context.
              </Text>
              <Text>Best for authenticated apps with separate API.</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Next.js App Router</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Server Components default — fetch on server, less JS.</Text>
              <Text>
                <Code>&apos;use client&apos;</Code> only for interactivity.
              </Text>
              <Text>
                Cache via <Code>fetch</Code> options / revalidate; Route Handlers
                for client-triggered API.
              </Text>
              <Text tone="secondary">
                Do not call Route Handlers from Server Components (extra hop).
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3>State ladder (prefer lowest rung)</H3>
      <Table
        headers={["Need", "Tool", "Avoid using for"]}
        rows={[
          ["One component", "useState", "Shared distant UI"],
          ["Sibling coordination", "Lift state / useReducer", "Whole app"],
          ["Tree-wide UI concerns", "Context (+ reducer)", "High-freq server lists"],
          ["Server/async cache", "TanStack Query / RSC", "Modal open flags"],
          ["Complex client domain", "Zustand / Redux Toolkit", "Every form field"],
        ]}
      />

      <Callout tone="info" title="When React wins">
        Product velocity, custom UX, ecosystem (charts, DnD, design systems),
        full-stack JS with Next, or teams that want to choose conventions.
      </Callout>
    </Stack>
  );
}

function Compare() {
  return (
    <Stack gap={16}>
      <H2>Angular vs React — architecture lens</H2>
      <Text tone="secondary">
        Not “which is better.” Which constraints match your situation.
      </Text>

      <Table
        headers={["Dimension", "Angular", "React"]}
        rows={[
          [
            "What it is",
            "Full framework (router, DI, HTTP, forms, CLI)",
            "UI library; meta-framework optional (Next)",
          ],
          [
            "Structure source",
            "Platform + style guide + DI graph",
            "Team conventions / Next file conventions",
          ],
          [
            "Dependency wiring",
            "First-class DI + hierarchical injectors",
            "Imports, props, context; no built-in DI",
          ],
          [
            "State model",
            "Signals + services + RxJS",
            "Local state + external libraries",
          ],
          [
            "SSR / full-stack",
            "Angular SSR / Analog; usually separate API",
            "Next/Remix first-class RSC + routes",
          ],
          [
            "Learning curve",
            "Steeper, then consistent",
            "Shallower start, architecture debt risk",
          ],
          [
            "Best team fit",
            "Enterprise, shared standards",
            "Product teams, mixed stacks",
          ],
        ]}
        rowTone={[
          "info",
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          "success",
        ]}
      />

      <H3>Similarities (do not miss these)</H3>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Both want</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Component trees + unidirectional data ideas</Text>
              <Text>Feature-based folders at scale</Text>
              <Text>Lazy routes / code splitting</Text>
              <Text>Clear client vs server state</Text>
              <Text>Design systems as shared packages</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Both fail the same ways</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>Business logic trapped in views</Text>
              <Text>Global mutable bags of state</Text>
              <Text>No API contract</Text>
              <Text>Folder-by-type at 200k LOC</Text>
              <Text>Premature micro-frontends</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function BackendData() {
  return (
    <Stack gap={16}>
      <H2>Backend & data layer</H2>
      <Text tone="secondary">
        Frontend architecture collapses without a clear API and persistence
        story.
      </Text>

      <H3>API shapes</H3>
      <Table
        headers={["Style", "Use when", "Watch out"]}
        rows={[
          [
            "REST + OpenAPI",
            "CRUD resources, broad clients, caching",
            "Chatty endpoints; version carefully",
          ],
          [
            "GraphQL",
            "Many clients, nested reads, BFF aggregation",
            "N+1, auth on fields, cache complexity",
          ],
          [
            "tRPC / RPC",
            "TS monorepo, end-to-end types",
            "Non-TS clients; coupling to one app",
          ],
          [
            "BFF (Backend for Frontend)",
            "UI-specific aggregation, auth cookies",
            "Duplicating domain logic wrongly",
          ],
        ]}
      />

      <H3>Server layering (keep thin edges)</H3>
      <Table
        headers={["Layer", "Contains", "Does not contain"]}
        rows={[
          [
            "Transport (controller / route)",
            "Parse, auth context, status codes",
            "Business rules, SQL",
          ],
          [
            "Application / use-case",
            "Orchestrate domain ops, transactions",
            "HTTP details, JSX",
          ],
          [
            "Domain",
            "Invariants, entities, policies",
            "ORM entities if they leak persistence",
          ],
          [
            "Infrastructure",
            "ORM, queues, email, S3",
            "UI concepts",
          ],
        ]}
      />

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Data modeling basics</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• Normalize for write integrity; denormalize for read speed</Text>
              <Text>• Migrations as code; never hand-edit prod schema</Text>
              <Text>• Transactions for multi-row invariants</Text>
              <Text>• Soft delete / audit when business needs history</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>Caching rules of thumb</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• Cache reads that are hot and mostly stable</Text>
              <Text>• Invalidate on write (or short TTL + accept staleness)</Text>
              <Text>• HTTP cache / CDN for public content</Text>
              <Text>• Redis for sessions, rate limits, computed views</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Callout tone="warning" title="Frontend ↔ data anti-pattern">
        Letting the UI dictate table shapes (or dumping ORM models straight into
        JSON). Introduce DTOs / mappers at the API boundary.
      </Callout>
    </Stack>
  );
}

function Decide({
  scenario,
  setScenario,
  active,
}: {
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
  active: (typeof SCENARIOS)[number];
}) {
  return (
    <Stack gap={16}>
      <H2>What is best for what</H2>
      <Text tone="secondary">
        Pick a situation. Recommendation is a starting bias, not a law.
      </Text>

      <Row gap={6} wrap>
        {SCENARIOS.map((s) => (
          <span key={s.id}>
            <Button
              variant={scenario === s.id ? "primary" : "secondary"}
              onClick={() => setScenario(s.id)}
            >
              {s.label}
            </Button>
          </span>
        ))}
      </Row>

      <Card>
        <CardHeader trailing={<Pill tone="success">{active.pick}</Pill>}>
          {active.label}
        </CardHeader>
        <CardBody>
          <Stack gap={10}>
            <Stack gap={4}>
              <Text weight="semibold">Why</Text>
              <Text>{active.why}</Text>
            </Stack>
            <Stack gap={4}>
              <Text weight="semibold">Example stack</Text>
              <Text>{active.stack}</Text>
            </Stack>
            <Stack gap={4}>
              <Text weight="semibold">Usually avoid</Text>
              <Text tone="secondary">{active.avoid}</Text>
            </Stack>
          </Stack>
        </CardBody>
      </Card>

      <H3>Quick decision cheatsheet</H3>
      <Table
        headers={["If you need…", "Lean toward…"]}
        rows={[
          ["One blessed enterprise way", "Angular"],
          ["Max UI ecosystem + hiring pool", "React"],
          ["SEO + content + app in one repo", "Next.js"],
          ["Strict DI & testability culture", "Angular (+ Nest similar mental model)"],
          ["Ship MVP this month, 2–3 people", "Next or Vite React"],
          ["Heavy offline / complex client domain", "SPA + solid client store"],
          ["Many external API consumers", "Separate API + OpenAPI, thin UIs"],
        ]}
      />
    </Stack>
  );
}

function LearnPath({ onGo }: { onGo: (s: Section) => void }) {
  return (
    <Stack gap={16}>
      <H2>Learning path (practical)</H2>
      <Text tone="secondary">
        Order matters. Architecture clicks after you feel pain of unstructured
        growth — but you can shortcut with deliberate practice.
      </Text>

      <Table
        headers={["Phase", "Focus", "Concrete practice"]}
        rows={[
          [
            "1",
            "Principles",
            "Redraw one app as layers; list what each folder may import",
          ],
          [
            "2",
            "One framework deep",
            "Angular: feature + DI + route providers. React: Thinking in React + Query",
          ],
          [
            "3",
            "Compare deliberately",
            "Same todo app in both: note where structure is forced vs chosen",
          ],
          [
            "4",
            "Add API + DB",
            "OpenAPI contract; use-cases; migrations; no SQL in UI",
          ],
          [
            "5",
            "Scale patterns",
            "Monorepo boundaries, auth, caching, observability",
          ],
        ]}
        columnAlign={["center", "left", "left"]}
      />

      <H3>Docs to read (canonical)</H3>
      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader>Angular</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• angular.dev style guide (feature folders)</Text>
              <Text>• Dependency injection + route providers</Text>
              <Text>• Signals fundamentals</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>React / Next</CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>• react.dev — Thinking in React</Text>
              <Text>• Scaling with reducer + context</Text>
              <Text>• nextjs.org — Server vs Client Components</Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <Callout tone="success" title="Next step with me">
        Pick one: (A) deep-dive a principle with a before/after folder tree, (B)
        Angular feature architecture sketch for an app you name, (C) React/Next
        layering for the same app, (D) backend + data model for that app.
      </Callout>

      <Row gap={8}>
        <Button  onClick={() => onGo("principles")}>
          Back to principles
        </Button>
        <Button  variant="primary" onClick={() => onGo("decide")}>
          Decision guide
        </Button>
      </Row>
    </Stack>
  );
}
