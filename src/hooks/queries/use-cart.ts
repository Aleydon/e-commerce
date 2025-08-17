import { useQuery } from '@tanstack/react-query';

import { getCart } from '@/actions/get-cart';

export const getUseCartQueryKey = () => ['cart'] as const;

export function useCart(initialData?: Awaited<ReturnType<typeof getCart>>) {
  return useQuery({
    queryKey: getUseCartQueryKey(),
    queryFn: () => getCart(),
    initialData: initialData
  });
}
