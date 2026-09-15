import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { TopicNav } from "@/components/topic-nav";
import { TopicSearch } from "@/components/topic-search";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-background focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <SiteHeader />
      <div className="mx-auto flex w-full max-w-6xl flex-1">
        <aside className="sticky top-0 hidden h-svh w-64 shrink-0 flex-col border-r lg:flex">
          <div className="flex h-14 items-center px-4">
            <Link href="/" className="font-heading text-sm font-medium">
              Stack notes
            </Link>
          </div>
          <Separator />
          <div className="px-3 py-3">
            <TopicSearch />
          </div>
          <ScrollArea className="min-h-0 flex-1">
            <div className="px-3 pb-6">
              <TopicNav />
            </div>
          </ScrollArea>
        </aside>
        <div id="content" className="min-w-0 flex-1 px-4 py-8 sm:px-8">
          {children}
        </div>
      </div>
    </div>
  );
}
