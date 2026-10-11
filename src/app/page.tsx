import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/format";
const HomePage = async () => {
  const products = await getProducts();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6">
      <Banner />

      {risers.length > 0 && (
        <section className="py-8">
          <h2 className="mb-5 text-2xl font-extrabold text-gray-900">
  আজ দাম বেড়েছে <span className="text-red-600">▲</span>
</h2>

          <ProductSection products={risers} />
        </section>
      )}

      {fallers.length > 0 && (
        <section className="py-8">
          <h2 className="mb-5 text-2xl font-extrabold text-gray-900">
  আজ দাম কমেছে <span className="text-green-600">▼</span>
</h2>

          <ProductSection products={fallers} />
        </section>
      )}

    <section id="all-products" className="scroll-mt-32 py-8">
  <h2 className="text-2xl font-extrabold text-gray-900">সব পণ্য</h2>
  <p className="mb-5 mt-1 text-sm text-gray-500">
    মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
  </p>

  <ProductSection products={products} />
</section>
    </main>
  );
};

export default HomePage;