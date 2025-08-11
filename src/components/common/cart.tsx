import { useQuery } from '@tanstack/react-query';
import { ShoppingBag } from 'lucide-react';

import { getCart } from '@/actions/get-cart';
import { formatCentsToBRL } from '@/helpers/money';

import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui/sheet';
import { CartItem } from './cart-item';

export function Cart() {
  const { data: cart } = useQuery({
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

        <div className="flex h-full flex-col px-5 pb-5">
          <div className="flex h-full max-h-full flex-col overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex-h-full flex-col gap-8 space-y-4">
                {cart?.items.map(item => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    productName={item.productVariant.product.name}
                    productVariantName={item.productVariant.name}
                    productVariantImageUrl={item.productVariant.imageUrl}
                    productVariantPriceInCents={
                      item.productVariant.priceInCents
                    }
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
          {(cart?.items ?? []).length > 0 && (
            <div className="flex flex-col gap-4">
              <Separator />
              <div className="ites-center flex justify-between text-xs">
                <p>Subtotal</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Separator />
              <div className="ites-center flex justify-between text-xs">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>
              <Separator />
              <div className="ites-center flex justify-between text-xs">
                <p>Total</p>
                <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
              </div>
              <Button className="mt-5 rounded-full">Finalizar compra</Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
