import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import SubmitButton from './SubmitButton'
import MediaUpload from './MediaUpload'
import { CaveLogFormData } from '../../models/models'
import { useState } from 'react'

type CaveLogFormProps = {
  initialData?: Partial<CaveLogFormData>
  onSubmit: (formData: CaveLogFormData, mediaFiles: File[]) => Promise<void>
  submitLabel?: string
}

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
}: CaveLogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaFiles, setMediaFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    control,
    // formState: { errors }, // optional
  } = useForm<CaveLogFormData>({
    defaultValues: initialData || {
      title: '',
      objectiveName: '',
      date: '',
      companions: '',
      location: '',
      technicalStyle: [],
      routeStyle: 'throughTrip',
      duration: '',
      notes: '',
    },
  })

  // console.log('initialData', initialData)

  const onFormSubmit = async (data: CaveLogFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data, mediaFiles)
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
            <input id="objectiveName" {...register('objectiveName', { required: true })} className={inputStyle} placeholder="e.g. Harwoods Hole" />
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
            <label htmlFor="technicalStyle" className={labelStyle}>Technical Style</label>
            <Controller
              control={control}
              name="technicalStyle"
              render={({ field }) => (
                <Select
                  inputId="technicalStyle"
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
            <label htmlFor="routeStyle" className={labelStyle}>Route Style</label>
            <select id="routeStyle" {...register('routeStyle')} className={inputStyle}>
              <option value="throughTrip">Through-trip</option>
              <option value="inOut">In/Out</option>
            </select>
          </div>

          <div>
            <label htmlFor="companions" className={labelStyle}>Trip Members</label>
            <input id="companions" {...register('companions')} className={inputStyle} placeholder="Names or group" />
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

        <MediaUpload labelStyle={labelStyle} mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />

        <div className="text-center">
          <SubmitButton loading={isSubmitting}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </div>
  )
}
