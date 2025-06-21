import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider } from 'react-router/dom'
// import { createBrowserRouter } from 'react-router'
import router from './router.tsx'
import { Auth0Provider } from '@auth0/auth0-react'

const queryClient = new QueryClient()

// const router = createBrowserRouter(routes)

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <Auth0Provider
    domain="crux.au.auth0.com"
    clientId="PlQMbOl16o8EuHUpHF7O0tgbrSedvYSb"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: 'https://crux/api',
    }}
  >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </Auth0Provider>,
)
})