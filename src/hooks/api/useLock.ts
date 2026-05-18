
import { getPeriodLocks, lockPeriod, unlockPeriod } from "@/services/lock.services"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const usePeriodLock = () => {
 const queryClient = useQueryClient()
    return useMutation({
        mutationFn: lockPeriod,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['period-locks'] });
        }
    })
};

export const useGetPeriodLocks = () => {

 return   useQuery({
        queryKey: ['period-locks'],
        queryFn: getPeriodLocks,
       select: (data) => data.data
    })
};


export const useUnlockPeriod = () => {
  const queryClient = useQueryClient();
    return useMutation({
        mutationFn: unlockPeriod,
        onSuccess:() => queryClient.invalidateQueries({queryKey: ['period-locks']})
    })
}