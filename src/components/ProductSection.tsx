import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface Props {
  products: Product[];
}

const ProductSection = ({ products }: Props) => {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
        এই মুহূর্তে কোনো পণ্য পাওয়া যায়নি।
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductSection;