'use server';

import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

import { db } from '@/db';
import { cartItemTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import {
  RemoveProductFromCartSchema,
  removeProductFromCartSchema
} from './schema';

export const removeProductFromCart = async (
  data: RemoveProductFromCartSchema
) => {
  removeProductFromCartSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error('Usuário não autenticado');
  }

  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { eq }) => eq(cartItem.id, data.cartItemId),
    with: {
      cart: true
    }
  });

  const cartBeNotBelongToUser = cartItem?.cart.userId !== session.user.id;

  if (cartBeNotBelongToUser) {
    throw new Error('Não autorizado');
  }

  if (!cartItem) {
    throw new Error('Item não encontrado');
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.id, cartItem.id));
};
