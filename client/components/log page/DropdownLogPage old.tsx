import { Link } from 'react-router'
import { Edit3, Trash2 } from 'lucide-react'
import { forwardRef } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  logId: number
  onInitDelete: () => void
}

function LogDropdownMenu({ logId, onInitDelete }: Props, ref: React.Ref<HTMLDivElement>) {
  
  const { user } = useAuth0()
  
  return (
    <div ref={ref} className="absolute top-6 left-64 bg-white border shadow rounded w-40 py-2">
      <Link
        to={`/user/${user?.nickname}/log/${logId}/edit`}
        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
      >
        <Edit3 size={16} className="mr-2" /> Edit Log
      </Link>
      <button
        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
        onClick={onInitDelete}
      >
        <Trash2 size={16} className="mr-2" /> Delete
      </button>
    </div>
  )
}

export default forwardRef(LogDropdownMenu)