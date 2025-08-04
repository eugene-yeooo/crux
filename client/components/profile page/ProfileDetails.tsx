import { User } from '../../models/models'

export default function ProfileDetails({ user }: { user: User }) {
  
  if (!user) return <div>Loading...</div>
  // console.log(user.avatar_url)
  
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center gap-6 max-w-6xl mx-auto mb-6">
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
        {user.bio && <p className="text-gray-800">{user.bio}</p>}
      </div>
    </div>
  )
}
