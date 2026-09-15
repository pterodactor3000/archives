import {
  Card,
  CardBody,
  CardHeader,
  Code,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Pill,
  Row,
  Stack,
  Text,
  computeDAGLayout,
  useHostTheme,
} from "cursor/canvas";

export default function DataStructuresVisual() {
  return (
    <Stack gap={28} style={{ padding: 20, maxWidth: 960 }}>
      <Stack gap={6}>
        <H1>Advanced structures</H1>
        <Text tone="secondary">
          Trees, graphs, linked lists, queues — shapes, traversal, and when they
          show up in React / Next work.
        </Text>
      </Stack>

      <TreeSection />
      <Divider />
      <GraphSection />
      <Divider />
      <LinkedListSection />
      <Divider />
      <QueueSection />
    </Stack>
  );
}

function TreeSection() {
  return (
    <Stack gap={14}>
      <Row gap={8} align="center">
        <H2>Trees</H2>
        <Pill tone="neutral">Hierarchy</Pill>
      </Row>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <Text>
            Hierarchical nodes (DOM, React fiber conceptually, file systems, UI
            menus). DFS/BFS traversal; balanced trees for ordered maps.
          </Text>
          <Text>
            DFS walks deep before siblings (recursion or an explicit stack); BFS
            walks level by level with a queue — useful for “nearest parent” and
            breadth-limited UI expands.
          </Text>
          <Text tone="secondary">
            When: nested comments, org charts, virtualized file browsers. Prefer
            adjacency lists from APIs over deep recursive props without memo
            boundaries. Flat `id → children[]` maps keep React reconciliation
            cheap and make virtualization straightforward.
          </Text>
          <Stack gap={4}>
            <H3>Complexity cheat</H3>
            <Text tone="secondary">
              Visit all nodes: O(n). Search in unbalanced tree: O(n) worst.
              Balanced BST / ordered map: O(log n) lookup.
            </Text>
          </Stack>
        </Stack>
        <Card>
          <CardHeader>Tree · DFS vs BFS</CardHeader>
          <CardBody>
            <TreeDiagram />
            <Stack gap={4} style={{ marginTop: 10 }}>
              <Text size="small" tone="secondary">
                DFS order: root → A → A1 → A2 → B → B1
              </Text>
              <Text size="small" tone="secondary">
                BFS order: root → A → B → A1 → A2 → B1
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function GraphSection() {
  return (
    <Stack gap={14}>
      <Row gap={8} align="center">
        <H2>Graphs</H2>
        <Pill tone="neutral">Nodes + edges</Pill>
      </Row>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <Text>
            Nodes + edges (directed/undirected). Used for dependency graphs,
            social links, routing, monorepo project graphs.
          </Text>
          <Text>
            A tree is a special acyclic connected graph with one parent per
            child; general graphs allow multiple parents, shared deps, and
            cycles.
          </Text>
          <Text tone="secondary">
            When: permissions inheritance, recommendation edges, build
            pipelines. Watch cycles; memoize expensive traversals. Detect cycles
            with DFS color states or Kahn’s algorithm before topo-sort (Turborepo
            / Nx style task graphs).
          </Text>
          <Stack gap={4}>
            <H3>Edge kinds</H3>
            <Text tone="secondary">
              Directed: A→B (depends-on). Undirected: A—B (friendship). Weighted:
              cost/latency on the edge for routing.
            </Text>
          </Stack>
        </Stack>
        <Card>
          <CardHeader>Graph · build deps (+ cycle)</CardHeader>
          <CardBody>
            <GraphDiagram />
            <Text size="small" tone="secondary" style={{ marginTop: 10 }}>
              Solid = forward deps. Dashed = back-edge (cycle) — topo-sort fails
              until broken.
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function LinkedListSection() {
  return (
    <Stack gap={14}>
      <Row gap={8} align="center">
        <H2>Linked lists</H2>
        <Pill tone="neutral">Pointer chain</Pill>
      </Row>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <Text>
            Nodes with next (and prev) pointers. O(1) insert/delete given a
            reference; O(n) random access.
          </Text>
          <Text>
            Doubly linked lists add <Code>prev</Code> so LRU caches can splice a
            node to the front without scanning; singly linked lists are enough
            for many interview reverse/merge puzzles.
          </Text>
          <Text tone="secondary">
            Rare in app UI vs arrays. Appears in interview algorithms, LRU cache
            internals, some streaming buffers. Prefer arrays in React state —
            contiguous memory and index access beat pointer chasing for typical
            UI lists.
          </Text>
        </Stack>
        <Card>
          <CardHeader>Linked list · splice in O(1)</CardHeader>
          <CardBody>
            <LinkedListDiagram />
            <Text size="small" tone="secondary" style={{ marginTop: 10 }}>
              Given a ref to node B, insert X between B and C by rewiring two
              pointers — no shift of later elements like an array would need.
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function QueueSection() {
  return (
    <Stack gap={14}>
      <Row gap={8} align="center">
        <H2>Queues</H2>
        <Pill tone="neutral">FIFO</Pill>
      </Row>

      <Grid columns={2} gap={16}>
        <Stack gap={10}>
          <Text>
            FIFO structure. Underpins task queues, job processors, BFS,
            rate-limit windows.
          </Text>
          <Text>
            Enqueue at the back, dequeue from the front — fair ordering so the
            oldest waiting item runs next (unlike a stack’s LIFO).
          </Text>
          <Text tone="secondary">
            Frontend: toast queues, upload queues, optimistic mutation queues.
            Backend: SQS/Rabbit/Bull for Next background work. Same shape as the
            browser task queue idea: work waits in line, one consumer drains it.
          </Text>
        </Stack>
        <Card>
          <CardHeader>Queue · enqueue / dequeue</CardHeader>
          <CardBody>
            <QueueDiagram />
            <Text size="small" tone="secondary" style={{ marginTop: 10 }}>
              Front leaves first (dequeue). New jobs join the back (enqueue).
              BFS uses this to expand neighbors level by level.
            </Text>
          </CardBody>
        </Card>
      </Grid>
    </Stack>
  );
}

function TreeDiagram() {
  const theme = useHostTheme();
  const stroke = theme.stroke.secondary;
  const fill = theme.fill.tertiary;
  const accent = theme.accent.primary;
  const text = theme.text.primary;

  const nodes: Array<{ id: string; x: number; y: number; accent?: boolean }> = [
    { id: "root", x: 160, y: 28, accent: true },
    { id: "A", x: 80, y: 100 },
    { id: "B", x: 240, y: 100 },
    { id: "A1", x: 30, y: 172 },
    { id: "A2", x: 100, y: 172 },
    { id: "B1", x: 240, y: 172 },
  ];
  const edges: Array<[string, string]> = [
    ["root", "A"],
    ["root", "B"],
    ["A", "A1"],
    ["A", "A2"],
    ["B", "B1"],
  ];
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <svg viewBox="0 0 320 210" width="100%" style={{ display: "block" }}>
      {edges.map(([from, to]) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y + 14}
            x2={b.x}
            y2={b.y - 14}
            stroke={stroke}
            strokeWidth={1.5}
          />
        );
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x - 28}
            y={n.y - 14}
            width={56}
            height={28}
            rx={6}
            fill={n.accent ? accent : fill}
            stroke={stroke}
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontSize={12}
            fill={n.accent ? theme.text.onAccent : text}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

function GraphDiagram() {
  const theme = useHostTheme();
  const layout = computeDAGLayout({
    nodes: [{ id: "app" }, { id: "ui" }, { id: "api" }, { id: "db" }],
    edges: [
      { from: "app", to: "ui" },
      { from: "app", to: "api" },
      { from: "ui", to: "api" },
      { from: "api", to: "db" },
      { from: "db", to: "api" },
    ],
    direction: "vertical",
    nodeWidth: 72,
    nodeHeight: 32,
    rankGap: 48,
    nodeGap: 36,
    padding: 12,
  });

  const stroke = theme.stroke.secondary;
  const fill = theme.fill.tertiary;
  const accent = theme.accent.primary;
  const text = theme.text.primary;
  const warn = theme.text.secondary;

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      width="100%"
      style={{ display: "block" }}
    >
      {layout.edges.map((e, i) => (
        <line
          key={i}
          x1={e.sourceX}
          y1={e.sourceY}
          x2={e.targetX}
          y2={e.targetY}
          stroke={e.isBackEdge ? accent : stroke}
          strokeWidth={1.5}
          strokeDasharray={e.isBackEdge ? "4 3" : undefined}
        />
      ))}
      {layout.nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x}
            y={n.y}
            width={72}
            height={32}
            rx={6}
            fill={n.id === "app" ? accent : fill}
            stroke={stroke}
          />
          <text
            x={n.x + 36}
            y={n.y + 21}
            textAnchor="middle"
            fontSize={12}
            fill={n.id === "app" ? theme.text.onAccent : text}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {n.id}
          </text>
        </g>
      ))}
      <text
        x={12}
        y={layout.height - 4}
        fontSize={10}
        fill={warn}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        cycle: db → api
      </text>
    </svg>
  );
}

function LinkedListDiagram() {
  const theme = useHostTheme();
  const stroke = theme.stroke.secondary;
  const fill = theme.fill.tertiary;
  const accent = theme.accent.primary;
  const text = theme.text.primary;

  const nodes = [
    { id: "A", x: 36 },
    { id: "B", x: 116 },
    { id: "X", x: 196, insert: true },
    { id: "C", x: 276 },
  ];

  return (
    <svg viewBox="0 0 340 100" width="100%" style={{ display: "block" }}>
      {nodes.slice(0, -1).map((n, i) => {
        const next = nodes[i + 1];
        return (
          <line
            key={`e-${n.id}`}
            x1={n.x + 24}
            y1={40}
            x2={next.x - 24}
            y2={40}
            stroke={n.id === "B" || n.id === "X" ? accent : stroke}
            strokeWidth={1.5}
            markerEnd="url(#arrow)"
          />
        );
      })}
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={6}
          markerHeight={6}
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={stroke} />
        </marker>
      </defs>
      {nodes.map((n) => (
        <g key={n.id}>
          <rect
            x={n.x - 24}
            y={24}
            width={48}
            height={32}
            rx={6}
            fill={n.insert ? accent : fill}
            stroke={stroke}
            strokeDasharray={n.insert ? "4 2" : undefined}
          />
          <text
            x={n.x}
            y={44}
            textAnchor="middle"
            fontSize={12}
            fill={n.insert ? theme.text.onAccent : text}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {n.id}
          </text>
        </g>
      ))}
      <text
        x={196}
        y={78}
        textAnchor="middle"
        fontSize={10}
        fill={theme.text.secondary}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        insert X after B
      </text>
    </svg>
  );
}

function QueueDiagram() {
  const theme = useHostTheme();
  const stroke = theme.stroke.secondary;
  const fill = theme.fill.tertiary;
  const accent = theme.accent.primary;
  const text = theme.text.primary;

  const items = [
    { id: "1", label: "job1", x: 70 },
    { id: "2", label: "job2", x: 150 },
    { id: "3", label: "job3", x: 230 },
  ];

  return (
    <svg viewBox="0 0 340 110" width="100%" style={{ display: "block" }}>
      <text
        x={40}
        y={18}
        fontSize={11}
        fill={theme.text.secondary}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        dequeue ← front
      </text>
      <text
        x={300}
        y={18}
        textAnchor="end"
        fontSize={11}
        fill={theme.text.secondary}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        back → enqueue
      </text>

      <rect
        x={40}
        y={32}
        width={260}
        height={48}
        rx={8}
        fill="transparent"
        stroke={stroke}
        strokeDasharray="3 3"
      />

      {items.map((item, i) => (
        <g key={item.id}>
          <rect
            x={item.x - 28}
            y={40}
            width={56}
            height={32}
            rx={6}
            fill={i === 0 ? accent : fill}
            stroke={stroke}
          />
          <text
            x={item.x}
            y={60}
            textAnchor="middle"
            fontSize={12}
            fill={i === 0 ? theme.text.onAccent : text}
            fontFamily="ui-sans-serif, system-ui, sans-serif"
          >
            {item.label}
          </text>
        </g>
      ))}

      <text
        x={70}
        y={100}
        textAnchor="middle"
        fontSize={10}
        fill={theme.text.secondary}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        next out
      </text>
      <text
        x={280}
        y={100}
        textAnchor="middle"
        fontSize={10}
        fill={theme.text.secondary}
        fontFamily="ui-sans-serif, system-ui, sans-serif"
      >
        newest in
      </text>
    </svg>
  );
}
