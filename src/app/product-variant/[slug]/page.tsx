import { eq } from 'drizzle-orm';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { ProductList } from '@/components/common/product-list';
import { Button } from '@/components/ui/button';
import { db } from '@/db';
import { productTable } from '@/db/schema';
import { formatCentsToBRL } from '@/helpers/money';

import { QuantitySelector } from './components/quantity-selector';
import { VariantSelector } from './components/variant-selector';

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductVariantPage({
  params
}: ProductVariantPageProps) {
  const { slug } = await params;

  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true
        }
      }
    }
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true
    }
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="relative h-[380px] w-full rounded-3xl">
        <Image
          className="object-cover"
          src={productVariant.imageUrl.slice(2, -2)}
          alt={productVariant.name}
          fill
        />
      </div>

      <div className="px-5">
        <VariantSelector
          variants={productVariant.product.variants}
          selectedVariant={productVariant.slug}
        />
      </div>

      <div className="px-5">
        <h2 className="text-lg font-semibold">{productVariant.product.name}</h2>
        <h3 className="text-muted-foreground">{productVariant.name}</h3>
        <h3 className="text-lg font-semibold">
          {formatCentsToBRL(productVariant.priceInCents)}
        </h3>
      </div>

      <div className="px-5">
        <QuantitySelector />
      </div>

      <div className="flex flex-col space-y-4 px-5">
        <Button className="w-full rounded-full" size={'lg'} variant={'outline'}>
          Adicionar ao carrinho
        </Button>
        <Button className="w-full rounded-full" size={'lg'}>
          Comprar agora
        </Button>
      </div>

      <div className="px-5">
        <p className="text-muted-foreground text-sm">
          {productVariant.product.description}
        </p>
      </div>

      <ProductList title="Você também pode gostar" products={likelyProducts} />
    </div>
  );
}
