import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import { ProductItem } from '@/components/common/product-item';
import { db } from '@/db';
import { categoryTable, productTable } from '@/db/schema';

interface CategoryProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryProps) {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug)
  });

  if (!category) {
    return notFound();
  }

  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true
    }
  });

  return (
    <div className="bg-yellow-200">
      <h2>{category.name}</h2>
      <div className="grid grid-cols-2 gap-2">
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
