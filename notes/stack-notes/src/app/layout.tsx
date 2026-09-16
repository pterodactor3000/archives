import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stack notes",
    template: "%s · Stack notes",
  },
  description:
    "What each piece of a Next.js, Hono, Postgres, Redis, BullMQ, Typesense, and WooCommerce stack is, and how you actually use it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
