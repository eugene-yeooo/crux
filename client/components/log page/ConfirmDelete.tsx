import { useEffect } from "react"

interface ConfirmDeleteProps {
  onDelete: () => void
  onCancel: () => void
}

export default function ConfirmDelete({ onDelete, onCancel }: ConfirmDeleteProps) {
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel()
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCancel()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onCancel])
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleBackdropClick}>
      <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
        <p>Are you sure you want to delete this log?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 border rounded hover:bg-brandPrimary hover:text-white">
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-600 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
