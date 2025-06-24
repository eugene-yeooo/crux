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
  objective: logData?.objective ?? '',
  location: logData?.location ?? '',
  date: logData?.date ?? '',
  notes: logData?.notes ?? '',
  team: logData?.details?.team ?? '',
  duration: logData?.details?.duration?.toString() ?? '',
  tech_style: JSON.parse(logData?.details?.tech_style ?? '[]'),
  route_style: (logData?.details?.route_style?.toLowerCase() === 'in/out') ? 'inOut' : 'throughTrip',
}
  
  const handleUpdate = async (formData: CaveLogFormData, files: File[]) => {
    if (!logId || !logData) return

    const id = Number(logId)

    const core = {
      title: formData.title,
      objective: formData.objective,
      location: formData.location,
      date: formData.date,
      type: 'cave',
      notes: formData.notes,
    }

    const cave = {
      'team': formData.team,
      duration: formData.duration,
      'tech_style': JSON.stringify(formData.tech_style),
      'route_style': formData.route_style,
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
