"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { groupLabels, groupOrder, topicsInGroup } from "@/content/topics";

export function TopicNav({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Stack topics" className={cn("flex flex-col gap-5", className)}>
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href="/" />}
          onClick={onNavigate}
          className={cn(
            "w-full justify-start",
            pathname === "/" && "bg-muted"
          )}
        >
          How they fit
        </Button>
      </div>
      {groupOrder.map((group) => (
        <div key={group} className="flex flex-col gap-1">
          <p className="px-2.5 text-xs font-medium text-muted-foreground">
            {groupLabels[group]}
          </p>
          {topicsInGroup(group).map((topic) => {
            const href = `/topics/${topic.slug}`;
            const active = pathname === href;
            return (
              <Button
                key={topic.slug}
                variant="ghost"
                size="sm"
                nativeButton={false}
                render={<Link href={href} />}
                onClick={onNavigate}
                className={cn("w-full justify-start", active && "bg-muted")}
              >
                {topic.name}
              </Button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
