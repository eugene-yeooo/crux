import { Link } from "react-router"

export default function LogCard({ log }) {
  
  const labelStyle = 'font-semibold'

  console.log(log.media)
  
  return (
    <div className="rounded-lg shadow p-4 bg-white space-y-1">
      <Link to={`/user/${log.username}/log/${log.id}`}><h3 className="text-xl font-bold">{log.objectiveName}</h3></Link>
      {log.title && <p className="text-md text-gray-800 italic">{log.title}</p>}
      <p>{log.location}</p>
      <p className="text-sm">{log.date}</p>
      
       
      

      {/* Subtable-specific details */}
      {log.details && (
        <div className="text-sm text-gray-700 space-y-1">
          {log.type === 'cave' && (
            <>
              <p><span className={labelStyle}>Team:</span> {log.details['trip-companions']}</p>
              
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

          {/* {log.type === 'alpine' && (
            <>

            </>
          )}

          {log.type === 'dive' && (
            <>
            </>
          )} */}
        </div>
      )}
      

       {/* Media files */}
      {log.media && log.media.length > 0 && (
        <div className="flex flex-wrap gap-4 mt-2">
          {log.media.slice(0, 2).map((file, i) =>
            file.type === 'photo' ? (
              <img
                key={i}
                src={file.url}
                alt={`Log media ${i + 1}`}
                className="h-96 object-cover rounded"
              />
            ) : file.type === 'video' ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <video
                key={i}
                controls
                className="w-60 rounded"
              >
                <source src={file.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : null
          )}
        </div>
      )}

    </div>
  )
}
