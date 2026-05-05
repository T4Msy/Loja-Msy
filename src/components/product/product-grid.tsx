import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";

type Props = {
  products: Product[];
  columns?: 2 | 3 | 4;
  className?: string;
  priorityFirst?: number;
};

export function ProductGrid({ products, columns = 4, className, priorityFirst = 4 }: Props) {
  const colClasses = {
    2: "grid-cols-2 md:grid-cols-2",
    3: "grid-cols-2 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  } as const;

  return (
    <div className={cn("grid gap-x-3 gap-y-12 md:gap-x-4 md:gap-y-16", colClasses[columns], className)}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} priority={i < priorityFirst} />
      ))}
    </div>
  );
}
