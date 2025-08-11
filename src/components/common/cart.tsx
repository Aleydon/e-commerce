import { useQuery } from '@tanstack/react-query';
import { ShoppingBag } from 'lucide-react';

import { getCart } from '@/actions/get-cart';

import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';
import { CartItem } from './cart-item';

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
        <div className="space-y-4 px-5">
          {isLoading && 'Carregando...'}
          {cart?.items.map(item => (
            <CartItem
              key={item.id}
              id={item.id}
              productName={item.productVariant.product.name}
              productVariantName={item.productVariant.name}
              productVariantImageUrl={item.productVariant.imageUrl}
              productVariantPriceInCents={item.productVariant.priceInCents}
              quantity={item.quantity}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
