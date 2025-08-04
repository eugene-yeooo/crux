import { Link } from "react-router"
import { format } from 'date-fns'
import { Key } from "react"

export default function LogCard({ log }) {
  
  const labelStyle = 'font-semibold'

  // console.log(log.media)

  
  const formattedDate = format(new Date(log.date), 'dd MMM yyyy')
  
  return (
    <div className="rounded-lg shadow p-4 bg-white space-y-1 max-w-80">
      <Link to={`/user/${log.username}/log/${log.id}`}><h3 className="text-xl font-bold">{log.objective}</h3></Link>
      {log.title && <p className="text-md text-gray-800 italic">{log.title}</p>}
      <p className="font-mono tracking-tight">{log.location}</p>
      <p className="text-sm font-mono ">{formattedDate}</p>
      
       
      

      {/* Subtable-specific details */}
      {log.details && (
        <div className="text-sm text-gray-700 space-y-1">
          {log.type === 'cave' && (
            <>
              <p><span className={labelStyle}>Team:</span> {log.details.team}</p>
            </>
          )}

          {log.type === 'climb' && (
            <>
              <p><span className={labelStyle}>Grade:</span> {log.details.grade}</p>
              {/* <p><span className={labelStyle}>Style:</span> {log.details.style}</p>
              <p><span className={labelStyle}>Pitches:</span> {log.details.pitches}</p>
              <p><span className={labelStyle}>Height:</span> {log.details.height}</p> */}
            </>
          )}

          {log.type === 'canyon' && (
            <>
              <p><span className={labelStyle}>Grade:</span> {log.details.grade}</p>
              <p><span className={labelStyle}>Trip Companions:</span> {log.details.team}</p>
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
        <div className="flex flex-wrap gap-4 mt-2 pt-2">
          {log.media.slice(0, 2).map((file: { type: string; url: string | undefined }, i: Key | null | undefined) =>
            file.type === 'image' ? (
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
