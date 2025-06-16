import { Log } from '../../models/models'
import LogCard from '../LogCard'

export default function LogList({ logs }: { logs: Log[] }) {
  if (logs.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-2">
        <p className="text-center text-gray-500">No logs yet.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {logs.map(log => (
        <LogCard key={log.id} log={log} />
      ))}
    </div>
  )
}
