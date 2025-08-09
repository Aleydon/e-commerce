import Image from 'next/image';
import Link from 'next/link';

import { productVariantTable } from '@/db/schema';

interface VariantSelectorProps {
  variants: (typeof productVariantTable.$inferSelect)[];
  selectedVariant: string;
}

export function VariantSelector({
  variants,
  selectedVariant
}: VariantSelectorProps) {
  return (
    <div className="flex items-center gap-4">
      {variants.map(variant => (
        <Link
          key={variant.id}
          href={`/product-variant/${variant.slug}`}
          className={
            selectedVariant === variant.slug
              ? 'border-primary rounded-xl border-2'
              : 'border-2 border-transparent'
          }
        >
          <Image
            className="rounded-xl"
            width={68}
            height={68}
            src={variant.imageUrl.slice(2, -2)}
            alt={variant.name}
          />
        </Link>
      ))}
    </div>
  );
}
