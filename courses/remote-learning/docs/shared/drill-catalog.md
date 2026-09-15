# Drill catalog

All drills across the workbook. Convert one into an Hour with `/hour` when you are ready to do it. Playground names:

- `apps/angular`
- `apps/react-next` (Next.js App Router)
- `apps/react-vite` (TanStack Start)

**1 React** means pick one of the two React playgrounds. Next.js and TanStack Start do not split that sitting.

**both React** means do `apps/react-next` and `apps/react-vite`. The URL or execution boundary differs.

## Shared (`docs/shared/timed-coding-drills.md`)

Default: Angular plus one React playground. Exceptions are in the Playgrounds column.

| # | Title | Time | Playgrounds |
| - | ----- | ---- | ----------- |
| 1 | [latest quote reducer](timed-coding-drills.md#drill-1-latest-quote-reducer) | 25 min | angular + 1 React |
| 2 | [rolling statistics](timed-coding-drills.md#drill-2-rolling-statistics) | 30 min | angular + 1 React |
| 3 | [candle aggregation](timed-coding-drills.md#drill-3-candle-aggregation) | 40 min | angular + 1 React |
| 4 | [order-book reducer](timed-coding-drills.md#drill-4-order-book-reducer) | 45 min | angular + 1 React |
| 5 | [instrument search](timed-coding-drills.md#drill-5-instrument-search) | 45 min | angular + 1 React |
| 6 | [order ticket](timed-coding-drills.md#drill-6-order-ticket) | 60 min | angular + 1 React |
| 7 | [real-time watchlist](timed-coding-drills.md#drill-7-real-time-watchlist) | 60 min | angular + 1 React |
| 8 | [bug hunt](timed-coding-drills.md#drill-8-bug-hunt) | 20 min | 1 playground |
| 9 | [async policy choice](timed-coding-drills.md#drill-9-async-policy-choice) | 15 min | 1 playground |
| 10 | [state-machine refactor](timed-coding-drills.md#drill-10-state-machine-refactor) | 25 min | angular + 1 React |
| 11 | [count-up timer](timed-coding-drills.md#drill-11-count-up-timer) | 20 min | angular + 1 React |
| 12 | [countdown timer](timed-coding-drills.md#drill-12-countdown-timer) | 25 min | angular + 1 React |

Shared search, ticket, and watchlist sit Angular against one React stack. URL, loaders, and session-scoped sockets across navigations live in the React-only drills.

## React (`docs/react/coding-drills.md`)

Angular is out of scope.

| # | Title | Time | Playgrounds |
| - | ----- | ---- | ----------- |
| 1 | [review a broken quote component](../react/coding-drills.md#drill-1-review-a-broken-quote-component) | 20 min | 1 React |
| 2 | [cancellable instrument search](../react/coding-drills.md#drill-2-cancellable-instrument-search) | 45 min | both React |
| 3 | [accessible order ticket](../react/coding-drills.md#drill-3-accessible-order-ticket) | 60 min | 1 React |
| 4 | [high-rate watchlist](../react/coding-drills.md#drill-4-high-rate-watchlist) | 60 min | 1 React, both optional |
| 5 | [Next.js execution-boundary review](../react/coding-drills.md#drill-5-nextjs-execution-boundary-review) | 30 min | `react-next` only |
| 6 | [CSS and accessibility repair](../react/coding-drills.md#drill-6-css-and-accessibility-repair) | 30 min | 1 React |
| 7 | [Core Web Vitals diagnosis](../react/coding-drills.md#drill-7-core-web-vitals-diagnosis) | 25 min | 1 React, prefer `react-next` |
| 8 | [React and JavaScript race](../react/coding-drills.md#drill-8-react-and-javascript-race) | 20 min | 1 React |

React drill 2 is the only required Next.js versus TanStack Start pair. Drill 4's second playground is only for layout-held sockets versus router context. Drill 5 has no TanStack equivalent.

## Angular

No dedicated drill file yet. `docs/angular/README.md` calls out shared drills 5, 6, 7, and 9 as the Angular-pattern exercises (search, order ticket, watchlist, async policy). Shared drills 11 and 12 are timer UI sittings on Angular plus one React playground. `docs/angular/capital-com-research.md` has a priority list for the coding hour.
