"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { searchTopics } from "@/lib/search";
import { cn } from "cn";

export function TopicSearch({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTopics(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onValueChange={setQuery}
          placeholder="Search the stack"
          aria-label="Search the stack"
          className="pl-8"
        />
      </div>
      {searching ? (
        results.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <SearchIcon />
              </EmptyMedia>
              <EmptyTitle>No matches</EmptyTitle>
              <EmptyDescription>
                Nothing in these notes contains &quot;{query.trim()}&quot;. Try
                a tool name such as ISR, webhook, or upsert.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <ul className="flex flex-col gap-1">
            {results.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/topics/${topic.slug}`}
                  onClick={onNavigate}
                  className="block rounded-lg px-2 py-1.5 text-sm hover:bg-muted"
                >
                  <span className="font-medium">{topic.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {topic.oneLiner}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}
