import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Link } from 'react-router'
import { Edit3, Trash2, Pencil } from 'lucide-react'
import { forwardRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  logId: number
  logType: string
  onInitDelete: () => void
}

function LogDropdownMenu({ logId, logType, onInitDelete }: Props, ref: React.Ref<HTMLDivElement>) {
  
  const { user } = useAuth0()
  
  return (
    <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="p-1 translate-x-2 translate-y-0.5 rounded-md text-brandPrimary hover:bg-gray-100 focus:outline-none"
              aria-label="Open menu"
            >
              <Pencil size={20} className="text-gray-400 hover:text-black" />
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
            to={`/user/${user?.nickname}/log/${logId}/edit-${logType}`}
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          >
            <Edit3 size={16} className="mr-2" /> Edit Log
          </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item
              >
          <button
            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
            onClick={onInitDelete}
          >
            <Trash2 size={16} className="mr-2" /> Delete
          </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
  )
}

export default forwardRef(LogDropdownMenu)