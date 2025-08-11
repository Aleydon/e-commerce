'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

import { db } from '@/db';
import { cartItemTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import {
  DecreaseProductFromCartSchema,
  decreaseProductFromCartSchema
} from './schema';

export const decreaseProductFromCart = async (
  data: DecreaseProductFromCartSchema
) => {
  decreaseProductFromCartSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error('Usuário não autenticado');
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: eq(cartItemTable.id, data.cartItemId),
    with: {
      cart: true
    }
  });

  if (!cartItem) {
    throw new Error('Item não encontrado');
  }

  const cartBeNotBelongToUser = cartItem.cart.userId !== session.user.id;

  if (cartBeNotBelongToUser) {
    throw new Error('Não autorizado');
  }

  if (cartItem.quantity === 1) {
    await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
    return;
  }

  await db
    .update(cartItemTable)
    .set({
      quantity: cartItem.quantity - 1
    })
    .where(eq(cartItemTable.id, cartItem.id));
};
