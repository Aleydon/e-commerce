import { useMutation, useQueryClient } from '@tanstack/react-query';

import { decreaseProductFromCart } from '@/actions/decrease-cart-product';

import { getUseCartQueryKey } from '../queries/use-cart';

export const getDecreaseProductFromCart = (cartItemId: string) =>
  ['decrease-cart-product-quantity', cartItemId] as const;

export function useDecreaseCartProduct(cartItemId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getDecreaseProductFromCart(cartItemId),
    mutationFn: () => decreaseProductFromCart({ cartItemId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    }
  });
}
