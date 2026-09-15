export type TopicGroup =
  | "source"
  | "app"
  | "runtime"
  | "data"
  | "jobs"
  | "ops";

export type CodeSample = {
  filename: string;
  source: string;
};

export type Topic = {
  slug: string;
  name: string;
  group: TopicGroup;
  oneLiner: string;
  what: string[];
  howIntro: string;
  howSteps: string[];
  code?: CodeSample;
  watch: string[];
  pairsWith: string[];
  docsHref: string;
};

export const groupLabels: Record<TopicGroup, string> = {
  source: "Catalog and CMS",
  app: "App and HTTP",
  runtime: "Runtime",
  data: "Data stores",
  jobs: "Background work",
  ops: "Local and repo",
};

export const groupOrder: TopicGroup[] = [
  "source",
  "app",
  "runtime",
  "data",
  "jobs",
  "ops",
];

export const topics: Topic[] = [
  {
    slug: "wordpress",
    name: "WordPress and WooCommerce",
    group: "source",
    oneLiner:
      "The PHP shop staff already know. Products, orders, and merchandising live here. The public site does not have to.",
    what: [
      "WordPress is a PHP content manager. WooCommerce is the shop plugin on top of it: products, cart, checkout, and orders.",
      "In a headless setup, wp-admin stays the back office. Next.js is the public catalog. Woo REST and webhooks push changes into your Node apps.",
      "You still talk to Woo when you need the real order, payment, or stock number. Everything else you copy out so the storefront does not wait on PHP.",
    ],
    howIntro:
      "Create REST keys in WooCommerce, subscribe to product and order webhooks, and point them at Hono.",
    howSteps: [
      "In wp-admin, open WooCommerce, Settings, Advanced, REST API, and create a key with read or read/write as needed.",
      "Store the key and secret in env on the API, never in a client bundle.",
      "Add webhooks for product.updated, product.deleted, and order.updated. The delivery URL is a Hono route.",
      "On each delivery, validate the payload with Zod, then enqueue a BullMQ job. Do not index Typesense or rewrite Postgres inside the webhook handler.",
      "Pull full product JSON with GET /wp-json/wc/v3/products/{id} from the worker, because webhook bodies are often incomplete.",
    ],
    code: {
      filename: "worker/fetch-product.ts",
      source: `const auth = Buffer.from(
  \`\${process.env.WC_KEY}:\${process.env.WC_SECRET}\`
).toString("base64");

const res = await fetch(
  \`\${process.env.WC_URL}/wp-json/wc/v3/products/\${id}\`,
  { headers: { Authorization: \`Basic \${auth}\` } }
);

if (!res.ok) {
  throw new Error(\`Woo product \${id} failed: \${res.status}\`);
}

return ProductSchema.parse(await res.json());`,
    },
    watch: [
      "The REST API is paginated and rate-limited. Never walk every product on a storefront request. Sync in a worker.",
      "Woo MySQL is a separate database from Postgres. Once you copy products, you own the sync.",
      "Keeping checkout on Woo is the smaller project. Moving cart and payment into Next.js is a full commerce rewrite.",
      "Webhook signatures and Basic auth both belong on the Hono route. Unsigned product updates will get you junk in Typesense.",
    ],
    pairsWith: ["hono", "bullmq", "nextjs", "typesense"],
    docsHref: "https://woocommerce.github.io/woocommerce-rest-api-docs/",
  },
  {
    slug: "nextjs",
    name: "Next.js",
    group: "app",
    oneLiner:
      "The React framework for the public site. App Router for routes, Server Components for data, ISR for product pages that stay fast.",
    what: [
      "Next.js owns routing, rendering, and data fetching for the storefront. Files under app/ are routes. src/app/products/[slug]/page.tsx is /products/shoes.",
      "Server Components are the default. They run on the server, can await Postgres or Typesense, and their source does not ship to the browser. Add \"use client\" only for state, effects, or browser APIs.",
      "A Client Component still renders to HTML on the server on a full page load. \"Client\" means the code also hydrates in the browser, not that it skips the server.",
      "Incremental Static Regeneration (ISR) prerenders a page, then refreshes it later without a full rebuild. After the revalidate window, the next visitor still gets the old HTML while Next.js rebuilds in the background. The visitor after that gets the new page.",
    ],
    howIntro:
      "Keep pages as Server Components. Cache catalog routes. Revalidate when WooCommerce changes a product.",
    howSteps: [
      "Put data fetching in the page or in an async function the page awaits. Do not fetch the catalog in useEffect.",
      "For a product page, export const revalidate = 3600, or tag the fetch and call revalidateTag from a Server Action after a sync job.",
      "From Next.js 15 onward, fetch is not cached by default. Pass next: { revalidate: 3600, tags: [\"product-41\"] } when you want ISR.",
      "params and searchParams are Promises in current App Router. Await them before use.",
      "Next.js 16 also has Cache Components. If you set cacheComponents: true in next.config.ts, you cache with the \"use cache\" directive instead of only route-level revalidate.",
    ],
    code: {
      filename: "app/products/[slug]/page.tsx",
      source: `export const revalidate = 3600;

export async function generateStaticParams() {
  const products = await db.listProductSlugs();
  return products.map((slug) => ({ slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetch(
    \`\${process.env.API_URL}/products/\${slug}\`,
    { next: { revalidate: 3600, tags: [\`product-\${slug}\`] } }
  ).then((res) => res.json());

  return <h1>{product.name}</h1>;
}`,
    },
    watch: [
      "ISR needs the Node.js runtime. A static export cannot regenerate pages.",
      "revalidatePath and revalidateTag mark the cache stale. Regeneration runs on the next request, not immediately.",
      "If any fetch on the route uses cache: \"no-store\" or revalidate: 0, the route becomes dynamic.",
      "Each Next.js instance has its own file-system cache by default. Several Docker replicas need a shared cache handler or only one replica drops the stale page.",
      "Client Components cannot import server-only modules (fs, postgres, secret env). Pass serializable props down across the boundary.",
    ],
    pairsWith: ["nodejs", "hono", "typesense", "wordpress"],
    docsHref: "https://nextjs.org/docs/app",
  },
  {
    slug: "hono",
    name: "Hono",
    group: "app",
    oneLiner:
      "A small typed HTTP framework. Use it for APIs, webhooks, and worker-facing routes that should not live inside Next.js.",
    what: [
      "Hono is an HTTP router with middleware. It runs on Node.js, Bun, and Cloudflare Workers with the same app.fetch handler.",
      "Next.js Route Handlers can serve JSON, but a long-running API, webhook endpoint, or internal admin API is easier as its own Hono process. Next stays the HTML app. Hono stays the HTTP API.",
      "It has a Zod validator helper, so request bodies fail in one place before a job is enqueued.",
    ],
    howIntro:
      "Create an app, add routes, validate with Zod, and serve it on Node with @hono/node-server.",
    howSteps: [
      "Install hono and @hono/node-server in apps/api.",
      "Put webhook routes here, not in a Next.js Route Handler, if the work may retry, queue, or outlive a serverless timeout.",
      "Use c.req.valid(\"json\") after zValidator so the handler sees a typed body.",
      "Export app.fetch so tests and the Node server share one app.",
    ],
    code: {
      filename: "apps/api/src/index.ts",
      source: `import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

const WooHook = z.object({
  id: z.number(),
  status: z.string(),
});

app.post(
  "/webhooks/woocommerce",
  zValidator("json", WooHook),
  async (c) => {
    const body = c.req.valid("json");
    await indexQueue.add("product", { id: body.id });
    return c.json({ ok: true });
  }
);

serve({ fetch: app.fetch, port: 8787 });`,
    },
    watch: [
      "Middleware order is the request pipeline. Auth and signature checks go before the handler.",
      "Hono is not a queue and not a database. Enqueue work, then return 200 to Woo so it does not retry while you still index.",
      "On Node, remember to listen with serve(). Exporting the app is not enough.",
    ],
    pairsWith: ["zod", "bullmq", "nodejs", "wordpress"],
    docsHref: "https://hono.dev/docs/",
  },
  {
    slug: "zod",
    name: "Zod",
    group: "app",
    oneLiner:
      "One schema gives you a TypeScript type and a runtime check. Use it at every untrusted boundary.",
    what: [
      "Zod is a TypeScript-first schema library. You describe the shape of an object. z.infer<typeof Schema> is the type. schema.parse(data) is the check.",
      "HTTP bodies, webhook JSON, env vars, and Redis payloads are all untyped at the edge. Postgres and Typesense will not save you if you write a string into price_cents.",
      "Put shared schemas in packages/shared so Hono, the worker, and Next.js agree on the same product shape.",
    ],
    howIntro:
      "Define schemas next to the data they guard. Prefer safeParse at HTTP edges so you can return 400 instead of throwing.",
    howSteps: [
      "Write the schema once. Export the type with z.infer.",
      "Parse process.env at process boot. If DATABASE_URL is missing, crash then, not on the first request.",
      "Parse WooCommerce JSON in the worker even if Hono already parsed the webhook. The REST product body is a different shape.",
      "Use z.coerce.number() for query strings. They arrive as text.",
    ],
    code: {
      filename: "packages/shared/src/product.ts",
      source: `import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().int(),
  sku: z.string().min(1),
  name: z.string().min(1),
  price: z.string().regex(/^\\d+\\.\\d{2}$/),
  status: z.enum(["draft", "publish", "private"]),
});

export type Product = z.infer<typeof ProductSchema>;

export const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().min(1),
  TYPESENSE_API_KEY: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);`,
    },
    watch: [
      "parse throws. safeParse returns { success, data, error }. Use safeParse where the caller is a client.",
      "Zod is not a database constraint. A skipped parse still writes bad rows.",
      "Major versions differ. Pin zod in the workspace and read that version's docs.",
    ],
    pairsWith: ["hono", "nextjs", "pnpm"],
    docsHref: "https://zod.dev/",
  },
  {
    slug: "nodejs",
    name: "Node.js",
    group: "runtime",
    oneLiner:
      "The JavaScript runtime that runs Next.js, Hono, and BullMQ workers. It is not a framework.",
    what: [
      "Node.js executes JavaScript outside the browser. Next.js, Hono, and BullMQ all run on it in this stack.",
      "One thread runs your JavaScript. I/O is async. A tight CPU loop (huge JSON parse, image work) stalls every request on that process.",
      "Workers, the API, and next start are separate processes. They share code through the pnpm workspace, not by importing each other's servers.",
    ],
    howIntro:
      "Pin an LTS version and use the same version in Docker, CI, and on your machine.",
    howSteps: [
      "Install the current LTS (22 in most 2026 setups) with nvm or the official image node:22-alpine.",
      "Put the version in .nvmrc and in the Compose image tag so they cannot drift.",
      "Run Next with pnpm --filter web dev. Run Hono and the worker as their own commands.",
      "Parse env with Zod at boot in each process.",
    ],
    code: {
      filename: "apps/worker/src/main.ts",
      source: `import { env } from "@shop/shared/env";
import { startIndexWorker } from "./index-worker";

async function main() {
  const worker = startIndexWorker(env.REDIS_URL);
  const shutdown = async () => {
    await worker.close();
    process.exit(0);
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});`,
    },
    watch: [
      "Do not start a BullMQ Worker inside a Next.js serverless handler. It will spawn duplicate consumers or die with the isolate.",
      "Unhandled promise rejections crash modern Node. Catch worker job errors or set a worker on(\"failed\") handler.",
      "process.env values are strings. Coerce with Zod. Do not compare them to numbers directly.",
    ],
    pairsWith: ["nextjs", "hono", "bullmq", "docker"],
    docsHref: "https://nodejs.org/docs/latest/api/",
  },
  {
    slug: "postgresql",
    name: "PostgreSQL",
    group: "data",
    oneLiner:
      "The relational database for data you must keep. Tables, SQL, transactions, foreign keys.",
    what: [
      "PostgreSQL stores rows on disk and speaks SQL. It is the system of record for app-owned data: synced product snapshots, customers you own, job audit logs.",
      "Redis can vanish on restart. Typesense is a search index you can rebuild. WooCommerce has its own MySQL. Postgres is what you query when those disagree.",
      "Use it for joins, constraints, and anything that needs a transaction. Do not use it as a search engine. That is Typesense.",
    ],
    howIntro:
      "Run Postgres in Compose. Migrate schema from the monorepo. Query through a small client, not ad hoc SQL in React components.",
    howSteps: [
      "Create tables for the documents you sync, with the WooCommerce id as a primary key so upserts are safe.",
      "Index columns you filter on (sku, slug, updated_at).",
      "Keep connection strings in DATABASE_URL. One pool per Node process.",
      "Write the row first, then enqueue BullMQ. If the job fails, retry from the row. If you enqueue first and the write fails, the worker has nothing to load.",
    ],
    code: {
      filename: "packages/db/src/products.sql",
      source: `CREATE TABLE products (
  id bigint PRIMARY KEY,
  sku text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  price_cents integer NOT NULL CHECK (price_cents >= 0),
  status text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX products_updated_at_idx ON products (updated_at);

INSERT INTO products (id, sku, slug, name, price_cents, status)
VALUES (41, 'NK-01', 'air-max', 'Air Max', 12999, 'publish')
ON CONFLICT (id) DO UPDATE
SET sku = EXCLUDED.sku,
    slug = EXCLUDED.slug,
    name = EXCLUDED.name,
    price_cents = EXCLUDED.price_cents,
    status = EXCLUDED.status,
    updated_at = now();`,
    },
    watch: [
      "SELECT * with no WHERE on a catalog table will get slower every week. Paginate and index.",
      "A column rename without a migration breaks the worker and the storefront together. Migrate in one PR.",
      "Do not let Server Components open a new pool on every render. Reuse a module-level pool.",
    ],
    pairsWith: ["redis", "typesense", "bullmq", "docker"],
    docsHref: "https://www.postgresql.org/docs/current/",
  },
  {
    slug: "redis",
    name: "Redis",
    group: "data",
    oneLiner:
      "In-memory key-value store. Cache, rate limits, sessions, and the backend for BullMQ.",
    what: [
      "Redis keeps data in RAM and optional on-disk snapshots. Reads and writes are fast. The process is a single-threaded server you talk to over a TCP URL.",
      "In this stack it does two jobs: short-lived cache, and BullMQ's lists of waiting, active, and failed jobs.",
      "It is not the catalog. If Redis restarts empty, the shop must still render from Postgres or Woo.",
    ],
    howIntro:
      "Run Redis in Compose. Point ioredis at REDIS_URL. Give cache keys a TTL and a prefix.",
    howSteps: [
      "Use one Redis for local dev. Separate logical DBs or key prefixes for cache versus BullMQ.",
      "Set EX (TTL) on cache keys. A product JSON with no expiry will rot after the next price change.",
      "For BullMQ, pass maxRetriesPerRequest: null on the ioredis connection. BullMQ documents this as required.",
      "Health-check Redis in Compose. If it is down, the queue is down.",
    ],
    code: {
      filename: "packages/redis/src/client.ts",
      source: `import { Redis } from "ioredis";

export const redis = new Redis(process.env.REDIS_URL!);

export async function cacheProduct(
  id: number,
  payload: string
) {
  await redis.set(\`cache:product:\${id}\`, payload, "EX", 300);
}

export function bullmqConnection() {
  return new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
  });
}`,
    },
    watch: [
      "Treat Redis as cache or as a queue, not as a source of truth.",
      "KEYS * in production blocks the server. Use SCAN or known key names.",
      "BullMQ and a cache on the same instance is fine at modest size. Split them when eviction starts deleting job keys. Set a maxmemory policy that cannot evict BullMQ prefixes, or use two instances.",
    ],
    pairsWith: ["bullmq", "postgresql", "docker"],
    docsHref: "https://redis.io/docs/latest/",
  },
  {
    slug: "typesense",
    name: "Typesense",
    group: "data",
    oneLiner:
      "A search engine for product queries, typos, facets, and filters. Not your database.",
    what: [
      "Typesense indexes JSON documents and answers search queries. It handles typos, typo-tolerant ranking, and faceted filters (size, brand, price).",
      "WooCommerce search and SQL ILIKE are the wrong tools for a storefront search box. You copy a denormalized product document into Typesense and query that.",
      "The collection is derived data. If it drifts, rebuild it from Postgres or Woo. Users can live with a few minutes of lag. They cannot live with empty hits.",
    ],
    howIntro:
      "Run Typesense in Compose, create a collection schema, and upsert documents from a BullMQ worker.",
    howSteps: [
      "Create the collection once with typed fields. Mark filterable fields with facet: true.",
      "Upsert by document id (the Woo product id) so retries do not duplicate rows.",
      "Search from a Next.js Server Component or a Hono route using a search-only API key.",
      "Keep the admin key in the worker only.",
    ],
    code: {
      filename: "apps/worker/src/typesense.ts",
      source: `import Typesense from "typesense";

export const typesense = new Typesense.Client({
  nodes: [{ host: "localhost", port: 8108, protocol: "http" }],
  apiKey: process.env.TYPESENSE_ADMIN_KEY!,
});

await typesense.collections().create({
  name: "products",
  fields: [
    { name: "name", type: "string" },
    { name: "description", type: "string" },
    { name: "price_cents", type: "int32", facet: true },
    { name: "categories", type: "string[]", facet: true },
  ],
});

await typesense.collections("products").documents().upsert({
  id: "41",
  name: "Air Max",
  description: "Running shoe",
  price_cents: 12999,
  categories: ["shoes"],
});

const hits = await typesense
  .collections("products")
  .documents()
  .search({ q: "nkie", query_by: "name,description" });`,
    },
    watch: [
      "Schema changes often need a new collection and an alias swap. You cannot always ALTER a field in place.",
      "Do not query Woo REST on every keystroke. Search Typesense. Refresh Typesense from the worker.",
      "A search-only key can go to the Next.js server. The admin key cannot go to the browser.",
    ],
    pairsWith: ["bullmq", "wordpress", "nextjs", "postgresql"],
    docsHref: "https://typesense.org/docs/",
  },
  {
    slug: "bullmq",
    name: "BullMQ",
    group: "jobs",
    oneLiner:
      "A Redis-backed job queue. The API records work. A worker process does the work later.",
    what: [
      "BullMQ stores jobs in Redis lists and hashes. Producers call queue.add. A Worker in another process pulls jobs and runs your function.",
      "Use it for anything that must not sit on a webhook or a page render: pull WooCommerce, upsert Postgres, index Typesense, send mail, retry failures.",
      "Retries, backoff, delayed jobs, and a failed-job set are the reason you do not roll your own setTimeout loop.",
    ],
    howIntro:
      "Create a named queue in the API. Create a Worker with the same name in apps/worker. Both share one Redis connection factory.",
    howSteps: [
      "Add jobs with a stable jobId when you want dedupe, for example product-41.",
      "Set attempts and exponential backoff. Woo and Typesense will fail sometimes.",
      "Make the processor idempotent. Upsert, do not INSERT without ON CONFLICT.",
      "Run the worker as its own Docker service or pnpm process. One worker group per queue name.",
    ],
    code: {
      filename: "apps/worker/src/index-worker.ts",
      source: `import { Queue, Worker } from "bullmq";
import { bullmqConnection } from "@shop/redis";

const connection = bullmqConnection();

export const indexQueue = new Queue("typesense-index", { connection });

export function startIndexWorker() {
  return new Worker(
    "typesense-index",
    async (job) => {
      const product = await loadProduct(job.data.id);
      await upsertPostgres(product);
      await upsertTypesense(product);
    },
    {
      connection,
      concurrency: 5,
    }
  );
}

await indexQueue.add(
  "product",
  { id: 41 },
  {
    jobId: "product-41",
    attempts: 5,
    backoff: { type: "exponential", delay: 1000 },
  }
);`,
    },
    watch: [
      "Jobs will run more than once. Design for that.",
      "maxRetriesPerRequest: null on ioredis is required. Missing it produces connection errors that look unrelated.",
      "Failed jobs stay in Redis until you retry or drain them. Add Bull Board or a small admin route, or you will not see poison messages.",
      "Do not put the Worker in Next.js production serverless. It needs a long-lived process.",
    ],
    pairsWith: ["redis", "hono", "typesense", "nodejs"],
    docsHref: "https://docs.bullmq.io/",
  },
  {
    slug: "docker",
    name: "Docker and Compose",
    group: "ops",
    oneLiner:
      "Docker packages a process into an image. Compose starts Postgres, Redis, and Typesense on one network from a YAML file.",
    what: [
      "An image is a snapshot of files and a default command. A container is a running instance. Compose reads docker-compose.yml and starts several named services that can reach each other by service name.",
      "You use it so every laptop has the same Postgres, Redis, and Typesense, without installing those servers on the host.",
      "You can also image the Next.js, Hono, and worker apps for staging. Locally it is common to run those with pnpm and only Compose the data stores.",
    ],
    howIntro:
      "Write a compose file, run docker compose up -d, and point app env at localhost ports.",
    howSteps: [
      "Publish ports to the host (5432, 6379, 8108) so pnpm processes can connect.",
      "Inside Compose, services talk using the service name as host, for example postgres:5432 from another container.",
      "Use named volumes for database directories. compose down keeps them. compose down -v deletes them.",
      "Pin image tags (postgres:16, redis:7) rather than latest.",
    ],
    code: {
      filename: "docker-compose.yml",
      source: `services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: shop
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"

  typesense:
    image: typesense/typesense:27.1
    command: "--data-dir /data --api-key=dev --enable-cors"
    ports:
      - "8108:8108"
    volumes:
      - tsdata:/data

volumes:
  pgdata:
  tsdata:`,
    },
    watch: [
      "localhost inside a container is the container, not your machine. From Next on the host, use localhost. From a worker container, use the service name.",
      "Data in volumes survives container recreation. If a migration looks \"already applied\" on a fresh clone, you are hitting an old volume.",
      "Do not commit real secrets. Use an untracked .env next to the compose file.",
    ],
    pairsWith: ["postgresql", "redis", "typesense", "pnpm"],
    docsHref: "https://docs.docker.com/compose/",
  },
  {
    slug: "pnpm",
    name: "pnpm monorepo",
    group: "ops",
    oneLiner:
      "One git repo, several packages, one lockfile. Shared Zod schemas without publishing to npm.",
    what: [
      "pnpm is a package manager that stores packages once and links them into each project. A workspace (monorepo) is a set of packages declared in pnpm-workspace.yaml.",
      "A typical shop repo is apps/web (Next.js), apps/api (Hono), apps/worker (BullMQ), and packages/shared (Zod schemas, Typesense types).",
      "Internal packages use workspace:* in package.json. pnpm links them locally. You do not publish shared to the public registry.",
    ],
    howIntro:
      "Declare packages in pnpm-workspace.yaml, name each package, and filter commands by name.",
    howSteps: [
      "Put apps and packages in folders that match the workspace glob.",
      "Install a dep into one package with pnpm add zod --filter @shop/shared.",
      "Run Next with pnpm --filter @shop/web dev.",
      "CI should run pnpm install --frozen-lockfile so the lockfile cannot drift.",
    ],
    code: {
      filename: "pnpm-workspace.yaml",
      source: `packages:
  - "apps/*"
  - "packages/*"

# package.json in packages/shared
# {
#   "name": "@shop/shared",
#   "private": true,
#   "version": "0.0.0"
# }

# from repo root:
# pnpm add zod --filter @shop/shared
# pnpm --filter @shop/web dev
# pnpm --filter @shop/api dev
# pnpm --filter @shop/worker dev`,
    },
    watch: [
      "pnpm is strict. If apps/web uses zod but does not list it, the import fails. Declare the dependency in that package.",
      "Do not copy node_modules between machines. Commit pnpm-lock.yaml and install from it.",
      "One Node version for the whole workspace. Mixed majors break native addons and Next.",
    ],
    pairsWith: ["nextjs", "hono", "zod", "docker"],
    docsHref: "https://pnpm.io/workspaces",
  },
];

export const topicsBySlug = Object.fromEntries(
  topics.map((topic) => [topic.slug, topic])
) as Record<string, Topic>;

export function getTopic(slug: string): Topic | undefined {
  return topicsBySlug[slug];
}

export function topicsInGroup(group: TopicGroup): Topic[] {
  return topics.filter((topic) => topic.group === group);
}
