import { useState } from 'react'
import Select from 'react-select'
import SubmitButton from './SubmitButton'
import MediaUpload from './MediaUpload'
import { CaveLogFormData } from '../../models/models'

type CaveLogFormProps = {
  initialData?: Partial<CaveLogFormData>
  onSubmit: (formData: CaveLogFormData, mediaFiles: File[]) => Promise<void>
  submitLabel?: string
}

export default function CaveLogForm({
  initialData,
  onSubmit,
  submitLabel = 'Log Cave',
}: CaveLogFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState(() => ({
    title: initialData?.title || '',
    objectiveName: initialData?.objectiveName || '',
    date: initialData?.date || '',
    companions: initialData?.companions || '',
    location: initialData?.location || '',
    technicalStyle: initialData?.technicalStyle || [''],
    routeStyle: initialData?.routeStyle || 'throughTrip',
    duration: initialData?.duration || '',
    notes: initialData?.notes || '',
  }))

  const [mediaFiles, setMediaFiles] = useState<File[]>([])

  const techStyleOptions = [
  { value: 'SRT', label: 'SRT' },
  { value: 'Pull-through', label: 'Pull-through' },
  { value: 'Cave Dive', label: 'Cave Dive' },
  { value: 'Non-technical', label: 'Non-technical' },
]

  const labelStyle = 'block mb-1 font-medium'
  const inputStyle = 'w-full p-1.5 border rounded-md'

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit(formState, mediaFiles)
    } catch (error) {
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-10 mb-6">
      <h1 className="text-2xl font-bold text-brandBlack text-center mb-6">Log a Cave</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="title" className={labelStyle}>Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              className={inputStyle}
              placeholder="For different trips, same objective"
            />
          </div>

          <div>
            <label htmlFor="objectiveName" className={labelStyle}>Cave Name</label>
            <input
              type="text"
              id="objectiveName"
              name="objectiveName"
              value={formState.objectiveName}
              onChange={handleChange}
              className={inputStyle}
              placeholder="e.g. Harwoods Hole"
              required
            />
          </div>

          <div>
            <label htmlFor="date" className={labelStyle}>Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          <div>
            <label htmlFor="location" className={labelStyle}>Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formState.location}
              onChange={handleChange}
              className={inputStyle}
              placeholder="e.g. Golden Bay"
              required
            />
          </div>

          <div>
            <label htmlFor="technicalStyle" className={labelStyle}>Technical Style</label>
            <Select
              isMulti
              inputId="technicalStyle"
              name="technicalStyle"
              options={techStyleOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={techStyleOptions.filter(opt => formState.technicalStyle.includes(opt.value))}
              onChange={(selectedOptions) =>
                setFormState(prev => ({
                  ...prev,
                  technicalStyle: selectedOptions.map(opt => opt.value),
                }))
              }
            />

          </div>

          <div>
            <label htmlFor="routeStyle" className={labelStyle}>Route Style</label>
            <select
              id="routeStyle"
              name="routeStyle"
              value={formState.routeStyle}
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="throughTrip">Through-trip</option>
              <option value="inOut">In/Out</option>
            </select>
          </div>

          <div>
            <label htmlFor="companions" className={labelStyle}>Trip Members</label>
            <input
              type="text"
              id="companions"
              name="companions"
              value={formState.companions}
              onChange={handleChange}
              className={inputStyle}
              placeholder="Names or group"
            />
          </div>

          <div>
            <label htmlFor="duration" className={labelStyle}>Duration (hours)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formState.duration}
              onChange={handleChange}
              className={inputStyle}
              placeholder="e.g. 5"
              min={1}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="notes" className={labelStyle}>Trip Notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            value={formState.notes}
            onChange={handleChange}
            className="w-full p-2 border rounded-md resize-none"
            placeholder="Route description, entrance name, SRT, etc."
          />
        </div>

        <MediaUpload labelStyle={labelStyle} mediaFiles={mediaFiles} setMediaFiles={setMediaFiles} />

        <div className="text-center">
          <SubmitButton loading={isSubmitting}>{submitLabel}</SubmitButton>
        </div>
      </form>
    </div>
  )
}
