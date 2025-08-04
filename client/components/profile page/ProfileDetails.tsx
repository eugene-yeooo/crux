import { Log, User } from '../../models/models'
import ProfileSummaryStats from './ProfileSummaryStats'

export default function ProfileDetails({ user, logs }: { user: User, logs: Log[] }) {
  
  if (!user) return <div>Loading...</div>
  // console.log(user.avatar_url)
  
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6 max-w-6xl pr-10 mb-4">
      <img
        src={user.avatar_url}
        alt="avatar"
        className="w-30 h-30 rounded-full object-cover border border-gray-300"
        referrerPolicy="no-referrer"
      />
      <div>
        <h2 className="text-2xl font-semibold text-brandBlack">{user.name}</h2>
        <p className="text-gray-600 mb-2">@{user.username}</p>
        {user.country && (
          <p className="text-sm text-gray-700 mb-2">📍 {user.country}</p>
        )}
        {user.bio && <p className="text-gray-800 pb-6">{user.bio}</p>}
      </div>
      <div className='ml-auto my-auto'>
        <ProfileSummaryStats logs={logs}/>
      </div>
    </div>
  )
}
