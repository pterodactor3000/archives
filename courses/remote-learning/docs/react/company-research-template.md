# Financial firm research template

The React interview material stays company-agnostic until the firm is known. Fill this page when the name arrives. Use first-party sources for factual claims.

## Role evidence

Capture:

- exact role title
- React and Next.js versions if named
- required testing tools
- state and data libraries
- rendering model
- performance requirements
- accessibility requirements
- security or regulatory wording
- mobile or desktop scope
- interview format

Source links:

- [job listing]
- [engineering careers]

Do not infer internal architecture from one library in a job listing.

## Product

Identify:

- banking, brokerage, exchange, market-data, payments, or crypto product
- retail, professional, or institutional users
- owned assets versus derivatives
- supported regions and legal entities
- primary user journeys
- revenue model and fees

Questions:

- What can the user lose if the UI is stale or wrong?
- Which action moves money or creates exposure?
- Which state needs server confirmation?
- Which information is legally required before action?

## Regulation

Find the firm's own legal and regulatory pages.

Record by legal entity:

- regulator
- customer region
- client classification
- leverage or credit rules
- client-money or custody model
- negative-balance or loss protections
- disclosures and consent
- data residency claims

Do not apply one jurisdiction's rule to every account.

## Public technical evidence

Look for:

- API documentation
- status page
- incident reports
- engineering blog
- open-source repositories
- security page
- accessibility statement
- privacy and cookie policy

Extract only published facts:

- authentication model
- rate limits
- idempotency
- pagination
- WebSocket or streaming protocol
- sequence and reconnect behavior
- error and confirmation states

Public APIs may differ from internal frontend services. Use them to discuss failure modes, not to claim private design.

## Frontend risks

Rank five:

1. [risk]
2. [risk]
3. [risk]
4. [risk]
5. [risk]

Possible categories:

- stale price or balance
- duplicate transaction
- unknown command outcome
- account data leak
- incorrect decimal or currency
- inaccessible critical action
- slow interaction during high load
- hydration showing one user's cached state
- session expiry during a transaction

For each, prepare:

```text
User impact:
Prevention:
Recovery:
Telemetry:
Test:
```

## Likely React and Next.js questions

Tailor after research:

- Why this rendering model fits public versus authenticated pages
- Where the Server and Client Component boundary should sit
- Which data can be cached
- How authorization repeats in Server Actions
- How live state reaches React without broad rerenders
- How the product measures interaction and message-to-screen latency
- How keyboard, focus, and live announcements work

## Credible interest answer

Use:

> The product has [specific user journey] where frontend correctness matters because [specific user risk]. The role asks for [published technical requirement]. My closest evidence is [measured project or incident]. I want to work on [specific engineering problem], not finance as an abstract theme.

Replace every bracket. Do not repeat marketing copy.

## Questions for interviewers

Pick three:

- Which frontend correctness failure carries the most user risk?
- Which React or Next.js upgrade creates the most work today?
- How does the UI recover after stale or incomplete data?
- Which data may the frontend cache, and where are account boundaries enforced?
- How do you measure interaction and message-to-screen latency?
- How do design and engineering test critical journeys for keyboard and screen-reader users?
- What should this role improve in its first six months?
