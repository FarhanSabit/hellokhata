import { updateUser } from "@/services/settings.services"
import { useMutation } from "@tanstack/react-query"

export const useUpdateUser = () => {
    return useMutation({
        mutationFn: updateUser,
    })
}