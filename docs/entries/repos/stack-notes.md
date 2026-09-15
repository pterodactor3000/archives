---
layout: page
title: "Stack notes"
---

**Vault path:** `notes/stack-notes` · **landing:** `notes/stack-notes/README.md`

**Upstream:** [https://github.com/pterodactor3000/stack-notes](https://github.com/pterodactor3000/stack-notes)

---

# Stack notes

A Next.js reference for a headless shop stack: WordPress and WooCommerce, Next.js (App Router, Server Components, ISR), Node.js, Hono, Zod, PostgreSQL, Redis, BullMQ, Typesense, Docker Compose, and a pnpm monorepo.

Each topic page says what the tool is, how you use it in this stack, and the mistakes that show up in production. The home page shows how a WooCommerce product update reaches the storefront.

This repo is the notes. It does not run Postgres, Redis, Typesense, or WordPress.

## Run it

You need Node.js 22 and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:43127](http://localhost:43127).

```bash
pnpm build
pnpm start
```

builds the production server and serves it on the same port.

## Clone on cogitator

This project lives at [github.com/pterodactor3000/stack-notes](https://github.com/pterodactor3000/stack-notes). Put it next to `film-browser`, not inside it.

```bash
cd ~/Projects
git clone git@github.com:pterodactor3000/stack-notes.git
cd stack-notes
pnpm install
pnpm dev
```

To have Cursor agents run on that checkout, start a worker in `~/Projects/stack-notes` and pick that machine. A worker bound to `film-browser` will not see this repo.

## Where the copy lives

Topic text is in `src/content/topics.ts`. Routes are `src/app/page.tsx` and `src/app/topics/[slug]/page.tsx`.
