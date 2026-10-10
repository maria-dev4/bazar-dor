import ProductCard from "./ProductCard";
import { Product } from "../lib/products";

interface Props {
  title: string;
  products: Product[];
}

const ProductSection = ({ title, products }: Props) => {
  if (!products.length) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-lg font-bold text-gray-900">
        {title}
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
