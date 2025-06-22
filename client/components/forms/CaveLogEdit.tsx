import { useParams } from 'react-router'
import CaveLogForm from './CaveLogForm'
import { useLogById } from '../../hooks/api'

export default function EditCaveLog() {
  const { username, logId } = useParams()
  const { data: logData, isLoading } = useLogById(username!, Number(logId))

  const handleUpdate = async (formData: any, files: File[]) => {
    // TODO: PUT request to /api/cave-logs/:logId
    console.log('Updating log', logId, formData, files)
  }

  if (isLoading || !logData) return <p>Loading log...</p>

  return <CaveLogForm initialData={logData} onSubmit={handleUpdate} submitLabel="Update Log" />
}
