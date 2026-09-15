# Core Web Vitals and frontend performance

Core Web Vitals describe user experience. They are not a complete performance score.

Official references:

- [Web Vitals](https://web.dev/articles/vitals)
- [Core Web Vitals workflows](https://web.dev/articles/vitals-tools)
- [Optimize LCP](https://web.dev/articles/optimize-lcp)
- [Optimize INP](https://web.dev/articles/optimize-inp)
- [Optimize CLS](https://web.dev/articles/optimize-cls)

## Know the current metrics

| Metric | Measures | Good |
| --- | --- | --- |
| Largest Contentful Paint, LCP | loading | at most 2.5 seconds |
| Interaction to Next Paint, INP | responsiveness | at most 200 milliseconds |
| Cumulative Layout Shift, CLS | visual stability | at most 0.1 |

Judge each metric at the 75th percentile of page visits, split by mobile and desktop.

Do not substitute First Contentful Paint for LCP. Do not call First Input Delay a current Core Web Vital. INP replaced it.

## Field data versus lab data

Field data comes from real users and includes their devices, networks, caches, extensions, data, and interactions. Chrome User Experience Report data uses a rolling 28-day window.

Lab data runs in a controlled environment. It is faster for debugging and regression checks, but one test cannot represent the user population.

Use both:

```text
field data finds the affected users and pages
  -> lab trace reproduces the issue
  -> browser trace identifies the cause
  -> change one variable
  -> lab confirms the mechanism
  -> field data confirms the user result
```

Lighthouse reports Total Blocking Time as a lab proxy for responsiveness. TBT is not INP. A real INP needs interactions.

## Largest Contentful Paint

Break LCP into:

```text
time to first byte
+ resource load delay
+ resource load duration
+ element render delay
= LCP
```

This decomposition stops random optimization.

### Improve server response

- remove redirects
- cache public responses safely
- use a content delivery network
- stream useful HTML
- make backend calls concurrent when they are independent
- avoid server work that the first view does not need

### Make the LCP resource discoverable

- put the image in initial HTML
- avoid hiding it behind client-side JavaScript
- preload only a known high-priority resource
- set `fetchpriority="high"` for the real LCP image where appropriate
- do not lazy-load the LCP image

### Reduce resource load time

- send correct image dimensions and formats
- use responsive image sources
- compress assets
- cache static assets
- serve assets near users

### Reduce render delay

- reduce render-blocking CSS
- remove unnecessary client JavaScript
- avoid waiting for hydration before showing primary content
- split non-critical third-party scripts
- keep the LCP element visible instead of animating it in late

Responsive image delivery, font optimization, server rendering, and streaming can help. None guarantees a good LCP.

## Interaction to Next Paint

INP measures the latency of user interactions across the page visit. Think in three parts:

```text
input delay
+ event-handler processing
+ presentation delay
= interaction latency
```

### Reduce input delay

The main thread must be free to start the handler:

- split long startup tasks
- reduce JavaScript shipped and parsed
- delay non-critical third-party work
- stop timer and microtask loops from monopolizing the thread

### Reduce processing time

- do the minimum synchronous work in the handler
- avoid filtering or sorting a large collection after every keystroke
- pre-index data
- split work and yield between chunks
- move heavy pure computation to a worker when transfer cost is justified

Splitting non-urgent work into chunks can let urgent work run first. Prioritization cannot interrupt an ordinary long JavaScript task or move work off the main thread.

### Reduce presentation delay

- keep the DOM small
- avoid layout thrashing
- virtualize long lists
- reduce expensive styles and paint
- show immediate feedback before slower follow-up work

A fast handler can still have poor INP if the resulting render, layout, and paint are expensive.

## Cumulative Layout Shift

CLS measures unexpected movement in the viewport. It uses the worst session window, not a sum over the full page life.

Common causes:

- images or video without reserved dimensions
- ads, banners, or errors inserted above content
- late web-font metric changes
- loading fallbacks with different dimensions
- client-rendered content replacing a smaller server shell
- animations that change layout properties

Fixes:

- set image width and height or an aspect ratio
- reserve space for dynamic regions
- put new content below existing content when possible
- choose font fallbacks with compatible metrics
- animate transforms and opacity instead of layout properties
- make loading and loaded states occupy similar space

Layout changes shortly after qualifying user input may be excluded from CLS. That does not make a jarring interaction good.

## Measure in an application

Use layers of evidence:

- field RUM through the `web-vitals` library or an analytics provider
- Chrome DevTools Performance panel
- Lighthouse for repeatable lab checks
- bundle analysis and application instrumentation
- server traces for request and data latency

Capture attribution with each field metric:

- route and navigation type
- device class
- connection type
- metric element or interaction target
- build version
- experiment cohort

Do not log account IDs, order details, or instrument activity unless policy permits it. Performance telemetry can leak sensitive behavior.

## Trading-screen performance

Core Web Vitals miss several critical product measures:

- quote age
- socket message-to-visible latency
- dropped frames during volatility
- accepted messages per second
- sequence gaps
- reconnect and resubscribe duration
- order-click to acknowledged state
- memory after route and account changes

Separate rates:

```text
network ingress rate
business-state processing rate
visible rendering rate
```

A watchlist may coalesce visual quote updates to one per frame. Order, position, and audit events still need complete processing.

Keep the latest value by instrument ID. Update only rows whose visible snapshot changed. Avoid sorting the full instrument list on every tick.

## A senior diagnosis answer

Prompt:

> The trading screen freezes during a volatile market. What do you do?

Answer:

1. Reproduce at the recorded message rate and instrument count.
2. Capture a browser performance trace and application timing marks.
3. Mark socket receipt, state publication, DOM update, and paint.
4. Decide whether parsing, calculation, DOM updates, layout, paint, or garbage collection dominates.
5. Check whether one update fans out through broad subscriptions or list-wide selectors.
6. Change the largest measured cost.
7. Compare the same trace and product metrics.
8. Test keyboard access and stale-state behavior after optimization.

Do not lead with memoization.

## Questions to answer aloud

1. What are the current three Core Web Vitals and good thresholds?
2. Why is the 75th percentile used?
3. What can field data show that Lighthouse cannot?
4. What four parts make up LCP?
5. Why can render prioritization fail to improve INP?
6. What causes post-load CLS?
7. How can streaming improve LCP while an unstable fallback hurts CLS?
8. Which browser trace separates JavaScript tasks from layout and paint?
9. Why does virtualization need accessibility testing?
10. Which trading performance measures are missing from Core Web Vitals?
