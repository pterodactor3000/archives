import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { groupLabels, groupOrder, topics, topicsInGroup } from "@/content/topics";

export default function HomePage() {
  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-10">
      <header className="flex flex-col gap-3">
        <Badge variant="secondary" className="w-fit">
          Headless commerce stack
        </Badge>
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          What talks to what
        </h1>
        <p className="text-base text-muted-foreground">
          Staff edit products in WooCommerce. Next.js is the public site. Hono
          takes webhooks. BullMQ does the slow work against Postgres, Redis, and
          Typesense. Docker Compose is how you run those stores on a laptop.
          pnpm is how the code is split. Zod is how you stop trusting payloads.
        </p>
      </header>

      <section className="flex flex-col gap-4" aria-labelledby="flow-heading">
        <h2 id="flow-heading" className="font-heading text-lg font-medium">
          A product update
        </h2>
        <ol className="flex flex-col gap-3">
          <li>
            <Card>
              <CardHeader>
                <CardTitle>1. WooCommerce fires a webhook</CardTitle>
                <CardDescription>
                  Someone saves a product in wp-admin. Woo POSTs a small JSON
                  body to Hono. The storefront is not in this path yet.
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>2. Hono checks the body and enqueues a job</CardTitle>
                <CardDescription>
                  Zod parses the payload. If it is valid, BullMQ writes a job to
                  Redis and Hono returns 200. Woo does not wait on Typesense.
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>3. The worker writes durable copies</CardTitle>
                <CardDescription>
                  The worker loads the full product from Woo REST, upserts
                  Postgres, upserts Typesense, then you call revalidateTag so
                  the Next.js product page rebuilds on the next visit.
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
          <li>
            <Card>
              <CardHeader>
                <CardTitle>4. Next.js serves the catalog</CardTitle>
                <CardDescription>
                  Search hits Typesense. Product pages read Postgres or a tagged
                  fetch and stay on ISR. Node.js runs all of the JS processes.
                  Compose runs the data stores.
                </CardDescription>
              </CardHeader>
            </Card>
          </li>
        </ol>
      </section>

      <Separator />

      <section className="flex flex-col gap-4" aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="font-heading text-lg font-medium">
          The notes
        </h2>
        <p className="text-sm text-muted-foreground">
          Each page covers what the tool is, how you use it in this stack, and
          what usually goes wrong.
        </p>
        <div className="flex flex-col gap-8">
          {groupOrder.map((group) => (
            <div key={group} className="flex flex-col gap-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                {groupLabels[group]}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {topicsInGroup(group).map((topic) => (
                  <Link key={topic.slug} href={`/topics/${topic.slug}`}>
                    <Card className="h-full hover:bg-muted/40">
                      <CardHeader>
                        <CardTitle>{topic.name}</CardTitle>
                        <CardDescription>{topic.oneLiner}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-sm text-muted-foreground">
        {topics.length} topics. This app is the notes, not a running shop.
      </p>
    </article>
  );
}
