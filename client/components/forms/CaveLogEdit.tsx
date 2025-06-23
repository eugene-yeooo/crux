import { useParams } from 'react-router'
import CaveLogForm from './CaveLogForm'
import { useLogById, useUpdateLog } from '../../hooks/api'
import { CaveLogFormData } from '../../models/models'

export default function EditCaveLog() {
  const { username, logId } = useParams()
  const { data: logData, isLoading } = useLogById(username!, Number(logId))
  const updateLog = useUpdateLog()

  // flatten log object before passing into form
  const cleanInitialData: CaveLogFormData = {
  title: logData?.title ?? '',
  objectiveName: logData?.objectiveName ?? '',
  location: logData?.location ?? '',
  date: logData?.date ?? '',
  notes: logData?.notes ?? '',
  companions: logData?.details?.['trip-companions'] ?? '',
  duration: logData?.details?.duration?.toString() ?? '',
  technicalStyle: JSON.parse(logData?.details?.['tech-style'] ?? '[]'),
  routeStyle: (logData?.details?.['route-style']?.toLowerCase() === 'in/out') ? 'inOut' : 'throughTrip',
}
  
  const handleUpdate = async (formData: CaveLogFormData, files: File[]) => {
    if (!logId || !logData) return

    const id = Number(logId)

    const core = {
      title: formData.title,
      objectiveName: formData.objectiveName,
      location: formData.location,
      date: formData.date,
      type: 'cave',
      notes: formData.notes,
    }

    const cave = {
      'trip-companions': formData.companions,
      duration: formData.duration,
      'tech-style': JSON.stringify(formData.technicalStyle),
      'route-style': formData.routeStyle,
    }

    await updateLog.mutateAsync({
      id: id, 
      data: { core, cave }
    })

    console.log('Updating log', logId, formData, files)
  }

  if (isLoading || !logData) return <p>Loading log...</p>

  return <CaveLogForm initialData={cleanInitialData} onSubmit={handleUpdate} submitLabel="Update Log" />
}
