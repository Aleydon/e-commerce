import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('user', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull()
});

export const productTable = pgTable('product', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  priceInCents: integer().notNull()
});
