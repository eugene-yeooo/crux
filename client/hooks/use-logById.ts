import { useQuery } from "@tanstack/react-query"
import request from "superagent"

const rootURL = new URL('/api/v1', document.baseURI)

export default function useLogById(username: string, logId: number) {
  return useQuery({
    queryKey: ['log', logId],
    queryFn: async () => {
      const res = await request.get(`${rootURL}/users/${username}/log/${logId}`)
      return res.body
    }
  })
}