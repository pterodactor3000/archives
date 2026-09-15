# Senior Next.js

These notes target Next.js 16.2 with the App Router. State the version in an interview. Caching and request APIs changed across recent major versions, so an answer copied from Next.js 13 may now be wrong.

Official references:

- [App Router](https://nextjs.org/docs/app)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
- [Fetching data](https://nextjs.org/docs/app/getting-started/fetching-data)
- [Caching](https://nextjs.org/docs/app/getting-started/caching-and-revalidating)
- [Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- [Mutating data](https://nextjs.org/docs/app/getting-started/mutating-data)
- [Authentication](https://nextjs.org/docs/app/guides/authentication)
- [Image optimization](https://nextjs.org/docs/app/getting-started/images)

## Start with the execution boundary

App Router components are Server Components unless a client boundary says otherwise.

Server Components can:

- read server-side data close to its source
- keep credentials and private modules out of the client bundle
- send rendered output and a React Server Component payload
- use `async` rendering
- reduce client JavaScript for non-interactive UI

Server Components cannot use state, effects, browser APIs, or event handlers.

A file with `"use client"` starts a client boundary. Its imports and transitive dependencies join the client module graph. Client Components can use hooks and browser APIs. They still receive server-rendered HTML on the initial load before hydration attaches behavior.

Do not mark a whole layout as a Client Component because one button needs state. Push client boundaries down to the interactive part.

Props crossing from a Server Component to a Client Component must be serializable by React. Do not pass a database connection, class instance, or ordinary function across that boundary. Server Functions are a framework-managed exception.

## Composition across the boundary

A Server Component can render a Client Component and pass server-rendered content as `children`.

```tsx
import { QuotePanel } from "./QuotePanel";
import { WatchlistShell } from "./WatchlistShell";

export default async function WatchlistPage() {
  try {
    const initialQuotes = await loadInitialQuotes();

    return (
      <WatchlistShell>
        <QuotePanel initialQuotes={initialQuotes} />
      </WatchlistShell>
    );
  } catch (error: unknown) {
    throw new Error("Failed to render the initial watchlist", {
      cause: error,
    });
  }
}
```

If `WatchlistShell` is a Client Component, the server can still prepare `QuotePanel` before passing its rendered result through the slot. This keeps data work on the server and interaction in the client.

## Rendering is a product decision

Ask these questions:

- Can every user receive the same result?
- Does the result depend on cookies, headers, authorization, or search parameters?
- How stale may the data be?
- Can a static shell appear before personalized data?
- Does the page need search indexing?
- What happens if one data source is slow?

Public education and instrument pages may benefit from prerendering. An authenticated trading view usually contains request-specific account state and live client state.

Do not send account positions through a shared cache. Cache keys and ownership rules are correctness and confidentiality concerns.

## Streaming and Suspense

The App Router can stream route segments and Suspense boundaries. Send a useful shell while slower work continues.

```tsx
import { Suspense } from "react";

export default function AccountPage() {
  return (
    <main>
      <AccountHeading />
      <Suspense fallback={<PositionsSkeleton />}>
        <Positions />
      </Suspense>
    </main>
  );
}
```

Boundary placement controls reveal order. Keep related content together. A fallback should preserve approximate dimensions to avoid layout shift.

`loading.tsx` provides a route-segment loading boundary. Nested Suspense gives finer control inside the segment.

Streaming improves when content appears. It does not shorten slow database work or reduce all client JavaScript.

## Current caching model

Do not say "Next.js caches every fetch." In current App Router versions, `fetch` is not cached by default.

Make cache policy explicit when data may be reused:

```tsx
async function loadInstrumentMetadata(
  instrumentId: string,
): Promise<InstrumentMetadata> {
  try {
    const response = await fetch(
      `https://example.test/instruments/${instrumentId}`,
      { next: { revalidate: 300, tags: [`instrument-${instrumentId}`] } },
    );

    if (!response.ok) {
      throw new Error(
        `Instrument request returned HTTP ${response.status}`,
      );
    }

    const payload: unknown = await response.json();
    return parseInstrumentMetadata(payload);
  } catch (error: unknown) {
    throw new Error(
      `Failed to load instrument metadata for ${instrumentId}`,
      { cause: error },
    );
  }
}
```

Time-based revalidation allows a stale period. Tag-based invalidation ties cache entries to domain changes.

Use no shared cache for user-specific balances unless the cache mechanism and key include the correct user or account boundary. The safer default is request-time data.

## Cache Components

Next.js 16 has an opt-in `cacheComponents` configuration. With it enabled:

- the route can produce a static shell
- runtime data can stream behind Suspense
- `"use cache"` marks reusable work
- `cacheLife` defines freshness
- `cacheTag` labels data for invalidation

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
};

export default nextConfig;
```

```tsx
import { cacheLife, cacheTag } from "next/cache";

async function loadCachedProductCatalog(): Promise<readonly Product[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("product-catalog");

  try {
    return await loadProductCatalog();
  } catch (error: unknown) {
    throw new Error("Failed to load the cached product catalog", {
      cause: error,
    });
  }
}
```

Request-specific APIs such as cookies belong outside shared cached scopes. Pass only safe, explicit values into cached work.

Do not mix legacy experimental Partial Prerendering advice with the current Cache Components model without checking the project version.

## Revalidation after mutations

Know the difference:

- `revalidatePath` invalidates data associated with a path
- `revalidateTag` marks tagged data stale and supports stale-while-revalidate behavior with the current profile API
- `updateTag` expires tagged data for read-your-own-writes behavior in a Server Action
- `refresh` refreshes uncached data in the current client router and can run only inside a Server Action

Choose from user semantics. After changing a watchlist, the initiating user may need immediate consistency. Public instrument metadata may tolerate background revalidation.

## Server Actions and Server Functions

A Server Action is a Server Function used for a mutation. Forms can invoke one through `action`.

```tsx
"use server";

export async function addInstrumentToWatchlist(
  formData: FormData,
): Promise<void> {
  const instrumentId = parseInstrumentId(formData.get("instrumentId"));

  try {
    const session = await verifySession();
    await assertCanEditWatchlist(session.userId);
    await saveWatchlistInstrument({
      userId: session.userId,
      instrumentId,
    });
  } catch (error: unknown) {
    throw new Error(
      `Failed to add instrument ${instrumentId} to the current watchlist`,
      { cause: error },
    );
  }
}
```

`parseInstrumentId` accepts `unknown` and enforces the domain format and length before persistence. A TypeScript annotation on `FormData` would not provide runtime validation.

Treat every action as a reachable server endpoint:

- authenticate inside the action
- authorize the exact resource
- validate all form and closure data
- prevent mass assignment
- use idempotency for financial commands
- return safe errors
- rate-limit abuse

Hiding a form or checking authorization only in a page does not protect the action.

Server Actions use `POST`. Framework transport and encrypted references do not replace application authorization.

## Route Handlers

`route.ts` handles HTTP through the Web `Request` and `Response` APIs. Use it for public APIs, webhooks, callbacks, downloads, or a client that needs an HTTP boundary.

Validate inputs from `request.json()` as `unknown`.

```typescript
export async function POST(request: Request): Promise<Response> {
  try {
    const payload: unknown = await request.json();
    const command = parseOrderCommand(payload);
    const result = await submitOrder(command);

    return Response.json(result, { status: 202 });
  } catch (error: unknown) {
    const publicError = toPublicHttpError(error);

    return Response.json(
      { message: publicError.message },
      { status: publicError.status },
    );
  }
}
```

A `route.ts` and `page.tsx` cannot own the same route segment. Current versions do not cache `GET` Route Handlers by default. Opt into caching only when the response is safe to share.

Map validation, authentication, authorization, conflict, rate-limit, and unexpected failures to distinct status codes. Never send an internal stack or path in the response.

## Request APIs are asynchronous

In current Next.js, request-bound APIs such as `cookies()` and `headers()` are asynchronous. Route `params` and `searchParams` are also promises in the current App Router page contract.

```tsx
interface InstrumentPageProps {
  readonly params: Promise<{ instrumentId: string }>;
}

export default async function InstrumentPage({
  params,
}: InstrumentPageProps) {
  try {
    const { instrumentId: routeInstrumentId } = await params;
    const instrumentId = parseInstrumentId(routeInstrumentId);
    return <h1>{instrumentId}</h1>;
  } catch (error: unknown) {
    throw new Error("Failed to resolve the instrument route", {
      cause: error,
    });
  }
}
```

This is version-sensitive. Check an older codebase before correcting it.

## Hydration mismatches

Hydration expects the first client render to match server HTML.

Common causes:

- `Date.now()`, `Math.random()`, or locale output during render
- branching on `window` during initial render
- browser extensions changing the DOM
- invalid HTML nesting
- different data on server and client
- misconfigured CSS-in-JS output

Fix the source of nondeterminism. If a value is client-only, render a stable initial state and update it after hydration. `suppressHydrationWarning` is a narrow escape hatch for unavoidable text differences. It works one level deep and should not hide structural bugs.

## Errors and missing data

Use route conventions:

- `error.tsx` catches render failures for a segment and must be a Client Component
- `global-error.tsx` handles root failures
- `not-found.tsx` handles missing content
- `unauthorized.tsx` and `forbidden.tsx` support matching control-flow APIs when the experimental `authInterrupts` option is enabled

Log detailed server errors with a correlation ID. Show a safe message to users.

An order timeout is not a normal render error. Model its outcome in business state and reconcile it.

## Images, fonts, scripts, and metadata

`next/image` can size images, generate responsive sources, lazy-load offscreen content, and prevent image layout shifts. Provide correct dimensions or use `fill` with a sized container.

`next/font` self-hosts and subsets fonts. Choose fallback metrics and avoid loading more weights than the design uses.

Use `next/script` strategy based on when third-party code is needed. A tag manager, support widget, or fraud script can dominate main-thread work. Measure it.

Use the Metadata API for titles, descriptions, canonical URLs, and share metadata. Do not add client JavaScript for static head data.

## Bundle discipline

Server Components can keep heavy server-only libraries off the browser, but a Client Component boundary pulls its imports into the client graph.

Check:

- large charting libraries
- date, locale, and number-format packages
- barrel imports that defeat tree shaking
- duplicate packages
- third-party scripts
- client providers wrapped around the whole application

Lazy loading reduces initial work. It does not reduce total work if the user immediately needs the module.

## Finance application split

A useful split for an authenticated trading screen:

```text
Server Component
  -> verify session
  -> load account-safe initial snapshot
  -> render static labels and shell
  -> pass serializable snapshot into a small Client Component

Client Component
  -> connect through managed market-data client
  -> process sequence and stale state
  -> render at a controlled cadence
  -> send commands to an authorized server boundary
```

Do not use Next.js cache invalidation as the live market-data protocol. HTTP caching and WebSocket sequencing solve different problems.

## Questions to answer aloud

1. What joins the client bundle after `"use client"`?
2. Can a Client Component receive server-rendered children?
3. Why can a Server Component read a database but not use `useState`?
4. Are `fetch` and `GET` Route Handlers cached by default?
5. What changes when `cacheComponents` is enabled?
6. When would you use `updateTag` instead of `revalidateTag`?
7. Why must a Server Action repeat authorization?
8. What causes a hydration mismatch?
9. Where would you put a real-time quote stream?
10. Which data must never enter a shared cache?
