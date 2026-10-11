import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategories, getProductsByCategory } from "@/lib/api";

interface Props {
params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: Props) => {
const { slug } = await params;
const categories = await getCategories();
const category = categories.find((item) => item.slug === slug);

if (!category) {
notFound();
}

const products = await getProductsByCategory(slug);

return ( <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6"> <h1 className="flex items-center gap-2 text-2xl font-extrabold text-gray-900"> <span>{category.icon}</span>
{category.nameBn} </h1>

```
  <CategoryProducts products={products} />
</div>
```

);
};

export default CategoryPage;