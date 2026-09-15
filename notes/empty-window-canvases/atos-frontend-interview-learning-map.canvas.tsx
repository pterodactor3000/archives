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
  H3,
  Link,
  Row,
  Stack,
  Stat,
  Text,
  useHostTheme,
} from "cursor/canvas";

export default function AtosFrontendInterviewLearningMap() {
  const theme = useHostTheme();

  return (
    <Stack gap={24} style={{ maxWidth: 1120, margin: "0 auto", padding: 24 }}>
      <div
        style={{
          background: theme.fill.secondary,
          borderRadius: 8,
          padding: 20,
        }}
      >
        <Stack gap={8}>
          <H1>Senior Frontend Interview Learning Map</H1>
          <Text tone="secondary">
            React, Azure, delivery, scale, and leadership. Read core topics first;
            skim nice-to-haves only after you can explain the production concerns.
          </Text>
        </Stack>
      </div>

      <Grid columns={3} gap={16}>
        <Stat value="5" label="Core frontend topics" tone="info" />
        <Stat value="6" label="Delivery and scale topics" tone="warning" />
        <Stat value="6" label="Nice-to-have topics" />
      </Grid>

      <Card>
        <CardHeader>Senior answer pattern</CardHeader>
        <CardBody>
          <Grid columns={4} gap={16}>
            <Stack gap={4}>
              <Text weight="semibold">1. Frame</Text>
              <Text size="small" tone="secondary">
                State user impact, business goal, and constraints.
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text weight="semibold">2. Measure</Text>
              <Text size="small" tone="secondary">
                Name telemetry, logs, profiler output, or test evidence.
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text weight="semibold">3. Choose</Text>
              <Text size="small" tone="secondary">
                Explain solution, trade-off, and why simpler options fail.
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text weight="semibold">4. Verify</Text>
              <Text size="small" tone="secondary">
                Define success metric, rollout, rollback, and follow-up.
              </Text>
            </Stack>
          </Grid>
        </CardBody>
      </Card>

      <Callout tone="info" title="Tonight's target">
        You do not need every tool memorized. You need to explain how you would
        diagnose, make a safe change, measure impact, and collaborate with DevOps.
      </Callout>

      <Stack gap={12}>
        <H2>Core frontend</H2>

        <CollapsibleSection title="React" defaultOpen>
          <Stack gap={8}>
            <Text>
              React renders UI from props, state, and context; a component render
              does not automatically mean a browser DOM update. Use effects to
              synchronize with systems outside React, such as subscriptions, timers,
              network requests, or browser APIs, and clean them up when appropriate.
              Do not use an effect for data that can be derived during render.
            </Text>
            <Text>
              Profile before optimizing. <Text as="span" weight="semibold">memo</Text>{" "}
              can skip an expensive child render only when its props are stable;
              <Text as="span" weight="semibold"> useMemo</Text> caches a calculation;
              and <Text as="span" weight="semibold"> useCallback</Text> stabilizes a
              function reference. These are performance tools, not correctness tools,
              and missing dependencies create stale values.
            </Text>
            <Text>
              For a live event screen, separate server data from local UI state, update
              only changed records, virtualize large lists, and define reconnect,
              stale-data, loading, and error behavior. Use SSR or SSG for content that
              benefits from fast first render and SEO; use client-side live updates for
              changing event data.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="TypeScript" defaultOpen>
          <Stack gap={8}>
            <Text>
              Use strict TypeScript to make invalid states harder to represent and to
              catch mistakes before runtime. Prefer <Text as="span" weight="semibold">unknown</Text>{" "}
              over <Text as="span" weight="semibold">any</Text> at API boundaries, then
              validate and narrow data before use. TypeScript types are erased at
              runtime, so they do not prove an API or WebSocket payload is valid.
            </Text>
            <Text>
              Model asynchronous UI with discriminated unions such as loading, success,
              empty, and error states. Narrow using a stable literal field like{" "}
              <Text as="span" weight="semibold">status</Text>, then use exhaustive
              switches with <Text as="span" weight="semibold">never</Text> so a new state
              causes a compile-time failure. Use generics when a reusable component or
              API utility must preserve its caller's type information.
            </Text>
            <Text>
              In an interview, connect types to outcomes: safer refactoring, clearer
              component contracts, fewer integration defects, and faster reviews. Avoid
              claiming that a complicated type is automatically good; readability and
              useful errors matter more than type cleverness.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="HTML, CSS, and JavaScript" defaultOpen>
          <Stack gap={8}>
            <Text>
              Start with semantic HTML because it gives accessibility, keyboard support,
              and predictable browser behavior for free. Use native controls before ARIA,
              then add ARIA only when a native element cannot express the interaction.
              Test keyboard flows, focus order, labels, errors, and responsive layouts.
            </Text>
            <Text>
              Know Flexbox for one-dimensional alignment, Grid for two-dimensional
              layouts, and CSS containment or reserved dimensions when preventing layout
              shift matters. Avoid specificity wars by using a consistent component and
              token strategy. Optimize images, fonts, and layout stability before
              reaching for JavaScript fixes.
            </Text>
            <Text>
              In JavaScript, understand the event loop, promises, cancellation,
              debouncing versus throttling, immutability, and reference equality. These
              concepts explain common production issues: race conditions, stale UI,
              blocked interactions, and unexpected React rerenders.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Frontend architecture" defaultOpen>
          <Stack gap={8}>
            <Text>
              Organize code around features or domains so ownership and change impact are
              obvious. Keep rendering, API access, domain rules, and shared design-system
              primitives separated enough that a change in one does not require rewriting
              the others. A good architecture makes common change easy rather than making
              every hypothetical future change abstract.
            </Text>
            <Text>
              Define data ownership deliberately: server state, ephemeral component state,
              URL state, and cross-page client state have different lifecycles. Keep
              failure, loading, empty, permission, and offline states explicit. Expose
              typed APIs at boundaries and prevent UI components from knowing transport
              details where possible.
            </Text>
            <Text>
              Explain architecture with trade-offs. A small team may prefer a simple
              feature-folder structure; a large platform may need stricter package
              boundaries, a design system, observability conventions, and documented
              ownership. Start from actual requirements, not a favorite pattern.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Code quality and testing" defaultOpen>
          <Stack gap={8}>
            <Text>
              Quality standards should make safe behavior the easy default: strict types,
              linting, formatting, small focused pull requests, accessible components,
              and predictable error handling. Automate mechanical feedback so human
              reviews focus on correctness, security, performance, and product impact.
              Make standards visible in repository configuration and PR guidance.
            </Text>
            <Text>
              Use unit tests for pure logic and component behavior, integration tests for
              real feature boundaries, and a small number of end-to-end tests for critical
              user journeys. Test behavior users rely on rather than implementation
              details. Treat flaky tests as product risk because they weaken trust in the
              delivery pipeline.
            </Text>
            <Text>
              Storybook is useful when a component library needs isolated development,
              visual review, and documented states. It does not replace integration
              testing because production wiring, data behavior, and navigation still need
              coverage.
            </Text>
          </Stack>
        </CollapsibleSection>

        <Row gap={14} wrap>
          <Link href="https://react.dev/learn/you-might-not-need-an-effect">
            React effects
          </Link>
          <Link href="https://react.dev/reference/react/memo">React memoization</Link>
          <Link href="https://www.typescriptlang.org/docs/handbook/2/narrowing.html">
            TypeScript narrowing
          </Link>
          <Link href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility">
            MDN accessibility
          </Link>
        </Row>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>Delivery, observability, and scale</H2>

        <CollapsibleSection title="Azure DevOps and CI/CD" defaultOpen>
          <Stack gap={8}>
            <Text>
              Azure DevOps combines Repos, Boards, Pipelines, Artifacts, and related
              services; Azure DevOps itself is not automatically the hosting platform.
              A frontend pipeline should install deterministic dependencies, lint,
              type-check, test, build, scan dependencies, publish an artifact, deploy it,
              and run a smoke test. Build once and promote the same immutable artifact
              through environments.
            </Text>
            <Text>
              YAML pipelines use stages, jobs, and steps to show delivery flow and
              dependencies. Keep environment configuration and secrets out of source
              control, use protected variables or secret stores, and scope service
              connections tightly. Pull-request validation and branch policies should
              block merging when required checks or reviews fail.
            </Text>
            <Text>
              A senior answer includes release safety: feature flags, environment
              approvals where risk warrants them, observability after deploy, and a
              rollback plan. Do not say “CI/CD” as a synonym for deployment; it is a
              repeatable quality and delivery system.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Jenkins" defaultOpen>
          <Stack gap={8}>
            <Text>
              Jenkins defines delivery automation in a versioned{" "}
              <Text as="span" weight="semibold">Jenkinsfile</Text>. A Declarative
              Pipeline uses an <Text as="span" weight="semibold">agent</Text> to select
              execution environment, <Text as="span" weight="semibold">stages</Text> to
              group work such as build, test, and deploy, and{" "}
              <Text as="span" weight="semibold">steps</Text> to execute commands.
            </Text>
            <Text>
              Use <Text as="span" weight="semibold">post</Text> actions for outcomes such
              as publishing test reports, cleanup, notifications, and failure handling.
              Docker-based agents make build environments reproducible, which prevents
              “works on this runner” failures. Jenkins is often more self-managed than
              Azure Pipelines, so agent security, plugin lifecycle, and credentials need
              attention.
            </Text>
            <Text>
              In an interview, explain transferable pipeline principles rather than
              presenting Jenkins and Azure DevOps as identical products. The core concern
              is deterministic, visible, secure delivery with fast feedback.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Performance and Core Web Vitals" defaultOpen>
          <Stack gap={8}>
            <Text>
              Use lab tools such as Chrome DevTools and Lighthouse to reproduce and
              diagnose problems, but use real-user monitoring to prove customer impact.
              Core Web Vitals should be assessed at the 75th percentile of page loads:
              LCP measures loading, INP measures responsiveness, and CLS measures visual
              stability. Current “good” targets are LCP at or below 2.5 seconds, INP at
              or below 200 milliseconds, and CLS at or below 0.1.
            </Text>
            <Text>
              Segment telemetry by route, device, browser, geography, release version,
              and network condition before changing code. Common fixes include reducing
              render-blocking work, optimizing the LCP resource, splitting JavaScript,
              virtualizing large lists, moving expensive work off the main thread, and
              reserving image or ad dimensions. Measure again after release.
            </Text>
            <Text>
              Do not start with <Text as="span" weight="semibold">useMemo</Text> when a
              page is slow. The bottleneck may be network, bundle size, image loading,
              layout, an API dependency, or a long JavaScript task rather than React
              rerenders.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Azure Monitor and Application Insights" defaultOpen>
          <Stack gap={8}>
            <Text>
              Azure Portal is the interface; Azure Monitor and Application Insights are
              the observability services behind dashboards, logs, metrics, alerts, and
              diagnostics. Application Insights can capture page views, requests,
              dependencies, exceptions, traces, and custom events. Current Microsoft
              guidance centers on OpenTelemetry for application telemetry.
            </Text>
            <Text>
              During an incident, start with user impact: availability, error rate,
              latency, failed dependencies, and the affected release or region. Use
              correlations across frontend errors, backend requests, and dependencies to
              narrow the failure domain. Set alerts for actionable symptoms, not every
              noisy metric.
            </Text>
            <Text>
              Availability tests check whether a public endpoint responds from multiple
              locations, but they do not replace real-user monitoring. A mature setup
              combines synthetic checks, RUM, logs, traces, alert routing, dashboards, and
              a runbook for escalation or rollback.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Akamai and CDN configuration" defaultOpen>
          <Stack gap={8}>
            <Text>
              A CDN serves cacheable content near users, lowering latency and protecting
              the origin from traffic spikes. Key concepts are cache key, TTL,
              <Text as="span" weight="semibold"> Cache-Control</Text>, cache hit ratio,
              origin offload, and purge or invalidation. A cache key must include every
              input that changes the response.
            </Text>
            <Text>
              Cache public static assets with hashed filenames and long immutable
              lifetimes. Do not accidentally share personalized or authenticated content:
              use private or no-store behavior, bypass cache, or vary safely by required
              identity inputs. Ignoring a query parameter is safe only when it cannot
              change returned content.
            </Text>
            <Text>
              Use purge for fast freshness after a change, but do not use it as a
              replacement for sensible TTL policy. In an event-driven platform, rehearse
              invalidation, cache warming, rollback, and origin-protection behavior
              before peak demand.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="High-traffic, event-driven platform design" defaultOpen>
          <Stack gap={8}>
            <Text>
              Start with traffic shape: expected concurrency, spike profile, live-update
              frequency, cacheability, connection limits, and failure budget. Treat live
              data as potentially late, duplicated, reordered, or unavailable. Design
              clear freshness indicators and degraded behavior rather than hiding stale
              or failed updates.
            </Text>
            <Text>
              Protect the system in layers: CDN for cacheable content, load-tested APIs,
              rate limits where appropriate, pagination or virtualization, backpressure,
              and efficient reconnection logic. For WebSocket or SSE delivery, define
              heartbeat, reconnect backoff, resync after reconnect, and subscription
              cleanup. Do not rerender a whole dashboard for one incoming event.
            </Text>
            <Text>
              Before a major event, set dashboards, alerts, ownership, incident
              communication, launch criteria, and rollback procedures. During the event,
              make changes conservatively and measure user outcomes before expanding a
              rollout.
            </Text>
          </Stack>
        </CollapsibleSection>

        <Row gap={14} wrap>
          <Link href="https://learn.microsoft.com/en-us/azure/devops/pipelines/process/create-multistage-pipeline">
            Azure Pipelines
          </Link>
          <Link href="https://www.jenkins.io/doc/book/pipeline/syntax/">
            Jenkins Pipeline syntax
          </Link>
          <Link href="https://web.dev/articles/vitals">Core Web Vitals</Link>
          <Link href="https://learn.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview">
            Application Insights
          </Link>
          <Link href="https://techdocs.akamai.com/property-mgr/docs/know-caching">
            Akamai caching
          </Link>
        </Row>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>Collaboration and technical leadership</H2>

        <CollapsibleSection title="GitHub, Git, and Azure DevOps Services" defaultOpen>
          <Stack gap={8}>
            <Text>
              Use Git history and pull requests to make changes reviewable, traceable,
              and reversible. Keep branches short-lived where practical, make PRs small
              enough to understand, and use branch protection for required checks and
              approvals. Resolve conflicts by understanding intent, not by mechanically
              choosing one side.
            </Text>
            <Text>
              GitHub and Azure Repos support repository collaboration; Azure DevOps adds
              Boards, Pipelines, Artifacts, and service integrations around that flow.
              “Alignment PRs across branches” usually means controlled forward or back
              merges, conflict resolution, regression testing, and clear release-branch
              ownership. Avoid branching strategies that create permanent divergence.
            </Text>
            <Text>
              A senior engineer makes repository rules visible and automated: required
              checks, ownership where useful, templates, conventional release practices,
              and clear merge responsibility. Process should lower risk without making
              routine delivery painfully slow.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Jira, Confluence, and Agile execution" defaultOpen>
          <Stack gap={8}>
            <Text>
              Jira should make delivery state clear: problem, acceptance criteria,
              dependencies, risks, scope, and owner. Split work vertically when possible
              so a user-visible slice can be tested and delivered. Escalate ambiguity
              early instead of treating missing requirements as an implementation detail.
            </Text>
            <Text>
              Confluence is useful for durable decisions: architecture notes, RFCs,
              runbooks, onboarding, and incident learnings. Write decisions with context,
              alternatives considered, trade-offs, and owner; otherwise documentation
              becomes stale prose. Link documents to work items and code when possible.
            </Text>
            <Text>
              Agile is not a reason to avoid planning. It is a feedback loop: clarify
              goal, deliver a small increment, observe result, and revise based on
              evidence.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Code reviews and mentoring" defaultOpen>
          <Stack gap={8}>
            <Text>
              Automated checks should enforce formatting and basic static rules. Human
              review should focus on correctness, security, accessibility, performance,
              tests, maintainability, and user impact. Explain the reason behind a
              comment and distinguish blocking issues from optional suggestions.
            </Text>
            <Text>
              Strong mentoring combines direct feedback, pairing on difficult work,
              examples of good decisions, and gradual ownership transfer. The objective is
              not to be the bottleneck or sole expert; it is to raise the team's ability
              to make sound decisions independently. Repeated review comments should
              become a guideline, test, lint rule, or reusable component.
            </Text>
            <Text>
              In conflict, ask what outcome and evidence each person is optimizing for.
              Prefer a small experiment, benchmark, prototype, or explicit decision
              record over authority-based arguments. Keep feedback direct, kind, and
              specific to behavior or code.
            </Text>
          </Stack>
        </CollapsibleSection>

        <Row gap={14} wrap>
          <Link href="https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/code-reviewing-pull-requests/about-pull-request-reviews">
            GitHub PR reviews
          </Link>
          <Link href="https://learn.microsoft.com/en-us/azure/devops/repos/git/branch-policies">
            Azure branch policies
          </Link>
        </Row>
      </Stack>

      <Divider />

      <Stack gap={12}>
        <H2>Nice to have — know the shape, not every API</H2>

        <CollapsibleSection title="C# and Razor" defaultOpen>
          <Stack gap={8}>
            <Text>
              C# is the primary .NET language and Razor is server-side templating syntax
              that combines C# with HTML. Razor pages or MVC views can render initial HTML
              on the server, then hand off interactive behavior to JavaScript. Know the
              distinction between server-rendered UI and a SPA, and how they can coexist.
            </Text>
            <Text>
              Your C# background is useful for collaboration with backend engineers:
              typed API contracts, authentication flows, deployment, logging, and
              debugging across the boundary. Do not overstate recent Razor experience if
              your work has focused on React or Angular.
            </Text>
            <Text>
              For this role, explain that full-stack familiarity helps you diagnose
              end-to-end failures and make frontend decisions that fit backend
              constraints.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Stencil" defaultOpen>
          <Stack gap={8}>
            <Text>
              Stencil is a compiler for building standards-based Web Components. Its
              output can be consumed across framework boundaries through custom elements,
              which suits multi-framework design systems. It is most relevant when React,
              Angular, or server-rendered applications must share a component library.
            </Text>
            <Text>
              Compare it with a React-only component library: Web Components improve
              interoperability, while React components can offer a more idiomatic React
              developer experience. Discuss events, attributes versus properties,
              accessibility, versioning, and framework wrappers as practical concerns.
            </Text>
            <Text>
              You do not need to claim production Stencil experience. Knowing why a team
              might choose it is enough for a nice-to-have discussion.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Tailwind CSS" defaultOpen>
          <Stack gap={8}>
            <Text>
              Tailwind is utility-first CSS: compositions of small classes create a
              component's visual result. The useful engineering question is not whether
              utilities look verbose, but whether tokens, component conventions, and
              responsive variants create consistent UI at scale. It works best with clear
              design primitives and sensible component boundaries.
            </Text>
            <Text>
              It does not remove the need to understand CSS layout, specificity,
              accessibility, dark mode, or responsive design. Use a design-token strategy
              so colors, spacing, typography, and breakpoints are coherent rather than
              hard-coded across templates.
            </Text>
            <Text>
              Tailwind is a direct match for your CV. Prepare one concrete example of how
              you used it to improve speed, consistency, or reusable UI.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Vite and Rsbuild" defaultOpen>
          <Stack gap={8}>
            <Text>
              Vite and Rsbuild are modern frontend build tools focused on fast developer
              feedback and production bundles. Vite uses native ES modules during
              development and optimizes production builds; Rsbuild is built around the
              Rspack ecosystem. Both handle dev server behavior, module transformation,
              code splitting, assets, environment variables, and build output.
            </Text>
            <Text>
              Choose based on ecosystem fit, existing tooling, plugin needs, build speed,
              migration cost, and operational support—not benchmark numbers alone. The
              frontend concerns remain the same: minimal initial JavaScript, predictable
              output, source maps, cacheable assets, and repeatable builds.
            </Text>
            <Text>
              In an interview, connect bundler choice to developer experience and
              production performance rather than treating it as a framework preference.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Renovate and dependency automation" defaultOpen>
          <Stack gap={8}>
            <Text>
              Renovate automates dependency-update pull requests using repository
              configuration. Good policies group compatible updates, schedule noise away
              from critical windows, label changes, respect semantic version risk, and
              require CI before merge. It reduces the backlog of insecure or obsolete
              dependencies without granting blind auto-merge.
            </Text>
            <Text>
              Dependency automation needs ownership: review major upgrades, track breaking
              changes, maintain lockfiles, and know how to revert. The goal is a steady,
              low-risk update stream rather than a quarterly crisis.
            </Text>
            <Text>
              Mention Renovate alongside automated testing, security scanning, and release
              discipline. It is a delivery-quality tool, not an isolated bot.
            </Text>
          </Stack>
        </CollapsibleSection>

        <CollapsibleSection title="Analytics and A/B testing" defaultOpen>
          <Stack gap={8}>
            <Text>
              Data-driven development starts with a decision, a hypothesis, and a
              measurable outcome. Define a primary metric, guardrail metrics such as
              performance or errors, audience eligibility, and a decision rule before
              running an experiment. Do not start from a dashboard and search for a
              flattering number after the fact.
            </Text>
            <Text>
              A/B tests require reliable randomization, stable instrumentation, enough
              exposure, and protection against misleading early conclusions. Feature flags
              let teams release safely, target cohorts, and roll back, but a flag alone is
              not an experiment. Track both product behavior and technical health.
            </Text>
            <Text>
              For frontend work, useful metrics can include task completion, conversion,
              interaction latency, error rate, Core Web Vitals, and accessibility defects.
              Discuss privacy, consent, and data minimization when collecting user events.
            </Text>
          </Stack>
        </CollapsibleSection>

        <Row gap={14} wrap>
          <Link href="https://learn.microsoft.com/en-us/aspnet/core/mvc/views/razor">
            Razor docs
          </Link>
          <Link href="https://stenciljs.com/docs/introduction">Stencil docs</Link>
          <Link href="https://tailwindcss.com/docs">Tailwind docs</Link>
          <Link href="https://vite.dev/guide/">Vite docs</Link>
          <Link href="https://rsbuild.rs/guide/start/quick-start">Rsbuild docs</Link>
          <Link href="https://docs.renovatebot.com/">Renovate docs</Link>
        </Row>
      </Stack>

      <Divider />

      <Stack gap={6}>
        <H3>Research basis</H3>
        <Text tone="secondary" size="small">
          Sources reviewed August 4, 2026: React documentation, TypeScript Handbook,
          Microsoft Learn, Jenkins documentation, web.dev, Akamai TechDocs, and official
          tool documentation linked above.
        </Text>
      </Stack>
    </Stack>
  );
}
