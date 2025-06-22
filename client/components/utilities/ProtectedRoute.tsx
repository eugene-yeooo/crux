import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

// this component is used to protected pages/components against unauthenticated users

export default function ProtectedRoute({ children }: {children: React.ReactNode}) {
  const { isAuthenticated, isLoading } = useAuth0()

  const navigate = useNavigate()

  // redirect unauthenticated users
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true }) // loginWithRedirect() to go straight to Auth0

    }
  }, [isAuthenticated, isLoading, navigate])

  // while loading, render nothing or a spinner
  if (isLoading) {
    return <p>Loading...</p>
  }

  // // Prevent flashing component while redirecting
  // if (!isAuthenticated) {
  //   return <p>Loading...</p>
  // }

  // if authenticated, render the protected page (protected component is passed as children param)
  return <>{children}</>
}