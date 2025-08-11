import { useQuery } from '@tanstack/react-query';
import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';

import { getCart } from '@/actions/get-cart';

import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';

export function Cart() {
  const { data: cart, isPending: isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: () => getCart()
  });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <ShoppingBag className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>
        <div>
          {isLoading && 'Carregando...'}
          {cart?.items.map(item => (
            <Image
              key={item?.id}
              src={item?.productVariant?.imageUrl.slice(2, -2)}
              alt={item?.productVariant?.name}
              width={100}
              height={100}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
