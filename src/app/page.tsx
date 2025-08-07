import { desc } from 'drizzle-orm';
import Image from 'next/image';

import { CategorySelector } from '@/components/common/category-selector';
import { ProductList } from '@/components/common/product-list';
import { db } from '@/db';
import { productTable } from '@/db/schema';

export default async function Page() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true
    }
  });

  const newlyAddedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true
    }
  });

  const categories = await db.query.categoryTable.findMany({
    with: {
      products: true
    }
  });

  return (
    <>
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src="/banner.png"
            alt="Leve muma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            quality={100}
            priority
          />
        </div>

        <ProductList title="Mais vendidos" products={products} />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <Image
            src="/banner-2.png"
            alt="Leve uma vida com estilo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
            quality={100}
            priority
          />
        </div>

        <ProductList title="Novos produtos" products={newlyAddedProducts} />
      </div>
    </>
  );
}
