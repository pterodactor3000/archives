import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">Welcome to react-vite</h1>
      <p className="mt-4 text-lg">
        TanStack Router SPA (static) — edit <code>src/routes/index.tsx</code> to
        get started.
      </p>
      <p className="mt-2 text-sm opacity-70">
        Hosted under <code>/archives/apps/remote-learning/react-vite/</code>
      </p>
    </div>
  )
}
