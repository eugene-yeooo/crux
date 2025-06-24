export interface CaveLogFormData {
  title: string
  objective: string
  date: string
  team: string
  location: string
  tech_style: string[]
  route_style: string
  duration: string
  notes: string
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
  auth0_id: string
  username: string
  avatar_url?: string | undefined
  media: [{
    caption: string,
    type: string,
    url: string,
  }]
  notes: string
  details: any
  objective: string
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
