import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClientProvider } from '@tanstack/react-query'

import { getRouter } from './router'
import './styles.css'

const router = getRouter()
const { queryClient } = router.options.context

const rootEl = document.getElementById('root')
if (!rootEl) {
  throw new Error('Missing #root')
}

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
