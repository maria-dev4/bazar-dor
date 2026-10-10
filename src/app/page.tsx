import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/product";

const HomePage = async () => {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      <Banner />

      <ProductSection title="আজ দাম বেড়েছে" products={risers} />

      <ProductSection title="আজ দাম কমেছে" products={fallers} />

      <div id="all-products" className="scroll-mt-32">
        <ProductSection title="সব পণ্য" products={products} />
      </div>
    </main>
  );
};

export default HomePage;
