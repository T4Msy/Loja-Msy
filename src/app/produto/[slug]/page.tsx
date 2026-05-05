import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductGrid } from "@/components/product/product-grid";
import { mockProducts, getProductBySlug, getRelated } from "@/lib/mock/products";
import { site } from "@/lib/site";
import type { Metadata } from "next";

type Params = { slug: string };

export async function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} · ${site.name}`,
      description: product.description,
      images: [product.imageFront],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product.id, 4);

  return (
    <>
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="container-edge py-16 md:py-24 border-t border-line">
          <div className="flex items-end justify-between gap-6 pb-10 border-b border-line">
            <div>
              <p className="label-tag mb-3">Continue navegando</p>
              <h2 className="display text-3xl md:text-5xl text-bone leading-[0.95]">
                Peças relacionadas
              </h2>
            </div>
          </div>
          <div className="mt-12">
            <ProductGrid products={related} columns={4} />
          </div>
        </section>
      )}
    </>
  );
}
