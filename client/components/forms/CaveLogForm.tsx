import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import SubmitButton from './SubmitButton'
import MediaUpload from './MediaUpload'
import { CaveLogFormData, CaveLogFormProps, ExistingMedia, NewMedia } from '../../models/models'
import { useState } from 'react'


const techStyleOptions = [
  { value: 'SRT', label: 'SRT' },
  { value: 'Pull-through', label: 'Pull-through' },
  { value: 'Cave Dive', label: 'Cave Dive' },
  { value: 'Non-technical', label: 'Non-technical' },
]

const labelStyle = 'block mb-1 font-medium'
const inputStyle = 'w-full p-1.5 border rounded-md'

export default function CaveLogForm({
  initialData,
  onSubmit,
  submitLabel = 'Log Cave',
  retainedMedia,
  setRetainedMedia,
}: CaveLogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newMediaFiles, setNewMediaFiles] = useState<NewMedia[]>([])
  // const [retainedMedia, setRetainedMedia] = useState<ExistingMedia[]>(
  // Array.isArray(initialData?.media) && initialData.media.every((m) => 'mediaId' in m)
  //   ? (initialData.media as ExistingMedia[])
  //   : []
  // ) // checks that media is an array and that every item has a media ID
console.log(initialData)

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }, // optional
  } = useForm<CaveLogFormData>({
    defaultValues: initialData || {
      title: '',
      objective: '',
      date: '',
      team: '',
      location: '',
      tech_style: [],
      route_style: 'throughTrip',
      duration: '',
      notes: '',
    },
  })

  // console.log('initialData', initialData)

  const onFormSubmit = async (data: CaveLogFormData) => {  
    setIsSubmitting(true)
    try {
      await onSubmit(data, {
        retained: retainedMedia.map((m) => ({ mediaId: m.mediaId })),
        added: newMediaFiles.map((media) => ({
          file: media.file,
          type: media.file.type.startsWith('image') ? 'photo' : 'video',
          caption: media.caption ?? null,
        })),
      })
    } catch (err) {
      console.error('Error submitting form', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-10 mb-6">
      <h1 className="text-2xl font-bold text-brandBlack text-center mb-6">Log a Cave</h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input id="title" {...register('title')} className={inputStyle} placeholder="For different trips, same objective" />
          </div>

          <div>
            <label htmlFor="objectiveName" className={labelStyle}>Cave Name</label>
            <input id="objectiveName" {...register('objective', { required: true })} className={inputStyle} placeholder="e.g. Harwoods Hole" />
          </div>

          <div>
            <label htmlFor="date" className={labelStyle}>Date</label>
            <input id="date" type="date" {...register('date', { required: true })} className={inputStyle} />
          </div>

          <div>
            <label htmlFor="location" className={labelStyle}>Location</label>
            <input id="location" {...register('location', { required: true })} className={inputStyle} placeholder="e.g. Golden Bay" />
          </div>

          <div>
            <label htmlFor="tech_style" className={labelStyle}>Technical Style</label>
            <Controller
              control={control}
              name="tech_style"
              render={({ field }) => (
                <Select
                  inputId="tech_style"
                  {...field}
                  isMulti
                  options={techStyleOptions}
                  classNamePrefix="select"
                  value={techStyleOptions.filter(opt => field.value?.includes(opt.value))}
                  onChange={selected => field.onChange(selected.map(opt => opt.value))}
                />
              )}
            />
          </div>

          <div>
            <label htmlFor="route_style" className={labelStyle}>Route Style</label>
            <select id="route_style" {...register('route_style')} className={inputStyle}>
              <option value="throughTrip">Through-trip</option>
              <option value="inOut">In/Out</option>
            </select>
          </div>

          <div>
            <label htmlFor="team" className={labelStyle}>Trip Members</label>
            <input id="team" {...register('team')} className={inputStyle} placeholder="Names or group" />
          </div>

          <div>
            <label htmlFor="duration" className={labelStyle}>Duration (hours)</label>
            <input id="duration" type="number" min={1} {...register('duration', { required: true })} className={inputStyle} placeholder="e.g. 5" />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelStyle}>Trip Notes</label>
          <textarea id="notes" {...register('notes')} rows={4} className="w-full p-2 border rounded-md resize-none" placeholder="Route description, entrance name, SRT, etc." />
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
