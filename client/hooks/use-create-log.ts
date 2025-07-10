import { useAuth0 } from "@auth0/auth0-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router"
import request from "superagent"

const rootURL = new URL(`/api/v1`, document.baseURI)

export default function useCreateLog() {
  const qc = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const { username } = useParams()

  return useMutation({
    mutationFn: async (data: string | object | FormData) => {
      const token = await getAccessTokenSilently()
      const req = request.patch(`${rootURL}/create-log`).set('Authorization', `Bearer ${token}`)

      const res = data instanceof FormData
        ? await req.send(data)
        : await req.set('Content-Type', 'application/json').send(data)   
      
      return res.body.id
    },
    onSuccess: (logId: number) => {
      qc.invalidateQueries({ queryKey: ['log'] })
      navigate(`/user/${username}/log/${logId}`)
    },
    onError: (err) => {
      console.error(err, 'Create log failed')
    }
  })
}
