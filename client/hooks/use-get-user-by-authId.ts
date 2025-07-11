import { useQuery } from '@tanstack/react-query'
import request from 'superagent'
import { User } from '../models/models'

const rootURL = new URL('/api/v1', document.baseURI)

export default function useGetUserByAuthId(authId: string | undefined) {
  console.log(authId)
  return useQuery({
    enabled: !!authId,
    queryKey: ['user', authId],
    queryFn: async () => {
      const res = await request.get(`${rootURL}/users/${authId}`)
      return res.body as { user: User }
    },
  })
}
