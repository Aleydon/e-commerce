'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

import { AddToCartButton } from './add-to-cart-button';

interface ProductActionsProps {
  productVariant: {
    id: string;
  };
}

export function ProductActions({ productVariant }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);

  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button variant={'ghost'} onClick={handleDecrement}>
              <Minus />
            </Button>
            <p>{quantity}</p>
            <Button variant={'ghost'} onClick={handleIncrement}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton productVariantId={productVariant.id} quantity={1} />
        <Button className="w-full rounded-full" size={'lg'}>
          Comprar agora
        </Button>
      </div>
    </>
  );
}
