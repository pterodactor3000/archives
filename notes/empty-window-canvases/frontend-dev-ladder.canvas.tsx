import {
  Callout,
  Card,
  CardBody,
  CardHeader,
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

type LevelId = "L1" | "L2" | "L3" | "L4";
type ViewMode = "level" | "category" | "compare";

const LEVELS: {
  id: LevelId;
  name: string;
  title: string;
  experience: string;
  promotion: string;
  gist: string;
}[] = [
  {
    id: "L1",
    name: "Intern",
    title: "L1 — Intern",
    experience: "0–2 yrs IT (may be none)",
    promotion: "Max 6 months → L2 or out-place. Typical promote: 3–6 months",
    gist: "Learn fast. Follow. Ship small tasks with guidance. Communicate clearly.",
  },
  {
    id: "L2",
    name: "Junior",
    title: "L2 — Junior",
    experience: "0–2 yrs IT",
    promotion: "1–2 years + Leader approval → L3",
    gist: "Own your day. Solve typical bugs alone. Peer-help interns. Solid fundamentals.",
  },
  {
    id: "L3",
    name: "Regular",
    title: "L3 — Regular",
    experience: "2–5 yrs IT",
    promotion: "4–5 years + Leader approval → L4",
    gist: "Own features/projects. Mentor juniors. Pick tools/strategies with tradeoffs in mind.",
  },
  {
    id: "L4",
    name: "Senior",
    title: "L4 — Senior",
    experience: "> 5 yrs IT",
    promotion: "After L4: choose Technology, People, or Architecture path",
    gist: "Set direction. Optimize systems/process. Lead mentoring. Deep tooling & tradeoff judgment.",
  },
];

type SkillRow = {
  category: string;
  group: "engineering" | "technical";
  shared?: string[];
  byLevel: Record<LevelId, string[]>;
};

const SKILLS: SkillRow[] = [
  {
    category: "Soft skills",
    group: "engineering",
    shared: [
      "Communicativeness — clear, understandable information",
      "High personal culture — punctuality, respect, atmosphere, appearance/setup",
      "Professionalism — ethics, sense of liability",
      "Willingness to grow — accept criticism, find improvement areas",
      "Building relationships — authenticity, transparency, active listening, trust",
    ],
    byLevel: { L1: [], L2: [], L3: [], L4: [] },
  },
  {
    category: "Management",
    group: "engineering",
    byLevel: {
      L1: ["Basic prioritization — identify important tasks, plan own day"],
      L2: ["Own work planning — plan and execute tasks efficiently"],
      L3: [
        "Project management — manage projects, coordinate team activities",
        "Task delegation — delegate effectively to teammates",
      ],
      L4: [
        "Strategic planning — long-term activities and team strategies",
        "Process optimization — analyze and improve how work gets done",
      ],
    },
  },
  {
    category: "Mentoring",
    group: "engineering",
    byLevel: {
      L1: [
        "Basic collaboration — work with seniors, explain own work clearly to peers",
      ],
      L2: ["Peer mentoring — support interns, collaborate across the team"],
      L3: [
        "Active mentoring — mentor juniors/interns on technical skill growth",
      ],
      L4: [
        "Advanced mentoring — lead mentoring programs for the whole team / careers",
      ],
    },
  },
  {
    category: "Problem solving",
    group: "engineering",
    byLevel: {
      L1: [
        "Basic reasoning — simple conclusions from collected info",
        "Information gathering — collect basic data needed to solve a problem",
        "Adaptability — learn from mistakes, change approach",
        "Cause-and-effect — understand simple causal relationships",
      ],
      L2: [
        "Critical thinking — evaluate info, make logical decisions",
        "Independence — solve typical problems in your field alone",
        "Problem decomposition — break problems into smaller parts",
      ],
      L3: [
        "Complex problem solving — analyze and fix hard technical issues",
        "Technical writing — functional docs before/after implementation",
        "Methodologies plus — flowcharts, SWOT, 5 Whys, diagrams (nice to have)",
      ],
      L4: [
        "Creative approach — propose new solutions to common problems",
        "Advanced data analysis — detailed analysis and conclusions",
      ],
    },
  },
  {
    category: "CSS",
    group: "technical",
    byLevel: {
      L1: [
        "Fundamentals: selectors (element/class/ID), positioning, box model",
        "Fonts: @font-face, Google Fonts, variable fonts",
      ],
      L2: [
        "CSS Modules (locally scoped styles)",
        "Units: px, em, rem, %, vw/vh, vmin/vmax, ch…",
        "RWD: @media breakpoints",
        "box-sizing: border-box",
        "Cascading, specificity, inheritance in practice",
        "Animations: @keyframes, animation, transition, transform",
        "CSS variables (custom properties)",
        "BEM / SMACSS / OOCSS",
        "Browser compatibility + vendor prefixes",
        "Preprocessor basics: Sass/SCSS or LESS",
        "Flexbox + CSS Grid fundamentals",
      ],
      L3: [
        "Fluent CSS tooling choice: inline vs CSS-in-JS vs stylesheets vs utility (Tailwind)",
      ],
      L4: [
        "Expected cumulative mastery of L1–L3 CSS (doc cell thin; seniority = depth + judgment)",
      ],
    },
  },
  {
    category: "Frameworks",
    group: "technical",
    byLevel: {
      L1: [
        "One of: React / Vue / Angular / Svelte — install, state, props",
        "DOM manipulation; reactivity / render cycles basics",
        "Common patterns: components, hooks",
      ],
      L2: [
        "Common libraries: Redux, MobX, Vuex, Zustand, Recoil, Pinia, Svelte store…",
        "Setup tooling: ESLint, Prettier, tsc",
        "Basic SSR vs SPA difference (e.g. Next vs React SPA)",
      ],
      L3: [
        "Design patterns: Composition, Compound Components, HOF, HOC",
        "Choose SSR / SPA / SSG by perf, SEO, UX",
        "Integrate tests: Jest, RTL, Cypress, Mocha",
        "Architecture: FSD, Atomic Design, MVC, MVVM",
        "Advanced concepts: memory opts, advanced hooks (useReducer/useRef…), code splitting (lazy/Suspense)",
      ],
      L4: [
        "Deep tradeoffs: SSR hydration issues, SPA SEO, SSG data fetching",
        "Advanced SSG / SSR / SPA understanding",
        "Pick optimal libs/strategies with clear reasoning (esp. state management)",
      ],
    },
  },
  {
    category: "HTML",
    group: "technical",
    byLevel: {
      L1: [
        "Semantic structure: header, nav, article, section, footer",
        "Basic HTML5: structural, input, form elements",
      ],
      L2: [
        "Solid semantics for readability, a11y landmarks, SEO",
        "Forms: accessibility + validation (types, required, pattern)",
      ],
      L3: [
        "SEO basics: meta description/robots, image alt",
        "WAI-ARIA: aria-label/labelledby/describedby, roles, keyboard nav",
        "Core Web Vitals awareness (LCP, FID, CLS) + RUM",
      ],
      L4: [
        "SEO proficiency: Open Graph, sitemaps (incl. dynamic), robots.txt",
      ],
    },
  },
  {
    category: "Infrastructure",
    group: "technical",
    byLevel: {
      L1: ["REST + HTTP/S: methods, status codes, headers"],
      L2: [
        "Dev mode vs production build",
        "Realtime: WebSockets / full-duplex client↔server",
        "Browser + IDE debugging (incl. Lighthouse)",
        "Basic proxy (e.g. CORS workarounds)",
      ],
      L3: [
        "DevOps basics: Docker, Kubernetes",
        "Cloud, static serving, CDNs",
        "Deploy & maintain SPA and SSR apps",
        "Same-Origin Policy & CORS handling",
        "Package security: npm audit",
        "Monitoring basics: Sentry, PostHog, Datadog",
      ],
      L4: [
        "Monorepos: workspaces, nx, turborepo, lerna",
        "Release strategies, env vars, distribution flow",
        "Perf: compression, HTTP/2/3, cache headers, CDN, stale-while-revalidate",
      ],
    },
  },
  {
    category: "JavaScript",
    group: "technical",
    byLevel: {
      L1: [
        "Objects & arrays — create and when to use",
        "Primitives: string, number, boolean, null, undefined",
        "Variables, loops, statements, conditionals",
        "Base events: addEventListener",
        "DOM: querySelector, innerHTML/textContent, classList",
      ],
      L2: [
        "Structures: multidimensional arrays, Classes, Date, Set, Map",
        "Closures (lexical scope, factories)",
        "Hoisting: var vs let/const, function hoisting",
        "Async: promises, callbacks, try/catch",
        "ES6: spread/rest, destructuring, templates, import/export",
        "Storage: memory vs session/local storage vs cookies vs IndexedDB",
        "Prototypes, currying, class-oriented patterns",
      ],
      L3: [
        "Map / Set / WeakMap",
        "Advanced events: bubbling & capturing",
        "Scopes of variables and functions",
        "Bundling / minify / tree-shake: Webpack, Rollup, Vite",
        "Shallow vs deep copy (+ techniques)",
        "Auth concepts: authn vs authz, token types, storage, session clear",
        "Security threats: clickjacking, XSS, CSRF, MITM, session hijacking",
        "PWA awareness: Service Workers, App Shell",
        "Memory leaks: timers, listeners, closures",
      ],
      L4: [
        "JS engine: call stack, event loop, micro/macro tasks",
        "Perf tooling: Chrome Performance + heap snapshots / leak hunting",
        "Advanced structures: trees, graphs, linked lists, queues",
        "Special types: Symbol, BigInt, Infinity",
        "Implement auth layers with known APIs (Facebook, Microsoft, Firebase, Okta…)",
      ],
    },
  },
  {
    category: "Testing",
    group: "technical",
    byLevel: {
      L1: [
        "Build simple tests with Jest / Mocha / Vitest",
        "Awareness of unit / integration / E2E",
      ],
      L2: [
        "Differences + pros/cons of unit, integration, E2E",
        "Simple E2E with Playwright or Cypress",
      ],
      L3: [
        "Error capture tools in the wild: Sentry, Datadog, PostHog",
      ],
      L4: [
        "Full testing process literacy: manual → A/B → smoke → automation; implement strategies",
      ],
    },
  },
  {
    category: "TypeScript",
    group: "technical",
    byLevel: {
      L1: [
        "Why TS: refactoring, IntelliSense, type checking",
        "Awareness of maintainability / scalability benefits",
        "Basic syntax awareness: types, interfaces, classes, enums, functions, generics, modules",
      ],
      L2: [
        "What .d.ts files are and when they help",
        "Declare basic types: string, number, boolean, object, array…",
        "typeof, type guards, object instances",
        "type vs interface",
        "Solid syntax: types, interfaces, classes, enums, functions, modules",
        "Edit tsconfig / compiler options",
      ],
      L3: [
        "Advanced tsconfig for build perf and target environments",
      ],
      L4: [
        "TS limitations + how structures transpile to JS (e.: enums → objects)",
        "Advanced features: unions, intersections, generics, conditional types",
      ],
    },
  },
];

const COMPARE_CATEGORIES = SKILLS.filter((s) => !s.shared).map((s) => s.category);

function LevelPills({
  active,
  onSelect,
}: {
  active: LevelId;
  onSelect: (id: LevelId) => void;
}) {
  return (
    <Row gap={8} wrap>
      {LEVELS.map((l) => (
        <span key={l.id}>
          <Pill active={active === l.id} onClick={() => onSelect(l.id)}>
            {l.title}
          </Pill>
        </span>
      ))}
    </Row>
  );
}

function BulletList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Stack gap={6}>
      {items.map((item) => (
        <span key={item}>
          <Text size="small">{`• ${item}`}</Text>
        </span>
      ))}
    </Stack>
  );
}

function LevelView({ levelId }: { levelId: LevelId }) {
  const level = LEVELS.find((l) => l.id === levelId)!;
  const eng = SKILLS.filter((s) => s.group === "engineering");
  const tech = SKILLS.filter((s) => s.group === "technical");

  return (
    <Stack gap={16}>
      <Grid columns={3} gap={12}>
        <Stat value={level.name} label="Level" />
        <Stat value={level.experience} label="IT experience" />
        <Stat value={levelId === "L4" ? "Path choice" : "Timed + approval"} label="Exit path" />
      </Grid>

      <Callout tone="info" title="In one line">
        {level.gist}
      </Callout>

      <Text size="small" tone="secondary">
        Promotion: {level.promotion}
      </Text>

      <H2>Engineering skills</H2>
      <Grid columns={2} gap={12}>
        {eng.map((skill) => (
          <span key={skill.category}>
            <Card>
              <CardHeader>{skill.category}</CardHeader>
              <CardBody>
                {skill.shared ? (
                  <BulletList items={skill.shared} />
                ) : (
                  <BulletList items={skill.byLevel[levelId]} />
                )}
              </CardBody>
            </Card>
          </span>
        ))}
      </Grid>

      <H2>Technical skills</H2>
      <Stack gap={10}>
        {tech.map((skill) => (
          <span key={skill.category}>
            <Card collapsible defaultOpen>
              <CardHeader>{skill.category}</CardHeader>
              <CardBody>
                <BulletList items={skill.byLevel[levelId]} />
              </CardBody>
            </Card>
          </span>
        ))}
      </Stack>
    </Stack>
  );
}

function CategoryView({ category }: { category: string }) {
  const skill = SKILLS.find((s) => s.category === category)!;

  return (
    <Stack gap={16}>
      <H2>{skill.category}</H2>
      {skill.shared ? (
        <Card>
          <CardHeader trailing={<Pill size="sm">All levels</Pill>}>
            Shared bar
          </CardHeader>
          <CardBody>
            <BulletList items={skill.shared} />
          </CardBody>
        </Card>
      ) : (
        <Grid columns={2} gap={12}>
          {LEVELS.map((l) => (
            <span key={l.id}>
              <Card>
                <CardHeader>{l.title}</CardHeader>
                <CardBody>
                  <BulletList items={skill.byLevel[l.id]} />
                </CardBody>
              </Card>
            </span>
          ))}
        </Grid>
      )}
    </Stack>
  );
}

function CompareView({ category }: { category: string }) {
  const skill = SKILLS.find((s) => s.category === category)!;
  const rows = LEVELS.map((l) => [
    l.title,
    skill.byLevel[l.id].join(" · ") || "—",
  ]);

  return (
    <Stack gap={12}>
      <H2>{skill.category} — side by side</H2>
      <Table
        headers={["Level", "Expectations at this level"]}
        rows={rows}
        striped
        columnAlign={["left", "left"]}
      />
    </Stack>
  );
}

export default function FrontendDevLadder() {
  const [mode, setMode] = useCanvasState<ViewMode>("mode", "level");
  const [level, setLevel] = useCanvasState<LevelId>("level", "L2");
  const [category, setCategory] = useCanvasState<string>(
    "category",
    "Frameworks"
  );

  return (
    <Stack gap={20} style={{ padding: 20, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Frontend Developer ladder</H1>
        <Text tone="secondary">
          Jit Team Engineering Path — Frontend specialization. PDF grid was
          unreadable; this is a rebuilt browseable view. Higher levels usually
          imply everything below them.
        </Text>
      </Stack>

      <Callout tone="warning" title="Reconstruction note">
        Source PDF text extract scrambled column order. Soft skills,
        mentoring, and experience bands are solid. Some technical cells
        (esp. JS / Infra / CSS L4) were inferred from progression + reading
        order — treat those as guidance, not verbatim HR wording.
      </Callout>

      <Row gap={8} wrap>
        <Pill active={mode === "level"} onClick={() => setMode("level")}>
          By level
        </Pill>
        <Pill active={mode === "category"} onClick={() => setMode("category")}>
          By skill
        </Pill>
        <Pill active={mode === "compare"} onClick={() => setMode("compare")}>
          Compare levels
        </Pill>
      </Row>

      <Divider />

      {mode === "level" && (
        <Stack gap={14}>
          <LevelPills active={level} onSelect={setLevel} />
          <LevelView levelId={level} />
        </Stack>
      )}

      {mode === "category" && (
        <Stack gap={14}>
          <Row gap={8} wrap>
            {SKILLS.map((s) => (
              <span key={s.category}>
                <Pill
                  active={category === s.category}
                  onClick={() => setCategory(s.category)}
                >
                  {s.category}
                </Pill>
              </span>
            ))}
          </Row>
          <CategoryView category={category} />
        </Stack>
      )}

      {mode === "compare" && (
        <Stack gap={14}>
          <Row gap={8} wrap>
            {COMPARE_CATEGORIES.map((c) => (
              <span key={c}>
                <Pill active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </Pill>
              </span>
            ))}
          </Row>
          <CompareView
            category={
              COMPARE_CATEGORIES.includes(category)
                ? category
                : COMPARE_CATEGORIES[0]
            }
          />
        </Stack>
      )}

      <Divider />

      <Stack gap={8}>
        <H3>How to use this doc</H3>
        <Text size="small">
          1. Pick the level you are hiring/assessing for (or targeting yourself).
        </Text>
        <Text size="small">
          2. Soft skills apply at every level — they are the interview bar,
          not a seniority differentiator.
        </Text>
        <Text size="small">
          3. Engineering skills (mgmt / mentoring / problem solving) show how
          autonomy and leadership grow.
        </Text>
        <Text size="small">
          4. Technical sections are the FE checklist: CSS, frameworks, HTML,
          infra, JS, testing, TS.
        </Text>
        <Text size="small">
          5. After Senior: fork into Technology, People, or Architecture —
          this PDF stops at L4.
        </Text>
      </Stack>
    </Stack>
  );
}
