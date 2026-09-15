"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TopicNav } from "@/components/topic-nav";
import { TopicSearch } from "@/components/topic-search";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background px-4 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={<Button variant="outline" size="icon-sm" />}
        >
          <MenuIcon />
          <span className="sr-only">Open topic list</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="border-b">
            <SheetTitle>Stack notes</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-4.5rem)]">
            <div className="flex flex-col gap-4 p-4">
              <TopicSearch onNavigate={() => setOpen(false)} />
              <TopicNav onNavigate={() => setOpen(false)} />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      <Link href="/" className="font-heading text-sm font-medium">
        Stack notes
      </Link>
    </header>
  );
}
