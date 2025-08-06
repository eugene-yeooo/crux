import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { useLogById, useUpdateLog } from '../../hooks/api'
import { ExistingMedia, MediaUpdate, NewMedia } from '../../models/models'
import CanyonLogForm from './CanyonLogForm'

export default function EditCanyonLog() {
  const { username, logId } = useParams()
  const { data: logData, isLoading } = useLogById(username!, Number(logId))
  const updateLog = useUpdateLog()

  // State for retained media (existing media user keeps)
  const [retainedMedia, setRetainedMedia] = useState<ExistingMedia[]>([])
  const [newMediaFiles, setNewMediaFiles] = useState<NewMedia[]>([])
  
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
 
  
  // Prepare initial form data, flattening nested details and tech_style parsing
  const cleanInitialData: CanyonLogFormData = {
    title: logData?.title ?? '',
    objective: logData?.objective ?? '',
    location: logData?.location ?? '',
    date: logData?.date ?? '',
    notes: logData?.notes ?? '',
    team: logData?.details?.team ?? '',
    media: retainedMedia, // media is handled separately via retainedMedia state and new files
    grade: logData?.details.grade ?? '',

  }

  const handleUpdate = async (formData: CanyonLogFormData, mediaFiles: MediaUpdate) => {
    if (!logId || !logData) return
    const form = new FormData()
    const id = Number(logId)

    const core = {
      title: formData.title,
      objective: formData.objective,
      location: formData.location,
      date: formData.date,
      type: 'canyon',
      notes: formData.notes,
    }

    const canyon = {
      grade: formData.grade,    
      team: formData.team,
      pitches: formData.pitches,      
    }
    

    form.append('data', JSON.stringify({ core, canyon, media: { retained: mediaFiles.retained, added: mediaFiles.added } }))
    
    mediaFiles.added.forEach((fileWrapper) => {
      form.append('media', fileWrapper.file) 
    })
    
    await updateLog.mutateAsync({ id, data: form })

    console.log('Updating log', logId, formData, mediaFiles)
  }


  if (isLoading || !logData) return <p>Loading log...</p>

  return (
    <CanyonLogForm
      initialData={cleanInitialData}
      onSubmit={handleUpdate}
      submitLabel="Update Log"
      retainedMedia={retainedMedia}
      setRetainedMedia={setRetainedMedia}
      newMediaFiles={newMediaFiles}
      setNewMediaFiles={setNewMediaFiles}
    />
  )
}
