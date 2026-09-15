import {
  Button,
  Callout,
  Card,
  CardBody,
  CardHeader,
  CollapsibleSection,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Spacer,
  Stack,
  Table,
  Text,
  useCanvasState,
  useHostTheme,
} from "cursor/canvas";

type SectionId =
  | "frameworks"
  | "state"
  | "html"
  | "infra"
  | "javascript"
  | "testing";

function Topic({
  title,
  definition,
  explanation,
  relevance,
  tradeoffs,
  defaultOpen,
}: {
  title: string;
  definition: string;
  explanation: string;
  relevance?: string;
  tradeoffs: string;
  defaultOpen?: boolean;
}) {
  const theme = useHostTheme();
  return (
    <CollapsibleSection title={title} defaultOpen={defaultOpen}>
      <Stack gap={10} style={{ paddingBottom: 8 }}>
        <Stack gap={4}>
          <Text size="small" weight="semibold" tone="secondary">
            Definition
          </Text>
          <Text>{definition}</Text>
        </Stack>
        <Stack gap={4}>
          <Text size="small" weight="semibold" tone="secondary">
            Explanation
          </Text>
          <Text>{explanation}</Text>
        </Stack>
        {relevance ? (
          <Stack gap={4}>
            <Text size="small" weight="semibold" tone="secondary">
              React / Next.js
            </Text>
            <Text
              style={{
                padding: 10,
                background: theme.fill.tertiary,
                borderRadius: 6,
              }}
            >
              {relevance}
            </Text>
          </Stack>
        ) : null}
        <Stack gap={4}>
          <Text size="small" weight="semibold" tone="secondary">
            Tradeoffs / when to use
          </Text>
          <Text tone="secondary">{tradeoffs}</Text>
        </Stack>
      </Stack>
    </CollapsibleSection>
  );
}

function FrameworksSection() {
  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>Frameworks — rendering & tradeoffs</H2>
        <Text tone="secondary">
          Senior interviews probe whether you can pick SSR, SSG, ISR, or CSR per
          route — and explain hydration, caching, and SEO consequences.
        </Text>
      </Stack>

      <Callout tone="info" title="App Router mental model (official)">
        Routes are Server Components by default. Static shell can include cached
        data; request-time dynamic parts stream via Suspense. Fetch caching maps
        roughly to classic getStaticProps / getServerSideProps / ISR.
      </Callout>

      <Table
        headers={["Mode", "When HTML is built", "Data freshness", "SEO"]}
        columnAlign={["left", "left", "left", "left"]}
        rows={[
          [
            "SSG / static",
            "Build time (or on-demand ISR)",
            "Cached until revalidate",
            "Excellent — full HTML for crawlers",
          ],
          [
            "SSR / dynamic",
            "Every request",
            "Always fresh",
            "Excellent — personalized HTML possible",
          ],
          [
            "CSR / SPA",
            "Minimal shell; JS fills UI",
            "Client fetch after load",
            "Weak without prerender / SSR",
          ],
          [
            "Streaming RSC",
            "Shell first, then chunks",
            "Mix of static + dynamic",
            "Strong — HTML arrives early",
          ],
        ]}
        striped
      />
      <Text size="small" tone="tertiary">
        Source: Next.js App Router docs (ISR, fetch cache, caching guides) via
        Context7 · /vercel/next.js
      </Text>

      <Topic
        title="SSR — Server-Side Rendering"
        defaultOpen
        definition="HTML is generated on the server for each request, then sent to the browser where React hydrates interactive islands."
        explanation="Use when content depends on request context (cookies, auth, geo, A/B) or must be fresh on every hit. Cost: TTFB grows with server work; cache carefully or you pay per request."
        relevance="In App Router: fetch with cache: 'no-store', reading cookies()/headers(), or other dynamic APIs opts the route into dynamic rendering. Pair with Suspense so the static shell can stream while dynamic parts resolve."
        tradeoffs="Best for personalized dashboards, checkout, and SEO pages that change per user. Avoid for marketing pages that could be static — you burn compute and lose CDN edge benefits."
      />

      <Topic
        title="SSG — Static Site Generation"
        definition="Pages (and often data) are prerendered at build time into HTML/JSON that a CDN can serve without hitting an origin Node process."
        explanation="generateStaticParams tells Next which dynamic segments to prerender. Unlisted paths can still be generated on first request depending on dynamicParams. Ideal for content that is shared across users."
        relevance="export async function generateStaticParams() { ... } plus default static behavior. Combine with export const revalidate = N or fetch next: { revalidate: N } for ISR (stale-while-revalidate style page updates)."
        tradeoffs="Use for blogs, docs, product catalogs, landing pages. Poor fit when every visitor needs unique HTML or data changes every second without an ISR strategy."
      />

      <Topic
        title="SPA / CSR — Client-Side Rendering"
        definition="The browser downloads a JS bundle, mounts React, then fetches data. Initial HTML is often a thin shell."
        explanation="Great DX for highly interactive apps behind login. Crawlers that do not execute JS see little content; social previews fail without server metadata; first contentful paint waits on JS."
        relevance="Mark Client Components with 'use client'. Prefer Server Components for data fetching when possible; use CSR for interactive widgets, forms with rich client state, and browser-only APIs."
        tradeoffs="Choose when SEO is irrelevant (admin tools) or you already SSR a shell. Do not ship a pure SPA marketing site if organic search and OG previews matter."
      />

      <Topic
        title="Hydration & hydration issues"
        definition="Hydration attaches React's event system and fiber tree to server-rendered HTML. The first client render must match the server HTML."
        explanation="Mismatches come from Date.now(), Math.random(), locale formatting, typeof window checks in render, or browser-only APIs during the initial pass. React may recover but handlers can attach wrong; treat mismatches as bugs."
        relevance="Docs patterns: useEffect + didMount for client-only UI; useSyncExternalStore(..., getServerSnapshot) for external stores; suppressHydrationWarning only for known-safe text like timestamps. In Next, keep Server Components pure and push browser APIs into Client Components."
        tradeoffs="Fix root causes before suppressing warnings. Client-only branches after mount avoid mismatches but delay interactive content — acceptable for theme from localStorage, not for primary SEO body text."
      />

      <Topic
        title="SPA SEO vs SSR/SSG SEO"
        definition="SEO depends on crawlers receiving meaningful HTML (and metadata) without relying solely on client JS execution."
        explanation="SSR/SSG emit real titles, body text, and Open Graph tags in the first response. Pure SPAs often need prerender services or migrate to SSR. Indexing + social cards are separate concerns from 'Google can run JS sometimes'."
        relevance="Next Metadata API / generateMetadata run on the server. Static and dynamic HTML both work; CSR-only pages struggle with OG scrapers that do not run your bundle."
        tradeoffs="Public content: prefer SSG/ISR or SSR. Authenticated app screens: SEO usually irrelevant — CSR or dynamic RSC is fine."
      />

      <Topic
        title="SSG data fetching & ISR"
        definition="At build (or revalidation) time, Next fetches data, embeds it in static HTML, and can refresh on a timer or on-demand without a full redeploy."
        explanation="ISR serves the cached page immediately, then regenerates in the background after revalidate — classic stale-while-revalidate at the page layer. On-demand revalidateTag / revalidatePath invalidates when CMS webhooks fire."
        relevance="fetch('...', { cache: 'force-cache' }) ≈ static; { next: { revalidate: 10 } } ≈ ISR; { cache: 'no-store' } ≈ SSR. Newer 'use cache' + cacheLife/cacheTag refine the same idea."
        tradeoffs="ISR wins for semi-static catalogs. Pure SSG wins when content changes only on deploy. Avoid ISR intervals that are so short they behave like uncached SSR with extra complexity."
      />

      <Topic
        title="Advanced composition: static + stream + dynamic"
        definition="One route can mix a prerendered shell, cached shared data, and request-time personalized UI."
        explanation="Official caching guide pattern: static header/nav, cached blog list with cacheLife, and Suspense-wrapped user preferences that read cookies. Users see fast HTML; personalization streams in."
        relevance="This is the senior App Router answer: do not pick one mode for the whole app — pick per component boundary."
        tradeoffs="More mental overhead than classic pages/ getServerSideProps. Worth it when TTFB and personalization both matter."
      />
    </Stack>
  );
}

function StateSection() {
  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>State management — pick with reasoning</H2>
        <Text tone="secondary">
          Split server state (async remote data) from client state (UI, ephemeral
          form drafts, session-scoped flags). Wrong tool for the wrong kind of
          state is a common senior fail.
        </Text>
      </Stack>

      <Table
        headers={["Approach", "Owns", "Strength", "Cost"]}
        rows={[
          [
            "Server Components + fetch",
            "Server/remote data",
            "No client waterfalls; secrets stay server-side",
            "No client cache/refetch UX unless you add more",
          ],
          [
            "TanStack Query",
            "Server state on client",
            "Cache, staleTime, retries, SSR hydrate",
            "Another layer; overkill if RSC fetch is enough",
          ],
          [
            "React Context",
            "Low-churn shared UI values",
            "Built-in; good for theme/locale/DI",
            "Broad value changes re-render consumers",
          ],
          [
            "Zustand",
            "Client UI / domain state",
            "No provider tax; selectors; tiny API",
            "You invent structure; easy to overgrow",
          ],
          [
            "Redux Toolkit",
            "Complex client domain",
            "DevTools, patterns, middleware, RTK Query",
            "Boilerplate + ceremony for small apps",
          ],
        ]}
        striped
      />
      <Text size="small" tone="tertiary">
        Sources: Context7 — Zustand /pmndrs/zustand, TanStack Query
        /tanstack/query, React /reactjs/react.dev, Next.js /vercel/next.js
      </Text>

      <Topic
        title="Server state vs client state (App Router)"
        defaultOpen
        definition="Server state is data whose source of truth is the backend (or cache). Client state is data whose source of truth is the browser UI session."
        explanation="Lists from an API, user profile, cart on the server = server state. Modal open, selected tab, unsaved draft text, optimistic UI flags = client state. Mixing them in one Redux store recreates a second backend."
        relevance="Default: fetch in Server Components. Add TanStack Query when you need client refetch, infinite scroll, shared cache across client trees, or migrating an existing SPA. TanStack docs: treat Server Components as a prefetch layer; avoid rendering query results in RSC if the client will revalidate — they can drift."
        tradeoffs="New RSC app: start with framework fetch. Bring Query when you feel the pain. Never put server lists only in Context."
      />

      <Topic
        title="React Context"
        definition="A built-in way to pass a value through the tree without prop drilling; consumers re-render when the provided value identity changes."
        explanation="Ideal for dependency injection (theme, i18n, auth session object that rarely changes). Bad as a high-frequency store unless you split contexts and memoize carefully."
        relevance="Works in Client Components. Server Components can pass props into a client Provider. Do not wrap the entire app in a giant mutable Context for every entity."
        tradeoffs="Use for stable, tree-wide config. Prefer Zustand/Redux when many unrelated fields update independently."
      />

      <Topic
        title="Zustand"
        definition="A minimal external store with a hook API and selectors; no required Provider for the simple create() pattern."
        explanation="create() returns a hook; select slices to limit re-renders; useShallow for object picks. For Next App Router, official guidance often wraps a per-request store factory in Context so SSR does not share mutable singleton state across users."
        relevance="Excellent for UI chrome, wizards, and client-only domain logic beside RSC data. Pair with Server Actions / router refresh for mutations that must hit the server."
        tradeoffs="Default choice for medium client state without Redux ceremony. Reach for RTK when many teams need strict conventions, time-travel, or RTK Query as the data layer."
      />

      <Topic
        title="Redux Toolkit (RTK)"
        definition="Opinionated Redux with createSlice, Immer drafts, configureStore, and optional RTK Query for server cache."
        explanation="Scales when multiple features share complex transitions, middleware, and auditability. Selectors and normalized entities are first-class. Heavier than Zustand for a settings drawer."
        relevance="Use in large client-heavy Next apps or when the team already standardizes on Redux. Keep server-fetched page data in RSC or RTK Query — not duplicated ad hoc thunks without a cache policy."
        tradeoffs="Choose for large multi-team client domains. Skip for small apps — Zustand or Context will ship faster."
      />

      <Topic
        title="TanStack Query (React Query)"
        definition="A server-state library: keyed cache, stale/fresh semantics, background refetch, retries, and SSR dehydration/hydration."
        explanation="staleTime controls when data is considered fresh (Next SSR examples often use 60s to avoid immediate client refetch). Server: new QueryClient per request. Browser: singleton. HydrationBoundary passes dehydrated cache into client components."
        relevance="Fits App Router when Client Components own interactive lists that refetch. Prefetch in a Server Component, dehydrate, hydrate on the client. If framework fetch + revalidate covers the case, skip Query."
        tradeoffs="Use for client-driven async UX. Do not fight RSC by reimplementing the entire data layer in Query 'just because'."
      />

      <Card>
        <CardHeader>Interview decision tree</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text>
              1. Is the source of truth remote? Prefer RSC fetch or TanStack Query
              — not Redux/Zustand as the cache.
            </Text>
            <Text>
              2. Is it UI-only and local? useState / useReducer first.
            </Text>
            <Text>
              3. Shared across distant clients with frequent updates? Zustand
              (or RTK if org standard).
            </Text>
            <Text>
              4. Stable app-wide config? Context.
            </Text>
            <Text>
              5. Need offline, normalized graph, complex middleware? RTK (+ Query
              or RTK Query).
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

function HtmlSeoSection() {
  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>HTML & SEO proficiency</H2>
        <Text tone="secondary">
          Grounded in Next.js Metadata, sitemap.ts, and robots.ts conventions
          (Context7 · /vercel/next.js).
        </Text>
      </Stack>

      <Topic
        title="Open Graph (and social metadata)"
        defaultOpen
        definition="Open Graph is a set of meta tags (og:title, og:description, og:image, og:url, …) that scrapers use for link previews on social platforms."
        explanation="Without OG tags, shares show generic titles or empty cards. Images should be absolute URLs, adequate size, and stable. Twitter/X has parallel twitter: cards; many sites set both."
        relevance="export const metadata: Metadata = { openGraph: { ... } } or async generateMetadata() that fetches per-entity data and can extend parent openGraph.images. Runs on the server — scrapers see tags in HTML."
        tradeoffs="Static metadata for sitewide defaults; generateMetadata for product/blog pages. Always provide a default og:image. Dynamic OG image routes are powerful but add caching complexity."
      />

      <Topic
        title="Sitemaps (including dynamic)"
        definition="A sitemap.xml lists canonical URLs (and optional lastmod, changefreq, priority) so crawlers discover pages efficiently."
        explanation="Static sitemaps suit small sites. Dynamic sitemaps query CMS/DB at request or build time and return URL arrays. Large sites split into sitemap indexes."
        relevance="app/sitemap.ts exports default function sitemap(): MetadataRoute.Sitemap { return [...] }. Cached by default. Pull slugs from your CMS the same way generateStaticParams does."
        tradeoffs="Always keep sitemap URLs in sync with indexable routes. Exclude noindex, auth-only, and duplicate faceted URLs. Link the sitemap from robots.txt."
      />

      <Topic
        title="robots.txt"
        definition="A robots.txt file tells well-behaved crawlers which paths they may fetch and where the sitemap lives. It is not an access-control mechanism."
        explanation="Disallow private or infinite URL spaces (filters, preview tokens). Allow public content. Malicious bots ignore robots.txt — protect secrets with auth, not Disallow."
        relevance="app/robots.ts returns MetadataRoute.Robots with rules.userAgent, allow, disallow, and sitemap URL. Environment-specific rules (block staging) are a common pattern."
        tradeoffs="Use robots for crawl budget and polite exclusions. Use authentication + headers for real secrecy. Pair with noindex metadata when a page should exist but not rank."
      />

      <Callout tone="neutral" title="Senior SEO checklist for Next">
        Unique title/description per indexable route · Absolute canonical · OG
        image · sitemap coverage · robots alignment · meaningful HTML from
        SSR/SSG (not empty CSR shell) · Core Web Vitals as ranking-adjacent UX.
      </Callout>
    </Stack>
  );
}

function InfraSection() {
  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>Infrastructure</H2>
        <Text tone="secondary">
          Monorepos and delivery are platform knowledge; Next-specific pieces
          (NEXT_PUBLIC_, build outputs) call out where relevant. Turborepo notes
          from Context7 · /vercel/turborepo.
        </Text>
      </Stack>

      <H3>Monorepos</H3>

      <Topic
        title="Workspaces (npm / pnpm / yarn)"
        defaultOpen
        definition="Package-manager workspaces link multiple packages in one repo so local packages resolve like published dependencies."
        explanation="Root package.json lists workspaces: ['apps/*', 'packages/*']. Shared UI, eslint-config, and tsconfig live in packages/; apps consume them. pnpm is popular for strict node_modules and speed."
        relevance="Next apps sit in apps/web; import from @acme/ui. Keep Next config and env per app. Avoid circular workspace deps."
        tradeoffs="Use when multiple apps share code. Skip for a single app — extra structure without payoff."
      />

      <Topic
        title="Turborepo"
        definition="A task runner/build system for JS/TS monorepos: schedules package.json scripts, caches outputs locally/remotely, parallelizes across cores."
        explanation="turbo.json (or package pipeline) declares task dependsOn (e.g. ^build), outputs (.next/**), and cache: false for dev. Remote cache (TURBO_TOKEN, TURBO_TEAM) makes CI reuse artifacts."
        relevance="turbo run build test lint over a Next monorepo. Cache .next/** but exclude .next/cache/** per docs. Incremental adoption — add turbo without rewriting packages."
        tradeoffs="Best when builds/tests dominate CI time. Less opinionated than Nx on generators/project graph — pair with workspaces."
      />

      <Topic
        title="Nx"
        definition="An extensible monorepo toolkit with project graph, generators, affected commands, optional computation caching, and plugins (including Next)."
        explanation="Stronger opinions and tooling than Turborepo alone: code generation, module boundaries, release helpers. Higher learning curve."
        relevance="Nx Next plugins scaffold apps/libs. Use affected:build so only changed projects rebuild in CI."
        tradeoffs="Choose Nx for large orgs needing generators and enforced boundaries. Choose Turborepo for lightweight caching on existing workspaces. They can coexist in some setups but pick one primary orchestrator."
      />

      <Topic
        title="Lerna"
        definition="Historically a multi-package publishing tool; modern Lerna often pairs with Nx for versioning/publishing workflows."
        explanation="Classic Lerna bootstrap/publish is largely superseded by workspaces + Changesets/Nx release. Still appears in legacy repos."
        relevance="Rare as greenfield Next choice today. Migrate mental model to workspaces + Turborepo/Nx + Changesets."
        tradeoffs="Maintain if inherited; do not start new React monorepos on classic Lerna alone."
      />

      <Divider />
      <H3>Release, env, distribution</H3>

      <Topic
        title="Release strategies"
        definition="How versions move from main to production: continuous deploy, staged rollouts, canaries, feature flags, and versioned packages."
        explanation="App repos often CD every main merge to preview + prod with flags. Library monorepos use semver + Changesets. Canary releases validate before promoting. Rollback = previous immutable deployment."
        relevance="Vercel/Netlify preview deployments per PR. Feature flags beat long-lived release branches for UI. Keep migrations backward-compatible for expand/contract deploys."
        tradeoffs="Trunk-based + flags for product apps. Strict semver for published packages. Avoid environment drift between staging and prod."
      />

      <Topic
        title="Environment variables"
        definition="Config injected per environment. Secrets must never ship to the browser bundle."
        explanation="Server-only secrets: DATABASE_URL, AUTH_SECRET. Client-visible: only non-secrets."
        relevance="Next: only NEXT_PUBLIC_* is inlined into Client Components. Server Components and Route Handlers can read unprefixed env. Never put API private keys in NEXT_PUBLIC_. Document required vars; fail fast at boot."
        tradeoffs="Prefer runtime server env for secrets (flexible). Build-time NEXT_PUBLIC_ needs rebuild to change — fine for public CDN URLs, bad for secrets."
      />

      <Topic
        title="Distribution flow"
        definition="The path from commit to users: CI build → artifact → edge/CDN → browsers, plus package publish for libraries."
        explanation="Typical Next SaaS: PR checks → merge → build → deploy immutable URL → CDN cache → optional gradual traffic shift. Monorepo libraries: version bump → npm publish → apps bump dependency."
        relevance="Output: .next build (and standalone Docker output when containerizing). Edge middleware/proxy runs at the CDN layer for auth redirects before the page."
        tradeoffs="Immutable deploys simplify rollback. Mutating a server in place fights CDNs and caching assumptions."
      />

      <Divider />
      <H3>Web performance infrastructure</H3>

      <Topic
        title="Compression, HTTP/2/3, cache headers, CDN, SWR"
        definition="Transport and caching layers that cut latency independent of React code quality."
        explanation="Gzip/Brotli shrink text assets. HTTP/2/3 multiplex requests (H3 over QUIC helps lossy networks). Cache-Control (max-age, s-maxage, stale-while-revalidate) tells browsers and CDNs what to reuse. A CDN terminates TLS near users and caches static/ISR output. stale-while-revalidate serves stale immediately while refreshing — same idea as Next ISR."
        relevance="Next/Vercel sets much of this for static assets and ISR. You still choose Cache-Control on Route Handlers and external APIs. Align CDN TTL with revalidate. HTML for personalized SSR should be private/no-store at the edge."
        tradeoffs="Aggressive public caching for static; short or private for personalized. SWR improves UX but can briefly show stale content — fine for blogs, careful for prices/inventory."
      />
    </Stack>
  );
}

function JavaScriptSection() {
  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>JavaScript (engine, perf, structures, types, auth)</H2>
        <Text tone="secondary">
          Engine and data-structure topics are language/runtime knowledge. Auth
          wiring cites Auth.js patterns from Context7 · /websites/authjs_dev.
        </Text>
      </Stack>

      <H3>JS engine & concurrency</H3>

      <Topic
        title="Call stack, event loop, microtasks & macrotasks"
        defaultOpen
        definition="JS runs on a single call stack. The event loop schedules work from task queues when the stack is empty. Microtasks (Promises, queueMicrotask) run before the next macrotask (setTimeout, I/O, MessageChannel)."
        explanation="Sync code runs to completion. then/catch/await continuations flush the microtask queue fully between macrotasks. Long sync work blocks rendering and input — break it up or move to Workers."
        relevance="React 18+ concurrent features interleave work but still sit on the same JS thread. Heavy computation in render or effects janks hydration and interactions. Prefer async boundaries and transitions for non-urgent updates."
        tradeoffs="Know ordering for interview puzzles (Promise vs setTimeout). In production, profile long tasks; do not micro-optimize queue order without a symptom."
      />

      <H3>Performance tooling</H3>

      <Topic
        title="Chrome Performance + heap snapshots / leaks"
        definition="Performance panel records CPU timeline (long tasks, scripting, rendering). Memory / heap snapshots compare retained objects to find leaks."
        explanation="Look for long tasks >50ms, layout thrash, excessive scripting after navigation. Heap: take snapshot, interact, snapshot again, compare — detached DOM nodes and growing closures indicate leaks. Allocation instrumentation finds churn."
        relevance="Profile hydration and route transitions in Next. Watch for accidental retainers: uncleared intervals, global event listeners, module-level caches, React Query clients with wrong gcTime, Zustand stores holding large graphs."
        tradeoffs="Fix user-visible jank first (LCP/INP). Heap work is for confirmed growth over time, not premature."
      />

      <H3>Advanced structures</H3>

      <Grid columns={2} gap={12}>
        <Card>
          <CardHeader trailing={<Pill tone="neutral">Tree</Pill>}>
            Trees
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>
                Hierarchical nodes (DOM, React fiber conceptually, file systems,
                UI menus). DFS/BFS traversal; balanced trees for ordered maps.
              </Text>
              <Text tone="secondary">
                When: nested comments, org charts, virtualized file browsers.
                Prefer adjacency lists from APIs over deep recursive props without
                memo boundaries.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="neutral">Graph</Pill>}>
            Graphs
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>
                Nodes + edges (directed/undirected). Used for dependency graphs,
                social links, routing, monorepo project graphs.
              </Text>
              <Text tone="secondary">
                When: permissions inheritance, recommendation edges, build
                pipelines. Watch cycles; memoize expensive traversals.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="neutral">List</Pill>}>
            Linked lists
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>
                Nodes with next (and prev) pointers. O(1) insert/delete given a
                reference; O(n) random access.
              </Text>
              <Text tone="secondary">
                Rare in app UI vs arrays. Appears in interview algorithms, LRU
                cache internals, some streaming buffers.
              </Text>
            </Stack>
          </CardBody>
        </Card>
        <Card>
          <CardHeader trailing={<Pill tone="neutral">Queue</Pill>}>
            Queues
          </CardHeader>
          <CardBody>
            <Stack gap={6}>
              <Text>
                FIFO structure. Underpins task queues, job processors, BFS,
                rate-limit windows.
              </Text>
              <Text tone="secondary">
                Frontend: toast queues, upload queues, optimistic mutation
                queues. Backend: SQS/Rabbit/Bull for Next background work.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>

      <H3>Special types</H3>

      <Topic
        title="Symbol, BigInt, Infinity"
        definition="Symbol: unique immutable identifier, often used as non-string object keys. BigInt: arbitrary-precision integers (suffix n). Infinity: numeric value from overflow or division by zero; typeof Infinity === 'number'."
        explanation="Symbols avoid key collisions (Symbol.iterator, Symbol.toStringTag). BigInt cannot mix with Number via + without conversion; JSON.stringify does not support BigInt by default. Infinity compares oddly — prefer Number.isFinite for validation."
        relevance="Rare in React props (prefer strings/numbers). Symbols can tag meta on objects. BigInt for IDs beyond Number.MAX_SAFE_INTEGER when APIs require it — serialize carefully across RSC boundaries."
        tradeoffs="Use Number for normal UI metrics. BigInt only when precision demands it. Symbols for library protocol keys, not general React state."
      />

      <H3>Auth layers with known providers</H3>

      <Callout tone="warning" title="Pattern first — not fake API trivia">
        Interviewers want OAuth/OIDC flow literacy and where tokens live in a
        Next app. Do not memorize every provider SDK method; know the shared
        shape and high-level differences.
      </Callout>

      <Topic
        title="Auth layer pattern (OAuth / OIDC / sessions)"
        defaultOpen
        definition="Users authenticate with an Identity Provider (IdP). Your app receives tokens (and optionally creates a session) then authorizes requests using that session or bearer token."
        explanation="Authorization Code (+ PKCE for public clients) is the browser-safe OAuth flow. OIDC adds ID tokens (user identity). Sessions: store opaque session ID in httpOnly Secure cookie; server looks up session. JWT sessions: signed cookie/token without server store (tradeoffs on revoke/size)."
        relevance="Auth.js (NextAuth): auth.ts configures providers; app/api/auth/[...nextauth]/route.ts exports handlers GET/POST; auth() reads session in Server Components/Route Handlers; middleware/proxy can gate routes; cookies stay httpOnly. Env: client IDs/secrets server-side only."
        tradeoffs="Cookie sessions for classic SSR apps. Bearer tokens for pure APIs/SPAs. Prefer server-side session validation for Next HTML routes."
      />

      <Table
        headers={["Provider family", "Typical protocol", "Notes for Next"]}
        rows={[
          [
            "Facebook Login",
            "OAuth 2.0",
            "Social identity; Auth.js Facebook provider; app review for some scopes",
          ],
          [
            "Microsoft / Entra ID (Azure AD)",
            "OIDC / OAuth",
            "Work/school tenants; tenantId matters; Auth.js Azure AD provider",
          ],
          [
            "Google",
            "OIDC",
            "Common social + Workspace; refresh token needs offline access params",
          ],
          [
            "Firebase Auth",
            "Tokens + SDK",
            "Client SDK + ID tokens; verify tokens on server; different shape than Auth.js-first",
          ],
          [
            "Okta / Auth0-class",
            "OIDC enterprise",
            "SSO, MFA, org policies; standard OIDC app registration",
          ],
        ]}
        striped
      />

      <Stack gap={6}>
        <Text weight="semibold">Wiring checklist (Next App Router)</Text>
        <Text>
          1. Register redirect URI to your Auth route handler callback URL.
        </Text>
        <Text>
          2. Keep client secret on server; expose only public client ID if
          required.
        </Text>
        <Text>
          3. Establish session cookie after callback; never store access tokens
          in localStorage for XSS-sensitive apps.
        </Text>
        <Text>
          4. Protect via middleware/proxy matcher + auth() in sensitive Server
          Components / Route Handlers.
        </Text>
        <Text>
          5. Refresh tokens: rotate carefully (Auth.js docs show provider-specific
          refresh patterns); handle RefreshTokenError in UI.
        </Text>
        <Text>
          6. Firebase-style: verify ID token with Admin SDK in Route Handlers;
          do not trust client-only auth state for authorization.
        </Text>
      </Stack>
    </Stack>
  );
}

function TestingSection() {
  return (
    <Stack gap={16}>
      <Stack gap={6}>
        <H2>Testing process literacy</H2>
        <Text tone="secondary">
          Senior expectation: know the funnel from human exploration to
          automated gates — and what each layer catches.
        </Text>
      </Stack>

      <Table
        headers={["Layer", "Definition", "Primary question", "Typical tools"]}
        rows={[
          [
            "Manual",
            "Human explores builds against scenarios/checklists",
            "Does this feel right / edge cases?",
            "Checklists, exploratory charters",
          ],
          [
            "A/B",
            "Controlled experiment between variants on real traffic",
            "Which variant wins a metric?",
            "Flags, experiment platforms, stats",
          ],
          [
            "Smoke",
            "Shallow critical-path checks after deploy/build",
            "Is the build obviously broken?",
            "Hit /, login, checkout start",
          ],
          [
            "Automation",
            "Scripted repeatable tests in CI",
            "Did we regress known behavior?",
            "Jest/Vitest, Testing Library, Playwright/Cypress",
          ],
        ]}
        striped
      />

      <Topic
        title="Manual testing"
        defaultOpen
        definition="Structured or exploratory human validation of behavior, UX, and edge cases that scripts do not yet encode."
        explanation="Use for new UX, accessibility spot checks, visual polish, and weird integrations. Write down charters so exploration is not random thrash. Feed bugs back into automation when they are stable regressions."
        relevance="Click through App Router navigations, auth redirects, and form Server Actions. Verify loading/error.tsx boundaries manually before investing in e2e."
        tradeoffs="Essential early and for UX. Too slow as the only gate for a large suite of known behaviors."
      />

      <Topic
        title="A/B testing"
        definition="Split traffic between variants, measure a predefined metric, and ship the winner with statistical discipline."
        explanation="Needs: hypothesis, primary metric, sample size/duration, guardrail metrics. Feature flags assign variants. Avoid peeking bias and underpowered tests."
        relevance="Implement via edge middleware/flags or client SDKs. Keep variants compatible with SSR to avoid hydration mismatches (same server decision must match client). Holdbacks validate long-term effects."
        tradeoffs="Use for product decisions under uncertainty. Do not A/B obvious accessibility or security fixes."
      />

      <Topic
        title="Smoke testing"
        definition="A minimal set of checks proving the deployed system boots and critical journeys respond."
        explanation="Run post-deploy: homepage 200, auth login page loads, API health, maybe one write path. Fast fail beats deep coverage here."
        relevance="Curl your production URL after Vercel deploy; Playwright smoke project with 3–5 tests tagged @smoke. Gate promotions on smoke green."
        tradeoffs="Catches 'site down' and gross config errors. Will not catch subtle logic bugs — that is automation depth."
      />

      <Topic
        title="Automation strategy (pyramid / trophy)"
        definition="Most coverage in fast unit/integration tests; fewer expensive e2e tests for critical user paths; static checks (types/lint) as always-on gates."
        explanation="Unit: pure functions, reducers, price calculators. Component/integration: Testing Library against realistic DOM. E2E: Playwright for login → checkout. Contract tests for APIs. Visual regression optional for design systems."
        relevance="React Testing Library for components; Mock server data at boundaries. Prefer testing user behavior over implementation details. For Next: unit test utilities; e2e the real server for middleware/auth/cookies; avoid over-mocking the framework."
        tradeoffs="Invert the pyramid (too many e2e) → slow flaky CI. Zero e2e → shipping integration holes. Balance by risk."
      />

      <Card>
        <CardHeader>Practical implementation order</CardHeader>
        <CardBody>
          <Stack gap={6}>
            <Text>
              1. Typecheck + lint on every PR.
            </Text>
            <Text>
              2. Unit/integration for pure logic and critical components.
            </Text>
            <Text>
              3. E2E for top revenue/auth paths only.
            </Text>
            <Text>
              4. Smoke on every production deploy.
            </Text>
            <Text>
              5. Manual exploratory for new surfaces; A/B when metric tradeoffs
              are unclear.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
}

export default function ReactNextInterviewGuide() {
  const theme = useHostTheme();
  const [section, setSection] = useCanvasState<SectionId>(
    "section",
    "frameworks",
  );

  return (
    <Stack
      gap={20}
      style={{
        padding: 24,
        maxWidth: 960,
      }}
    >
      <Stack gap={8}>
        <Row gap={8} align="center">
          <H1>React & Next.js — senior interview guide</H1>
          <Spacer />
          <Pill tone="info">Context7 grounded</Pill>
        </Row>
        <Text tone="secondary">
          Definitions, explanations, framework relevance, and tradeoffs for
          frameworks, state, SEO, infrastructure, JavaScript, and testing.
          Framework/SEO/state/auth/monorepo notes cite official docs fetched via
          Context7 (Next.js, React, Zustand, TanStack Query, Auth.js, Turborepo).
        </Text>
      </Stack>

      <Row gap={8} wrap>
        <Button
          variant={section === "frameworks" ? "primary" : "secondary"}
          onClick={() => setSection("frameworks")}
        >
          Frameworks
        </Button>
        <Button
          variant={section === "state" ? "primary" : "secondary"}
          onClick={() => setSection("state")}
        >
          State
        </Button>
        <Button
          variant={section === "html" ? "primary" : "secondary"}
          onClick={() => setSection("html")}
        >
          HTML / SEO
        </Button>
        <Button
          variant={section === "infra" ? "primary" : "secondary"}
          onClick={() => setSection("infra")}
        >
          Infrastructure
        </Button>
        <Button
          variant={section === "javascript" ? "primary" : "secondary"}
          onClick={() => setSection("javascript")}
        >
          JavaScript
        </Button>
        <Button
          variant={section === "testing" ? "primary" : "secondary"}
          onClick={() => setSection("testing")}
        >
          Testing
        </Button>
      </Row>

      <Divider />

      {section === "frameworks" ? <FrameworksSection /> : null}
      {section === "state" ? <StateSection /> : null}
      {section === "html" ? <HtmlSeoSection /> : null}
      {section === "infra" ? <InfraSection /> : null}
      {section === "javascript" ? <JavaScriptSection /> : null}
      {section === "testing" ? <TestingSection /> : null}

      <Divider />
      <Text size="small" tone="tertiary">
        Docs libraries used: /vercel/next.js · /reactjs/react.dev ·
        /pmndrs/zustand · /tanstack/query · /websites/authjs_dev ·
        /vercel/turborepo. Platform topics (event loop, HTTP caching, data
        structures, testing pyramid, Nx/Lerna overview) are general web
        knowledge alongside those citations.
      </Text>
      <Text
        size="small"
        style={{ color: theme.text.quaternary }}
      >
        Study artifact — not a substitute for reading primary docs before an
        interview.
      </Text>
    </Stack>
  );
}
