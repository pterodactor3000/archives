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
        "overflow-hidden rounded-sm border border-white/15 bg-black/90 ring-0",
        className
      )}
    >
      <figcaption className="border-b border-white/15 bg-black/80 px-3 py-2 font-mono text-xs text-muted-foreground">
        {filename}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-[#b5e853]">
        <code className="font-mono">{source}</code>
      </pre>
    </figure>
  );
}
