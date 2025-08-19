'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

import { db } from '@/db';
import {
  cartItemTable,
  cartTable,
  orderItemTable,
  orderTable
} from '@/db/schema';
import { auth } from '@/lib/auth';

export async function finishOderSchema() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error('Usuário não autenticado');
  }

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true
        }
      }
    }
  });

  if (!cart) {
    throw new Error('Carrinho não encontrado');
  }

  if (!cart.shippingAddress) {
    throw new Error('Endereço de entrega não encontrado');
  }

  const totalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0
  );

  await db.transaction(async tx => {
    const [order] = await tx
      .insert(orderTable)
      .values({
        ...cart.shippingAddress!,
        userId: session.user.id!,
        totalPriceInCents: totalInCents!,
        shippingAddressId: cart.shippingAddress!.id
      })
      .returning();

    if (!order) {
      throw new Error('Erro ao criar pedido');
    }

    const orderItemsPayload: (typeof orderItemTable.$inferInsert)[] =
      cart.items.map(item => ({
        orderId: order.id,
        productVariantId: item.productVariant.id,
        quantity: item.quantity,
        priceInCents: item.productVariant.priceInCents
      }));

    await tx.insert(orderItemTable).values(orderItemsPayload);
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
  });
}
