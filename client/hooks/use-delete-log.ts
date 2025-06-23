import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "superagent";

const rootURL = new URL(`/api/v1`, document.baseURI)

export default function useDeleteLog() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      await request.delete(`${rootURL}/delete-log/${id}`)
    },
    onSuccess: async () => {
      qc.invalidateQueries({ queryKey: ['userLogs']})
    }
  })
}