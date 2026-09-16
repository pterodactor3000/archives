import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { getContext } from './integrations/tanstack-query/root-provider'

/** Must match Vite `base` (no trailing slash for TanStack Router basepath). */
const vaultBasepath = '/archives/apps/remote-learning/react-vite'

export function getRouter() {
  const context = getContext()

  const router = createTanStackRouter({
    routeTree,
    context,
    basepath: vaultBasepath,
    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
