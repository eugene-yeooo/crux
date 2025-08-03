import { useForm } from 'react-hook-form'
import SubmitButton from './SubmitButton'
import MediaUpload from './MediaUpload'
import { ClimbLogFormData, ClimbLogFormProps, MediaUpdate, NewMedia } from '../../models/models'
import { useState } from 'react'


// const techStyleOptions = [
//   { value: 'SRT', label: 'SRT' },
//   { value: 'Pull-through', label: 'Pull-through' },
//   { value: 'Non-technical', label: 'Non-technical' },
// ]

const labelStyle = 'block mb-1 font-medium'
const inputStyle = 'w-full p-1.5 border rounded-md'

export default function ClimbLogForm({
  initialData,
  onSubmit,
  submitLabel = 'Log Climb',
  retainedMedia,
  setRetainedMedia,
}: ClimbLogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newMediaFiles, setNewMediaFiles] = useState<NewMedia[]>([])

  const {
    register,
    handleSubmit,
    // control,
    // formState: { errors }, // optional
  } = useForm<ClimbLogFormData>({
    defaultValues: initialData || {
      title: '',
      objective: '',
      grade: '',
      date: '',
      team: '',
      location: '',
      route_style: '',
      attempts: '',
      send: '',
      height: '',
      pitches: 1,
      notes: '',
    },
  })

  // console.log('initialData', initialData)

  const onFormSubmit = async (data: ClimbLogFormData) => {  
    setIsSubmitting(true)
    try {
      const added = newMediaFiles.map(({ file, caption }) => {
        const extension = file.name.split('.').pop()?.toLowerCase() ?? ''
        const isImage =
          file.type.startsWith('image') ||
          ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(extension)

        return {
          file,
          type: isImage ? 'image' : 'video',
          caption: caption ?? null,
        }
      })
      
      const mediaUpdate: MediaUpdate = {
        retained: retainedMedia.map(m => ({ mediaId: m.mediaId, caption: m.caption })),
        added,
      }

      // console.log(mediaUpdate)

      await onSubmit(data, mediaUpdate)
    } catch (err) {
      console.error('Error submitting form', err)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-10 mb-6">
      <h1 className="text-2xl font-bold text-brandBlack text-center mb-6">Log a Climb</h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div>
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input id="title" {...register('title')} className={inputStyle} placeholder="For different trips, same objective" />
          </div> */}

          <div>
            <label htmlFor="objectiveName" className={labelStyle}>Route Name</label>
            <input id="objectiveName" {...register('objective', { required: true })} className={inputStyle} placeholder="e.g. Ravages of Time" />
          </div>

          <div>
            <label htmlFor="grade" className={labelStyle}>Grade</label>
            <input id="grade" {...register('grade', { required: true })} className={inputStyle} placeholder="e.g. 25 / 5.12b / 7b" />
          </div>



          <div>
            <label htmlFor="route_style" className={labelStyle}>Route Style</label>
            <select id="route_style" {...register('route_style', { required: true })} className={inputStyle}>
              <option value="sport">Sport</option>
              <option value="trad">Trad</option>
              <option value="sport multi-pitch">Sport Multi-pitch</option>
              <option value="trad multi-pitch">Trad Multi-pitch</option>
              <option value="boulder">Boulder</option>
            </select>
          </div>

          <div>
            <label htmlFor="height" className={labelStyle}>Height &#40;meters&#41;</label>
            <input id="height" type="number" min={1} {...register('height', { required: true })} className={inputStyle} placeholder="e.g. 20" />
          </div>


          <div>
            <label htmlFor="date" className={labelStyle}>Date</label>
            <input id="date" type="date" {...register('date', { required: true })} className={inputStyle} />
          </div>

          <div>
            <label htmlFor="location" className={labelStyle}>Location</label>
            <input id="location" {...register('location', { required: true })} className={inputStyle} placeholder="e.g. Little Babylon" />
          </div>



          <div>
            <label htmlFor="send" className={labelStyle}>Did you send?</label>
            <select id="send" {...register('send', { required: true })} className={inputStyle}>
              <option value="👁️ Onsight">👁️ Onsight</option>
              <option value="🗲 Flash">🗲 Flash</option>
              <option value="🔴 Redpoint">🔴 Redpoint</option>
              <option value="🙃 Did not send">🙃 Did not send</option>
            </select>
          </div>

          <div>
            <label htmlFor="attempts" className={labelStyle}>Number of Attempts</label>
            <input id="attempts" type="number" min={1} {...register('attempts', { required: true })} className={inputStyle} placeholder="e.g. 5" />
          </div>



          
          <div>
            <label htmlFor="team" className={labelStyle}>Belayer&#40;s&#41;</label>
            <input id="team" {...register('team')} className={inputStyle} placeholder="Names" />
          </div>
        
        </div>

        <div>
          <label htmlFor="notes" className={labelStyle}>Notes</label>
          <textarea id="notes" {...register('notes')} rows={4} className="w-full p-2 border rounded-md resize-none" placeholder="Route description, connies, choss, etc." />
        </div>

        <MediaUpload
          labelStyle={labelStyle}
          retainedMedia={retainedMedia}
          setRetainedMedia={setRetainedMedia}
          newMediaFiles={newMediaFiles}
          setNewMediaFiles={setNewMediaFiles}
        />
        
        <div className="text-center">
          <SubmitButton loading={isSubmitting}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </div>
  )
}
