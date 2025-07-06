import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import CaveLogForm from './CaveLogForm'
import { useLogById, useUpdateLog } from '../../hooks/api'
import { CaveLogFormData, ExistingMedia, MediaUpdate } from '../../models/models'

export default function EditCaveLog() {
  const { username, logId } = useParams()
  const { data: logData, isLoading } = useLogById(username!, Number(logId))
  const updateLog = useUpdateLog()

  // State for retained media (existing media user keeps)
  const [retainedMedia, setRetainedMedia] = useState<ExistingMedia[]>([])
  
  
  // Initialize retained media once logData is loaded
  useEffect(() => {
  if (logData?.media && Array.isArray(logData.media)) {
    const formatted = logData.media.map((m) => ({
      mediaId: m.mediaId,
      url: m.url,
      type: m.type,
      caption: m.caption ?? null,
    }))
    setRetainedMedia(formatted)
  }
}, [logData])

  console.log(retainedMedia)
 
  
  // Prepare initial form data, flattening nested details and tech_style parsing
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
    media: retainedMedia, // media is handled separately via retainedMedia state and new files
  }

  const handleUpdate = async (formData: CaveLogFormData, mediaFiles: MediaUpdate) => {
    if (!logId || !logData) return
    const form = new FormData()
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
      team: formData.team,
      duration: formData.duration,
      tech_style: JSON.stringify(formData.tech_style),
      route_style: formData.route_style,
    }

     const added = mediaFiles.added.map((file) => ({
      url: '', // Don't assign URL yet — server/cloudinary will handle it
      type: file.type.startsWith('image') ? 'photo' : 'video',
      caption: file.caption ?? null,
    }))

    form.append('data', JSON.stringify({ core, cave, media: { retained: mediaFiles.retained, added } }))
    mediaFiles.added.forEach((file) => {
      form.append('media', file) // field name matches multer config
    })

    await updateLog.mutateAsync({ id, data: form })

    // console.log('Updating log', logId, formData, mediaFiles)
  }


  if (isLoading || !logData) return <p>Loading log...</p>

  return (
    <CaveLogForm
      initialData={cleanInitialData}
      onSubmit={handleUpdate}
      submitLabel="Update Log"
      retainedMedia={retainedMedia}
      setRetainedMedia={setRetainedMedia}
    />
  )
}
