import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/api";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import CategoryProducts from "@/components/CategoryProducts";


interface Props {
  params: Promise<{ slug: string }>;
}

async function CategoryContent({ params }: Props) {
  const { slug } = await params;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

  return <CategoryProducts category={category} products={products} />;
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}