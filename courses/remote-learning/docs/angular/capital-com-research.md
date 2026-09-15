# Capital.com research

Checked against first-party pages and the current public job board on 31 August 2026. Company pages can change. Use these facts to shape preparation, not to guess private architecture.

## What the current Angular role asks for

Capital.com's current Angular Software Engineer listing asks for:

- at least three years of professional frontend work focused on Angular
- experience with complex Angular applications
- deep understanding of observables, RxJS, and reactive programming
- unit testing, code review, and hands-on development
- web-performance testing and optimization
- written documentation
- collaboration with design, security, operations, and product teams
- analytical problem solving, ownership, and communication

It lists Ionic, application resilience, Agile, and DevOps familiarity as extra value.

Source: [Capital.com Angular Software Engineer listing](https://jobs.lever.co/capital/9726b1f7-d360-4f21-889f-d71acd0b039c)

The listing does not name:

- the Angular version
- a state-management library
- the unit-test framework
- the exact interview exercise
- internal market-data protocols

Do not invent answers for those gaps. Ask.

## Public engineering priorities

A Capital.com press release from November 2024 named Angular and Java software engineering, DevOps, QA, SRE, incident management, data engineering, and database work as hiring areas. The current role text emphasizes performance, launch-time efficiency, resilience, and data confidentiality.

Sources:

- [Technology hiring press release](https://capital.com/en-int/press/capital-com-set-to-double-technology-team-amid-strong-growth)
- [Capital.com technology careers](https://capital.com/tech-recruitment)

The careers page describes real-time market data, advanced charting, mobile trading, and access to more than 5,500 markets. Those product claims make live-data rendering and startup cost more relevant than a generic dashboard exercise.

## Regulation changes product behavior

Capital.com operates through separate regulated entities. Its current group pages name regulators including:

- the Financial Conduct Authority in the UK
- the Cyprus Securities and Exchange Commission
- the Australian Securities and Investments Commission
- the Securities Commission of The Bahamas
- the UAE Securities and Commodities Authority
- the South African Financial Sector Conduct Authority
- the Capital Markets Authority of Kenya

Sources:

- [Capital.com fraud awareness](https://capital.com/en-int/ways-to-trade/fraud-awareness)
- [South Africa regulatory announcement](https://capital.com/en-int/press/capital-com-enters-south-africa-under-dual-fsca-regulatory-licence)
- [Kenya regulatory announcement](https://capital.com/en-int/press/global-fintech-group-capital-com-receives-cma-licence-in-kenya)

The legal entity, client classification, and region determine available products, leverage, disclosures, client-money rules, and protections. Never apply one entity's rule globally in code or interview answers.

### Retail leverage

Capital.com's published help and policy material gives these maximum ratios for eligible retail accounts under the cited UK, EU, and similar product-intervention rules:

- 30:1 for major currency pairs
- 20:1 for non-major currency pairs, gold, and major indices
- 10:1 for other commodities and non-major equity indices
- 5:1 for individual equities and other reference values
- 2:1 for cryptocurrencies

The actual maximum can be lower for an instrument. Other jurisdictions and professional client classifications can differ.

Sources:

- [Capital.com maximum leverage](https://help.capital.com/hc/en-us/articles/360016572320-What-is-the-maximum-leverage)
- [Capital.com leverage and margin policy](https://img.capital.com/docs/Leverage-and-Margin-Policy-V9.0-.pdf)

### Margin close-out and negative balance

Capital.com's margin-call page says close-out starts when equity falls to 50% or less of required margin. The exact close-out sequence depends on account behavior. Its policy describes negative-balance protection for retail clients, limiting covered losses to the current account balance. Do not assume the same protection for professional clients or every legal entity.

Sources:

- [Capital.com margin calls](https://capital.com/en-int/ways-to-trade/margin-calls)
- [Capital.com leverage and margin policy](https://img.capital.com/docs/Leverage-and-Margin-Policy-V9.0-.pdf)

Frontend consequences:

- show legal-entity and account-classification data from the backend
- treat leverage and margin as instrument and account data
- make margin warnings durable and accessible
- never simulate close-out authority in the browser
- test the exact threshold boundary and rapid moves across it

## Product and revenue model

Capital.com describes itself as an execution-only brokerage platform. Its published business model says revenue comes from:

- spreads
- overnight funding
- guaranteed stop-loss premiums when triggered
- currency conversion and other regional fees

The page says no commission is charged on positions. Exact charges depend on account, region, instrument, direction, and current terms.

Sources:

- [How Capital.com makes money](https://capital.com/en-int/about-us/how-capital-makes-money)
- [Charges and fees](https://capital.com/en-int/ways-to-trade/fees-and-charges)

Frontend consequences:

- deal tickets must show bid, ask, spread, and estimated cost clearly
- P&L labels must distinguish gross value from fees and funding
- currency conversion needs an explicit rate and account currency
- overnight funding is product data, not one hard-coded percentage
- guaranteed and standard stops need different execution and fee language

## How published pricing differs by market

Capital.com's pricing page says:

- cryptocurrency CFD prices aggregate prices from several exchanges, form a consolidated mid-price, then apply a Capital.com spread
- share CFD prices start from underlying exchange bid and ask prices, then add a markup
- spot forex and metals aggregate prices from over-the-counter counterparties, then add a spread
- cash index pricing derives from provider prices and spread rules
- commodity futures use underlying market prices plus spread
- undated commodity pricing moves between nearby futures contracts and uses a daily premium adjustment

Source: [How Capital.com prices markets](https://capital.com/en-int/about-us/how-our-markets-are-priced)

Interview lesson: there is no universal `getPrice(symbol)` rule. Instrument metadata and asset-class policy drive source, precision, spread, market hours, and adjustments.

## Public API facts that expose real failure modes

Capital.com's public API offers REST and WebSocket market data. Its documentation says:

- session creation returns `CST` and `X-SECURITY-TOKEN` headers
- the security token identifies the active financial account
- REST and WebSocket sessions need activity or ping within the documented 10-minute window
- the general maximum request rate is 10 requests per second per user
- position opening and working-order creation have tighter rate rules
- one WebSocket market-data subscription supports up to 40 instruments
- switching the active financial account through `PUT /session` stops WebSocket streaming
- subscription requests use a `correlationId`
- `POST /positions` returns a `dealReference`
- a successful response to `POST /positions` does not prove the position opened
- clients confirm the final status through `GET /confirms/{dealReference}`

Source: [Capital.com public API](https://open-api.capital.com/)

The public API may differ from Capital.com's internal frontend services. Its documented semantics still give strong discussion examples.

### Published order controls

The public API documents market and limit working orders, stop-loss and take-profit levels, trailing stops, and guaranteed stops. It also documents constraints: a guaranteed stop cannot be combined with a trailing stop, and its availability can depend on hedging mode. This is a good example of state that belongs in a discriminated union or validated domain model, not independent checkboxes.

Source: [Capital.com public API](https://open-api.capital.com/)

### Interview traps grounded in that API

**HTTP success is not business success.** Model submission, acceptance, confirmation, rejection, and unknown outcome separately.

**One socket per component will not scale.** A connection service should coordinate subscriptions, correlation IDs, the 40-instrument limit, keepalive, and account changes.

**Account identity affects every stream.** Clear or scope cached data when the active account changes. Never show one account's positions under another account.

**Rate limiting is product behavior.** Search, polling, and retries need backoff, deduplication, and bounded concurrency.

**Reconnect needs state recovery.** A live socket alone does not prove subscriptions or account state recovered.

**Tokens are sensitive.** Do not log either session token. Browser storage and cross-site scripting risk deserve explicit discussion.

## What to prioritize for the coding hour

Based on the role and public product, highest-value drills are:

1. RxJS operator choice under cancellation and ordering constraints
2. a normalized latest-quote reducer
3. an Angular search or watchlist with explicit states
4. order submission with confirmation and unknown outcome
5. rendering-rate control for frequent market updates
6. strict TypeScript boundary validation
7. numeric precision and instrument metadata
8. unit tests for duplicates, stale responses, and reconnects

This is an evidence-based priority list, not a claim about their private interview.

## What to prioritize for discussion

Prepare deep answers on:

- Angular change detection and startup performance
- signals and RxJS ownership
- WebSocket connection and subscription lifecycle
- resilience after disconnect, account switch, and partial failure
- data confidentiality in logs, caches, and browser storage
- order confirmation versus transport success
- test strategy for live financial state
- accessible real-time UI

The job text explicitly supports performance, resilience, confidentiality, RxJS, testing, review, and cross-team collaboration. The trading details come from Capital.com's product and API pages.

## A tailored design answer

Prompt:

> Design a Capital.com-style watchlist and order ticket.

Answer outline:

1. Parse all HTTP and WebSocket payloads from `unknown`.
2. Scope authenticated state and caches to active account.
3. Use one managed socket and multiplex instrument subscriptions.
4. Track each subscription by correlation ID.
5. Normalize latest quotes by instrument ID.
6. Separate network update rate from visible render rate.
7. Show `connecting`, `live`, `stale`, and `failed` states.
8. Keep order commands outside latest-value cancellation flows.
9. Treat a returned deal reference as pending confirmation.
10. Reconcile unknown outcomes before allowing a duplicate intent.
11. Respect request and instrument subscription limits.
12. Measure launch time, message-to-screen latency, gaps, reconnects, and retained subscriptions.

Then name the boundary:

> The browser improves feedback and prevents accidental repeats. The server remains authoritative for authorization, margin, price, idempotency, and final trade state.

## Tailored questions for interviewers

Pick two or three:

- Which parts of the Angular application create the largest launch-time cost today?
- How does the frontend recover subscriptions and state after an account switch?
- How do internal order APIs separate transport acceptance from trade confirmation?
- Which market-data updates may the UI coalesce, and which must it retain?
- How do you measure message-to-screen latency during volatile periods?
- Is the current Angular application zoneless, Zone.js based, or in migration?
- Where do signals fit alongside the existing RxJS architecture?
- How are confidentiality requirements tested in frontend logging and telemetry?
- What resilience failure has taught the frontend team the most?

## A credible "why Capital.com" answer

Use your real experience in place of the bracketed part:

> The role combines Angular depth with correctness under live data. Capital.com's public role emphasizes RxJS, performance, resilience, testing, and data confidentiality, while the product has order and pricing states where frontend mistakes can affect real financial decisions. My strongest relevant example is [measured project or incident]. I want work where frontend architecture is judged by correctness and recovery, not only by component delivery.

Keep it specific. Do not repeat company marketing language.

## Facts to avoid overstating

- Capital.com publicly recruits Angular engineers. That does not prove every frontend uses Angular.
- The public API has documented limits. Internal services may use different limits and protocols.
- CFD calculations in this workbook are simplified. Capital.com's instrument details and legal entity rules are authoritative.
- No first-party source found describes the exact two-hour interview.
- No first-party source found publishes a finance-algorithm question bank.
