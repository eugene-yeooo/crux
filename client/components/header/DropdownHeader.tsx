import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Menu, Settings, LogOut } from 'lucide-react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router'

export default function HeaderDropdown() {
  const { user, logout } = useAuth0()

  const handleLogout = () => {
    logout()
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="p-1 rounded-md text-brandPrimary hover:bg-gray-100 focus:outline-none"
          aria-label="Open menu"
        >
          <Menu size={35} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 w-40 rounded border bg-white py-2 shadow-md"
          sideOffset={32.5}
          align="end"
        >
          <DropdownMenu.Item asChild>
            <Link
              to={`/user/${user?.nickname}/settings`}
              className="flex items-center px-4 py-2 text-lg hover:bg-gray-100"
            >
              <Settings size={16} className="mr-2" />
              Settings
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={handleLogout}
            className="flex items-center px-4 py-2 text-lg text-red-600 hover:bg-red-50 cursor-pointer"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
