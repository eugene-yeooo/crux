export interface CaveLog {
  logId: number
  objectiveName: string
  caveDate: number
  tripCompanions: string
  caveLocation: string
  tripDuration: number
  tripNotes: string
}

export interface User {
  id: number
  name: string
  username: string
  email: string
  avatar_url?: string
  bio?: string
  country: string
}

export interface Log {
  username: string
  avatar_url?: string | undefined
  media: [{
    caption: string,
    type: string,
    url: string,
  }]
  notes: string
  details: any
  objectiveName: string
  id: number
  user_id: number
  type: 'climb' | 'canyon' | 'cave' | 'dive'
  title: string
  description?: string
  location?: string
  date: string
  grade?: string | number
}

export interface Props {
  userId: number
}

export interface ProfileDetails {
  user: {
    name: string
    username: string
    avatar_url?: string
    bio?: string
  }
}
