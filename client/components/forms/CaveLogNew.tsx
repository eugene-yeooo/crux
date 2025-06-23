import CaveLogForm from './CaveLogForm'

export default function LogCave() {
  const handleCreate = async (formData: any, files: File[]) => {
    // TODO: POST request
    console.log('Creating new log', formData, files)
  }

  return <CaveLogForm onSubmit={handleCreate} submitLabel="Log Cave" />
}