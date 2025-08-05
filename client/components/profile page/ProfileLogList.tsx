import { Log } from '../../models/models'
import LogCard from '../LogCard'

export default function LogList({ logs }: { logs: Log[] }) {
  if (logs.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-6xl mx-auto my-2">
        <p className="text-center text-gray-500 my-16">No logs yet.</p>
      </div>
    )
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {logs.map(log => (
         <div key={log.id} className="break-inside-avoid mb-4">
          <LogCard log={log} />
        </div>
      ))}
    </div>
  )
}
