'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { db } from '@/db';
import { shippingAddressTable } from '@/db/schema';
import { auth } from '@/lib/auth';

import {
  CreateShippingAddressSchema,
  createShippingAddressSchema
} from './schema';

export async function createShippingAddress(data: CreateShippingAddressSchema) {
  createShippingAddressSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error('Não autorizado');
  }

  const [shippingAddress] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: data.recipientName,
      street: data.address,
      number: data.number,
      complement: data.complement,
      city: data.city,
      state: data.state,
      neighborhood: data.neighborhood,
      zipCode: data.zipCode,
      country: 'Brasil',
      phone: data.phone,
      email: data.email,
      cpfOrCnpj: data.cpfOrCnpj
    })
    .returning();

  revalidatePath('/cart/identification');

  return shippingAddress;
}
