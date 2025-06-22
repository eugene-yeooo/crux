import { useAuth0 } from '@auth0/auth0-react'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth0()

  console.log('Auth state →', { isLoading, isAuthenticated })

  if (isLoading) return <p>Loading...</p>
  if (!isAuthenticated) return <p>Not authenticated</p>

  return <>{children}</>
}
