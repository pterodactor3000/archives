---
layout: page
title: "Senior frontend interview workbook"
---

**Vault path:** `courses/remote-learning` · **landing:** `courses/remote-learning/README.md`

**Upstream:** [https://github.com/pterodactor3000/remote-learning](https://github.com/pterodactor3000/remote-learning)

---

# Senior frontend interview workbook

Interview preparation for senior frontend roles. Not a shipped product.

Fintech is the first vertical. Later verticals include automotive, e-commerce, and SaaS.

Three playgrounds are on disk: Next.js App Router, TanStack Start, and Angular. `npm run dev` starts all three so you can implement the same drill in each stack and compare.

## Language

**Workbook**:
This repository. Interview preparation across stacks and verticals, not a shipped product.
_Avoid_: platform, product, trading app

**Playground**:
A runnable app used to learn one stack.
_Avoid_: demo, sandbox, site

**Stack**:
A UI technology a playground is built with.
_Avoid_: tech domain, domain

**Vertical**:
A business area with its own language and shared rules. Fintech is first. Later verticals include automotive, e-commerce, and SaaS.
_Avoid_: domain (alone)

**Drill**:
A prompt in the study notes. Convert it into an Hour when you are ready to do it.
_Avoid_: Hour

**Hour**:
A GitHub issue for one prompt. Start a sitting with `/hour-start`. Review is a PR review via `/hour`. It may take several sittings. Done when every in-scope playground has the work.
_Avoid_: task, entry, item

**Sitting**:
60 minutes on one in-scope playground, using the interview clock.
_Avoid_: Hour (when you mean one playground's clock)

## Hours dashboard

Open `index.html` in the browser. The table lists every Hour.

The GitHub repo is private. Without a token the API returns 404 and the table stays empty. Paste the output of `gh auth token`. The token needs repo scope. The page stores it in `localStorage` in this browser. It does not put the token on `window` or in a script file.

## Run the playgrounds

```bash
npm install
npm run dev
```

- Next.js: http://127.0.0.1:3000
- TanStack Start: http://127.0.0.1:3001
- Angular: http://127.0.0.1:4200

Each playground sets that host and port in its own app. Shared rules live in `packages/domain`. Today that is fintech quote rows under `packages/domain/src`. `npm run dev` compiles that package first. After you change domain TypeScript, wait for the domain watcher, then refresh the playgrounds.

```bash
npm run dev:react-next
npm run dev:react-vite
npm run dev:angular
npm test
```

## Layout

```text
apps/react-next  Next.js App Router playground
apps/react-vite  TanStack Start playground
apps/angular    Angular 22 playground (zoneless, Vitest)
packages/domain shared TypeScript, one folder per vertical later
docs/           interview notes
```

Write playground UI yourself in the matching app. That is how you learn the stack. Put shared rules in `packages/domain/<vertical>` so every playground can run the same vertical logic. Fintech code still lives in `packages/domain/src` until `packages/domain/fintech` exists.

Next.js App Router notes live under `docs/react`.

## Study notes

Notes on disk still lean on fintech and on Angular, React, and Next.js interviews. Stack-neutral material lives under `docs/shared`.

### Shared

[Shared preparation](docs/shared/README.md) covers interview reasoning, TypeScript and JavaScript traps, ECMAScript 2027 Stage 4 features, HTML, CSS, WCAG 2.2, Core Web Vitals, trading concepts, finance algorithms, and stack-neutral drills.

### Angular

[Angular preparation](docs/angular/README.md) covers senior Angular and RxJS, implementation examples, memory handling, Capital.com research, and the Angular study plan.

### React

[React preparation](docs/react/README.md) covers React 19.2, Next.js 16.2 App Router, web-platform integration, twenty technical questions, and React coding drills.

## Interview clock

An Hour uses this clock once per in-scope playground.

For a 60-minute coding session:

```text
0-5 min: clarify contract, units, and states
5-15 min: define types, examples, and simple design
15-40 min: complete one correct path
40-50 min: test boundaries, failures, and races
50-60 min: explain complexity, tradeoffs, and production gaps
```

For technical questions, answer in this order:

```text
Mechanism:
Common trap:
How I would verify it:
```

Do not memorize whole answers. Practice deriving them aloud.
