import { useForm } from 'react-hook-form'
import SubmitButton from './SubmitButton'
import MediaUpload from './MediaUpload'
import { ClimbLogFormData, ClimbLogFormProps, MediaUpdate } from '../../models/models'
import { useState } from 'react'

const labelStyle = 'block mb-1 font-medium'
const inputStyle = 'w-full p-1.5 border rounded-md'

export default function CanyonLogForm({
  initialData,
  onSubmit,
  submitLabel,
  retainedMedia,
  setRetainedMedia,
  newMediaFiles,
  setNewMediaFiles,
}: ClimbLogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      pitches: 0,
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
      <h1 className="text-2xl font-bold text-brandBlack text-center mb-6">Log a Canyon</h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div>
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input id="title" {...register('title')} className={inputStyle} placeholder="For different trips, same objective" />
          </div> */}

          <div>
            <label htmlFor="objectiveName" className={labelStyle}>Canyon Name</label>
            <input id="objectiveName" {...register('objective', { required: true })} className={inputStyle} placeholder="e.g. Wilson's Creek" />
          </div>

          <div>
            <label htmlFor="grade" className={labelStyle}>Grade</label>
            <input id="grade" {...register('grade', { required: true })} className={inputStyle} placeholder="e.g. V5A4" />
          </div>

          <div>
            <label htmlFor="date" className={labelStyle}>Date</label>
            <input id="date" type="date" {...register('date', { required: true })} className={inputStyle} />
          </div>

          <div>
            <label htmlFor="location" className={labelStyle}>Location</label>
            <input id="location" {...register('location', { required: true })} className={inputStyle} placeholder="e.g. Haast Pass" />
          </div>

                    <div>
            <label htmlFor="team" className={labelStyle}>Team</label>
            <input id="team" {...register('team')} className={inputStyle} placeholder="Names" />
          </div>
       
          <div>
            <label htmlFor="pitches" className={labelStyle}>Pitches</label>
            <input id="pitches" type="number" min={1} {...register('pitches', { required: true })} className={inputStyle} />
          </div>

        </div>

        

        <div>
          <label htmlFor="notes" className={labelStyle}>Notes</label>
          <textarea id="notes" {...register('notes')} rows={4} className="w-full p-2 border rounded-md resize-none" placeholder="Route description, flow level, anchor conditions, etc." />
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
