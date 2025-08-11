import { Minus, Plus, Trash } from 'lucide-react';
import Image from 'next/image';

import { formatCentsToBRL } from '@/helpers/money';

import { Button } from '../ui/button';

interface CartItemProps {
  id: string;
  productName: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

export function CartItem({
  id,
  productName,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity
}: CartItemProps) {
  return (
    <div className="flex items-center justify-between" key={id}>
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
            <Button className="h-4 w-4" variant={'ghost'} onClick={() => {}}>
              <Minus />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button className="h-4 w-4" variant={'ghost'} onClick={() => {}}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center gap-1">
        <Button variant={'outline'} size={'icon'} onClick={() => {}}>
          <Trash />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
}
