import { useAuth0 } from "@auth0/auth0-react"
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated"

export default function Header() {
  
  const { user, logout, loginWithRedirect } = useAuth0()

  console.log(user)

  const handleSignOut = () => {
    return logout()
  }

  const handleSignIn = () => {
    return loginWithRedirect()
  }

  const buttonStyle = "opacity-0 translate-y-5 px-6 py-3 rounded-xl bg-gradient-to-l from-[#45a3a1] to-[#95a3a1] text-brandBlack font-semibold shadow-md hover:brightness-125 transition"
  
  return (
    <header className="relative flex items-center justify-center py-6 mb-6 bg-brandBlack">
      <h1 className="text-6xl font-bold text-mono text-brandPrimary tracking-wide bg-gradient-to-l from-[#65a3a1] to-[#95a3a1] bg-clip-text text-transparent -translate-y-2">crux</h1>

      <div className="absolute top-32">
        <IfAuthenticated>
          <button className={buttonStyle} onClick={handleSignOut}>Sign out</button>
          {user && (
            <img
              src={user?.picture}
              alt={user?.given_name}
              referrerPolicy="no-referrer"
            />
          )}
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button className={buttonStyle} onClick={handleSignIn}>Sign in</button>
        </IfNotAuthenticated>
      </div>

    </header>
  )
}
