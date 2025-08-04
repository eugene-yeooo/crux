import CaveLogForm from './CaveLogForm'
import { useCreateLog, useUserProfile } from '../../hooks/api'
import { CaveLogFormData, MediaUpdate, NewMedia } from '../../models/models'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'



export default function LogCave() {
  const createLog = useCreateLog()
  const [newMediaFiles, setNewMediaFiles] = useState<NewMedia[]>([])
  const { user } = useAuth0()

  const {data} = useUserProfile(user?.nickname)
  const userId = data?.user.id
  // console.log(userId)


  const handleCreate = async (formData: CaveLogFormData, mediaFiles: MediaUpdate) => {
    // Prepare FormData to send files + JSON data
    const data = new FormData()

    // Compose your core + cave + media structure matching backend expectations
    const core = {
      user_id: userId,
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

    const media = mediaFiles.added.map(({ file, caption }, index) => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      const isImage = file.type.startsWith('image') || ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)

      return {
        id: `media-${index}`, // give each item a known ID
        url: '',
        type: isImage ? 'photo' : 'video',
        caption: caption ?? null,
      }
    })

    // console.log(media)

    

    // Append each file for multer to process
    mediaFiles.added.forEach((media, index) => {
      data.append(`media-${index}`, media.file) // match the name with the ID above
    })

    // JSON data as a single stringified field
    data.append('data', JSON.stringify({ core, cave, media }))
    

    // Call hook's mutateAsync to send the request
    await createLog.mutateAsync(data)
  }

  return <CaveLogForm 
    onSubmit={handleCreate} 
    submitLabel="Log Cave" 
     retainedMedia={[]} // empty since new log has no existing media
    setRetainedMedia={() => {}} // ^same
    newMediaFiles={newMediaFiles}
    setNewMediaFiles={setNewMediaFiles}
    />
}