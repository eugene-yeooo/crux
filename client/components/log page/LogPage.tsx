import { Link, useNavigate, useParams } from 'react-router'
import { useLogById } from '../../hooks/api'
import { useEffect, useRef, useState } from 'react'
import { format } from 'date-fns'
import { Pencil } from 'lucide-react';
import LogDropdownMenu from './DropdownLogPage';
import { useDeleteLog } from '../../hooks/api';
import ConfirmDelete from './ConfirmDelete';
import { useAuth0 } from '@auth0/auth0-react';

export default function LogPage() {
  const { username, logId } = useParams()
  const [logMenu, setLogMenu] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const { data: log, isLoading, error } = useLogById(username!, Number(logId))
  const menuRef = useRef<HTMLDivElement>(null)
  const labelStyle = 'font-semibold'
  const formattedDate = log && format(new Date(log.date), 'dd MMM yyyy')
  const deleteLog = useDeleteLog()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth0()
  
  const isOwner = isAuthenticated && log?.auth0_id === user?.sub //checks if user is authorized to edit log

  // console.log(log)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // handles clicking out of log dropdown menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setLogMenu(false)
      }
    }
    if (logMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [logMenu])
  
  if (isLoading) return <p>Loading...</p>
  if (error || !log) return <p>Error loading log.</p>

  const toggleMenu = () => setLogMenu(!logMenu)

  const handleDelete = () => {
    deleteLog.mutate(log.id)
    navigate(`/user/${log.username}`)
  }

  const handleCancel = () => {
    setShowConfirm(false)
    
    setLogMenu(false)
  }
  
  return (
    <div className="relative rounded-lg shadow p-6 bg-white space-y-2 max-w-6xl mx-auto">
      
      {/* Header */}
        <div className='mb-6'>
          <div className='flex'>
            <h1 className="text-2xl font-bold">{log.objective}</h1>
            
          {isOwner && (<div>
              <button onClick={toggleMenu} className="ml-3 p-1 rounded hover:bg-gray-200" aria-label='Edit log'>
                <Pencil size={20} className="text-gray-400 hover:text-black" />
              </button>
              {logMenu && <LogDropdownMenu ref={menuRef} logId={log.id} onInitDelete={() => setShowConfirm(true)} />}
            </div>)}

          </div>
          {log.title && <p className="text-md text-gray-800 italic">{log.title}</p>}
          <p className="text-gray-600 font-mono">{log.location}</p>
          <p className="text-sm text-gray-500 font-mono">{formattedDate}</p>
        </div>

      {showConfirm && (<ConfirmDelete onDelete={handleDelete} onCancel={handleCancel} />)}

        
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
        <div className="border-t pt-4 mt-4 text-sm text-gray-700 space-y-2 font-mono tracking-tighter">
          {log.type === 'cave' && (
            <>
              <p><span className={labelStyle}>Team:</span> {log.details.team}</p>
              <p><span className={labelStyle}>Duration:</span> {log.details.duration} hrs</p>
              <p><span className={labelStyle}>Route Style:</span> {log.details.route_style === 'inOut' ? 'In/Out' : 'Through-trip'}</p>
              <p><span className={labelStyle}>Technical Style: </span> 
                {Array.isArray(log.details?.tech_style) ? 
                log.details.tech_style.join(', ')
                : typeof log.details?.tech_style === 'string'
                  ? JSON.parse(log.details.tech_style).join(', ')
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
              <p><span className={labelStyle}>Trip Companions:</span> {log.details.team}</p>
              <p><span className={labelStyle}>Flow:</span> {log.details.flow}</p>
              <p><span className={labelStyle}>Pitches:</span> {log.details.pitches}</p>
            </>
          )}
        </div>
      )}

      {/* Notes */}
      {log.notes && (
        <p className="text-sm text-gray-700 font-mono tracking-tighter">
          <span className={labelStyle}>Notes:</span> <br /> <span className=''>{log.notes}</span>
        </p>
      )}

      <br />
      
      {/* Media */}
      {log.media && log.media.length > 0 && (
        <div className="flex flex-wrap gap-4 gap-y-12">
          {log.media.map((file, i) => (
            <div key={i} className="items-center">
              {file.type === 'image' && (
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
