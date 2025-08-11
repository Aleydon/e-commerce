import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Minus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

import { addProductsToCart } from '@/actions/add-cart-product';
import { decreaseProductFromCart } from '@/actions/decrease-cart-product';
import { removeProductFromCart } from '@/actions/remove-cart-product';
import { formatCentsToBRL } from '@/helpers/money';

import { Button } from '../ui/button';

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity
}: CartItemProps) {
  const queryClient = useQueryClient();

  const removeProductFromCartMutation = useMutation({
    mutationKey: ['remove-cart-product'],
    mutationFn: () => removeProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const decreaseCartProductQuantityMutation = useMutation({
    mutationKey: ['decrease-cart-product-quantity'],
    mutationFn: () => decreaseProductFromCart({ cartItemId: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  const increaseCartProductQuantityMutation = useMutation({
    mutationKey: ['increase-cart-product-quantity'],
    mutationFn: () =>
      addProductsToCart({
        productVariantId,
        quantity: 1
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    }
  });

  function handleDecrease() {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Quantidade atualizada.');
      },
      onError: () => {
        toast.error('Erro ao atualizar quantidade.');
      }
    });
  }

  function handleIncrease() {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Quantidade atualizada.');
      },
      onError: () => {
        toast.error('Erro ao atualizar quantidade.');
      }
    });
  }

  function hancleDeleteClick() {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Produto removido do carrinho.');
      },
      onError: () => {
        toast.error('Erro ao remover produto do carrinho.');
      }
    });
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          className="rounded-[1.5rem]"
          src={productVariantImageUrl.slice(2, -2)}
          alt={productVariantName}
          width={78}
          height={78}
        />

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>

          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant={'ghost'}
              onClick={handleDecrease}
            >
              <Minus />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-4 w-4"
              variant={'ghost'}
              onClick={handleIncrease}
            >
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant={'outline'} size={'icon'} onClick={hancleDeleteClick}>
          <Trash />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
