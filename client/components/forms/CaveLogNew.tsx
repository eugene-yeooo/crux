import CaveLogForm from './CaveLogForm'
import { useCreateLog } from '../../hooks/api'
import { CaveLogFormData, NewMedia } from '../../models/models'



export default function LogCave() {
  const createLog = useCreateLog()

  const handleCreate = async (formData: CaveLogFormData, mediaFiles: NewMedia[]) => {
    // Prepare FormData to send files + JSON data
    const data = new FormData()

    // Compose your core + cave + media structure matching backend expectations
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

    const media = mediaFiles.map(({ file, caption }) => {
      const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
      const isImage =
        file.type.startsWith('image') ||
        ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)

      return {
        url: '',
        type: isImage ? 'photo' : 'video',
        caption: caption ?? null,
      }
    })


    // JSON data as a single stringified field
    data.append('data', JSON.stringify({ core, cave, media }))

    // Append each file for multer to process
    mediaFiles.forEach(({file}) => data.append('media', file))

    // Call hook's mutateAsync to send the request
    await createLog.mutateAsync(data)
  }

  return <CaveLogForm onSubmit={handleCreate} submitLabel="Log Cave" />
}