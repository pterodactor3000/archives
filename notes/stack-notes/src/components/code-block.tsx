import { cn } from "cn";

export function CodeBlock({
  filename,
  source,
  className,
}: {
  filename: string;
  source: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10",
        className
      )}
    >
      <figcaption className="border-b bg-muted/50 px-3 py-2 font-mono text-xs text-muted-foreground">
        {filename}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className="font-mono">{source}</code>
      </pre>
    </figure>
  );
}
