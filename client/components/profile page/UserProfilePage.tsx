import { useState } from 'react'
import { useParams } from 'react-router'
import { useUserProfile, useUserLogs } from '../../hooks/api'
import { Log } from '../../models/models'

import ProfileDetails from './ProfileDetails'
import ProfileSummaryStats from './ProfileSummaryStats'
import NavProfileFilter from './NavProfileFilter'
import ProfileLogList from './ProfileLogList'
import NotableSends from './NotableSends'

export default function UserProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [filter, setFilter] = useState<string>('all')

  const {
    data: profileData,
    isLoading: loadingProfile,
    error: profileError,
  } = useUserProfile(username)
  
  // console.log(profileData)

  const {
    data: logData,
    isLoading: loadingLogs,
    error: logError,
  } = useUserLogs(username) 
  if (loadingProfile || loadingLogs) return <p>Loading...</p>
  if (profileError || logError) return <p>Error loading profile data.</p>

  const user = profileData?.user
  const logs: Log[] = logData?.logs ?? []

  const filteredLogs =
    filter === 'all'
      ? logs
      : logs.filter((log) => log.type === filter)

  return (
    <div>
      {user && <ProfileDetails user={user} />}
      <ProfileSummaryStats logs={logs} />
      {/* <NotableSends logs={logs} /> */}
      <NavProfileFilter selected={filter} onChange={setFilter} />
      {/* <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto my-4">
        <p className="text-center text-gray-500 font-mono">interactive map API <br />ft. log pins</p>
      </div> */}
      <ProfileLogList logs={filteredLogs} />
    </div>
  )
}
