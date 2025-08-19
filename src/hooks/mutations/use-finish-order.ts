import { useMutation, useQueryClient } from '@tanstack/react-query';

import { finishOderSchema } from '@/actions/finish-order';

export const getUseFinishOrderMutationKey = () => ['finish-order'] as const;

export function useFinishOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
      await finishOderSchema();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
}
