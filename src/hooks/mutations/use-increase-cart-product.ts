import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addProductsToCart } from '@/actions/add-cart-product';

import { getUseCartQueryKey } from '../queries/use-cart';

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ['increase-cart-product-quantity', productVariantId] as const;

export function useIncreaseCartProduct(productVariantId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () => addProductsToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
    }
  });
}
