import Image from 'next/image';
import Link from 'next/link';

import { productTable, productVariantTable } from '@/db/schema';
import { formatCentsToBRL } from '@/helpers/money';
import { cn } from '@/lib/utils';

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}
export function ProductItem({
  product,
  textContainerClassName
}: ProductItemProps) {
  const firstVariant = product.variants[0];
  const rawUrl = firstVariant.imageUrl;
  const cleanedUrl = rawUrl.replace(/^{"|"}$/g, '').trim();

  return (
    <Link
      className="flex flex-col gap-4"
      href={`/product-variant/${firstVariant.slug}`}
    >
      <Image
        className="rounded-[1.5rem]"
        src={cleanedUrl}
        alt={firstVariant.name}
        width={200}
        height={200}
      />
      <div
        className={cn(
          'flex max-w-[200px] flex-col gap-1 px-2',
          textContainerClassName
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
}
