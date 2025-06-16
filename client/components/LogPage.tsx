import { Link, useParams } from 'react-router'
import useLogById from '../hooks/use-logById'
import { useEffect } from 'react'

export default function LogPage() {
  const { username, logId } = useParams()
  const { data: log, isLoading, error } = useLogById(username!, Number(logId))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const labelStyle = 'font-semibold'

  if (isLoading) return <p>Loading...</p>
  if (error || !log) return <p>Error loading log.</p>

  // console.log('log:', log)
  console.log('isLoading:', isLoading, 'error:', error, 'log:', log)

  return (
    <div className="relative rounded-lg shadow p-6 bg-white space-y-2 max-w-4xl mx-auto">
      {/* Header */}
      
        <div className='mb-6'>
          <h1 className="text-2xl font-bold">{log.objectiveName}</h1>
          {log.title && <p className="text-md text-gray-800 italic">{log.title}</p>}
          <p className="text-gray-600">{log.location}</p>
          <p className="text-sm text-gray-500">{log.date}</p>
        </div>
        
       {/* User info  */}
        <div className="absolute top-0 right-6 flex items-center gap-4 px-4 py-3">
          <div className="text-right leading-tight">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Logged by</p>
            <Link to={`/user/${log.username}`} ><p className="text-sm font-semibold text-gray-800">@{log.username}</p></Link>
          </div>
          <Link to={`/user/${log.username}`} ><img
            src={log.avatar_url}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
            referrerPolicy="no-referrer"
          /></Link>
        </div>
      

      {/* Log Details */}
      {log.details && (
        <div className="border-t pt-4 mt-4 text-sm text-gray-700 space-y-2">
          {log.type === 'cave' && (
            <>
              <p><span className={labelStyle}>Team:</span> {log.details['trip-companions']}</p>
              <p><span className={labelStyle}>Duration:</span> {log.details.duration} hrs</p>
              <p><span className={labelStyle}>Route Style:</span> {log.details['route-style']}</p>
              <p><span className={labelStyle}>Technical Style: </span> 
                {Array.isArray(log.details?.['tech-style']) ? 
                log.details['tech-style'].join(', ')
                : typeof log.details?.['tech-style'] === 'string'
                  ? JSON.parse(log.details['tech-style']).join(', ')
                  : ''}
              </p>
            </>
          )}
          {log.type === 'climb' && (
            <>
              <p><span className={labelStyle}>Grade:</span> {log.details.grade}</p>
              <p><span className={labelStyle}>Style:</span> {log.details.style}</p>
              <p><span className={labelStyle}>Pitches:</span> {log.details.pitches}</p>
              <p><span className={labelStyle}>Height:</span> {log.details.height}</p>
            </>
          )}
          {log.type === 'canyon' && (
            <>
              <p><span className={labelStyle}>Grade:</span> {log.details.grade}</p>
              <p><span className={labelStyle}>Trip Companions:</span> {log.details['trip-companions']}</p>
              <p><span className={labelStyle}>Flow:</span> {log.details.flow}</p>
              <p><span className={labelStyle}>Pitches:</span> {log.details.pitches}</p>
            </>
          )}
        </div>
      )}

      {/* Notes */}
      {log.notes && (
        <p className="text-sm text-gray-700">
          <span className={labelStyle}>Notes:</span> <br /> <span className=''>{log.notes}</span>
        </p>
      )}

      <br />
      
      {/* Media */}
      {log.media && log.media.length > 0 && (
        <div className="flex flex-wrap gap-4 gap-y-10">
          {log.media.map((file, i) => (
            <div key={i} className="items-center">
              {file.type === 'photo' && (
                <img
                  src={file.url}
                  alt={file.caption || `Media ${i + 1}`}
                  className="h-96 object-cover rounded shadow"
                />
              )}
              {file.type === 'video' && (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                <video controls className="w-60 rounded shadow">
                  <source src={file.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              {file.caption && (
                <p className="font-mono text-xs italic mt-2 text-center">{file.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
