import { useAuth0 } from "@auth0/auth0-react"
import { IfAuthenticated, IfNotAuthenticated } from "./utilities/Authenticated"

export default function Header() {
  
  const { user, logout, loginWithRedirect } = useAuth0()

  console.log(user)

  const handleSignOut = () => {
    return logout()
  }

  const handleSignIn = () => {
    return loginWithRedirect()
  }

  const buttonStyle = "px-4 py-2 ml-auto rounded-xl bg-gradient-to-l from-[#45a3a1] to-[#95a3a1] text-brandBlack font-semibold shadow-md brightness-100 hover:brightness-125 transition"
  
  return (
    <header className="relative flex items-center justify-center py-6 mb-6 bg-brandBlack">
      <h1 className="text-6xl font-bold text-mono text-brandPrimary tracking-wide bg-gradient-to-l from-[#65a3a1] to-[#95a3a1] bg-clip-text text-transparent -translate-y-2">crux</h1>

      <div className="absolute bottom-3 right-6">
        <IfAuthenticated>
           <div className="flex items-center gap-4 flex-col">
              {user && (
                <div className="flex items-center gap-3">
                  <p className="text-white font-medium text-md">
                    {user.nickname}
                  </p>
                  <img
                    src={user.picture}
                    alt={user.given_name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full border-2 border-brandPrimary shadow"
                  />
                  
                </div>
              )}

              <button className={buttonStyle} onClick={handleSignOut}>
                Sign out
              </button>
            </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button className={buttonStyle} onClick={handleSignIn}>Sign in</button>
        </IfNotAuthenticated>
      </div>

    </header>
  )
}
