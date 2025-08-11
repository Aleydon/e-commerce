'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { addProductsToCart } from '@/actions/add-cart-product';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

export function AddToCartButton({
  productVariantId,
  quantity
}: AddToCartButtonProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['addProductToCart', productVariantId, quantity],
    mutationFn: () =>
      addProductsToCart({
        productVariantId,
        quantity
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });
  return (
    <Button
      className="w-full rounded-full"
      disabled={isPending}
      onClick={() => mutate()}
      size={'lg'}
      variant={'outline'}
    >
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Adicionar ao carrinho
    </Button>
  );
}
