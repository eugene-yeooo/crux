import { useAuth0 } from "@auth0/auth0-react"
import { IfAuthenticated, IfNotAuthenticated } from "../utilities/Authenticated"
import DropdownHeader from "./DropdownHeader";
import { Link } from "react-router";

export default function Header() {
  
  const { user, loginWithRedirect } = useAuth0()

  const handleSignIn = () => {
    return loginWithRedirect()
  }
  
  return (
    <header className="relative flex items-center justify-center py-6 mb-6 bg-brandBlack z-20">
      <h1 className="text-6xl font-bold text-mono text-brandPrimary tracking-wide bg-gradient-to-l from-[#65a3a1] to-[#95a3a1] bg-clip-text text-transparent -translate-y-2">crux</h1>

      <div className="absolute items-center right-6">
        <IfAuthenticated>
           <div className="flex items-center gap-4 flex-row pr-3">
              {user && (
                <div className="flex items-center gap-3 pr-1">
                  <p className="text-white font-medium text-md">
                    {user.nickname}
                  </p>
                  
                  <Link to={`user/${user.nickname}`}>
                  <img
                    src={user.picture}
                    alt={user.given_name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full border-2 border-brandPrimary shadow"
                  /></ Link>
                  <DropdownHeader />
                </div>
              )}
            </div>
        </IfAuthenticated>
        
        <IfNotAuthenticated>
          <button
            onClick={handleSignIn}
            className="ml-auto px-5 py-2 rounded-2xl bg-gradient-to-r from-[#65a3a1] to-teal-500 text-white font-semibold shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-200"
          >
            Sign in
          </button>
        </IfNotAuthenticated>

      </div>

    </header>
  )
}
