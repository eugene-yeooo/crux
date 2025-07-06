import { MediaUploadProps } from "../../models/models"

export default function MediaUpload({
  labelStyle,
  retainedMedia,
  setRetainedMedia,
  newMediaFiles,
  setNewMediaFiles,
}: MediaUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesWithCaptions = Array.from(e.target.files).map((file) => ({
        file,
        caption: '',
      }))
      setNewMediaFiles([...newMediaFiles, ...filesWithCaptions])
    }
  }

  const handleRemoveRetained = (index: number) => {
    const updated = [...retainedMedia]
    updated.splice(index, 1)
    setRetainedMedia(updated)
  }

  const handleRemoveNew = (index: number) => {
    const updated = [...newMediaFiles]
    updated.splice(index, 1)
    setNewMediaFiles(updated)
  }

  const handleRetainedCaptionChange = (index: number, value: string) => {
    const updated = [...retainedMedia]
    updated[index].caption = value
    setRetainedMedia(updated)
  }

  const handleNewCaptionChange = (index: number, value: string) => {
    const updated = [...newMediaFiles]
    updated[index] = { ...updated[index], caption: value }
    setNewMediaFiles(updated)
  }

  return (
    <div>
      <label htmlFor="media" className={labelStyle}>Upload Media</label>
      <input
        type="file"
        id="media"
        name="media"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="w-full p-2 border rounded-md bg-white"
      />

      {/* Retained Media */}
      {retainedMedia.length > 0 && (
        <div className="mt-4">
          <p className="mb-3 text-sm font-medium">Previously uploaded:</p>
          <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">

            {retainedMedia.map((media, idx) => (
              <div key={idx} className="relative">
  <div className="aspect-square w-full border rounded overflow-hidden bg-gray-100">

                  {media.type.startsWith("image") ? (
                    <img src={media.url} className="w-full h-full object-cover" />
                  ) : (
                    <video className="w-full h-full object-cover" controls muted>
                      <source src={media.url} />
                    </video>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveRetained(idx)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 text-white text-sm p-1  px-2 rounded"
                  >
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Caption"
                  className="w-full mt-1 p-1 text-sm border rounded"
                  value={media.caption ?? ''}
                  onChange={(e) => handleRetainedCaptionChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Media */}
      {newMediaFiles.length > 0 && (
        <div className="mt-4">
          <p className="mb-1 text-sm font-medium">New Uploads:</p>
          <div className="flex flex-wrap gap-3">
            {newMediaFiles.map((media, idx) => (
              <div key={idx} className="relative w-32">
                <div className="w-40 h-40 border rounded overflow-hidden bg-gray-100">
                  {media.file.type.startsWith("image") ? (
                    <img src={URL.createObjectURL(media.file)} className="w-full h-full object-cover" />
                  ) : (
                    <video className="w-full h-full object-cover" controls muted>
                      <source src={URL.createObjectURL(media.file)} />
                    </video>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveNew(idx)}
                    className="absolute top-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-bl"
                  >
                    ✕
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Caption"
                  className="w-full mt-1 p-1 text-sm border rounded"
                  value={media.caption}
                  onChange={(e) => handleNewCaptionChange(idx, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
