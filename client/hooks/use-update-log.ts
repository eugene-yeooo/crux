import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import request from "superagent";

const rootURL = new URL(`/api/v1`, document.baseURI)

export default function useUpdateLog() {
  const qc = useQueryClient()
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()
  const { username } = useParams()
  console.log(username)
  return useMutation({
    mutationFn: async ({id, data}: {id: number, data: string | object }) => {
      const token = await getAccessTokenSilently()
      // console.log('Access token:', token)
      await request.patch(`${rootURL}/update-log/${id}`).set('Authorization', `Bearer ${token}`).send(data)
      return id
    },
    onSuccess: (id) => {
      qc.invalidateQueries({queryKey: ['log']})
      navigate(`/user/${username}/log/${id}`)
    },
    onError: (err) => {
      console.error(err, 'Update failed')
    }
  })
}