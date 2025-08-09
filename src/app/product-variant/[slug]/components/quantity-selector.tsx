'use client';

import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

export function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  function handleIncrement() {
    setQuantity(prev => prev + 1);
  }

  function handleDecrement() {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  }

  return (
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
  );
}
