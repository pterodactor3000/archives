import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertCircleIcon } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getTopic, topics, type Topic } from "@/content/topics";

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) {
    return { title: "Not found" };
  }
  return {
    title: topic.name,
    description: topic.oneLiner,
  };
}

export default async function TopicPage({
  params,
}: PageProps<"/topics/[slug]">) {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) {
    notFound();
  }

  const related = topic.pairsWith
    .map((relatedSlug) => getTopic(relatedSlug))
    .filter((item): item is Topic => item != null);

  return (
    <article className="mx-auto flex max-w-2xl flex-col gap-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />}>
              How they fit
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{topic.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <header className="flex flex-col gap-3">
        <h1 className="font-heading text-3xl font-medium tracking-tight">
          {topic.name}
        </h1>
        <p className="text-base text-muted-foreground">{topic.oneLiner}</p>
      </header>

      <section className="flex flex-col gap-3" aria-labelledby="what-heading">
        <h2 id="what-heading" className="font-heading text-lg font-medium">
          What it is
        </h2>
        {topic.what.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-6">
            {paragraph}
          </p>
        ))}
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="how-heading">
        <h2 id="how-heading" className="font-heading text-lg font-medium">
          How you use it
        </h2>
        <p className="text-sm leading-6">{topic.howIntro}</p>
        <ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-6">
          {topic.howSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        {topic.code ? (
          <CodeBlock filename={topic.code.filename} source={topic.code.source} />
        ) : null}
      </section>

      <section className="flex flex-col gap-3" aria-labelledby="watch-heading">
        <h2 id="watch-heading" className="font-heading text-lg font-medium">
          What goes wrong
        </h2>
        <div className="flex flex-col gap-3">
          {topic.watch.map((item) => (
            <Alert key={item}>
              <AlertCircleIcon />
              <AlertDescription>{item}</AlertDescription>
            </Alert>
          ))}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="flex flex-col gap-3" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-heading text-lg font-medium">
            Next to read
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((item) => (
              <Button
                key={item.slug}
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<Link href={`/topics/${item.slug}`} />}
              >
                {item.name}
              </Button>
            ))}
          </div>
        </section>
      ) : null}

      <Separator />

      <p className="text-sm text-muted-foreground">
        Official docs:{" "}
        <a
          href={topic.docsHref}
          className="underline underline-offset-4 hover:text-foreground"
        >
          {topic.docsHref.replace(/^https:\/\//, "")}
        </a>
      </p>
    </article>
  );
}
