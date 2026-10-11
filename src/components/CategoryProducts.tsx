"use client";

import { useMemo, useState } from "react";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

interface Props {
  products: Product[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

const CategoryProducts = ({ products }: Props) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortBy === "low-to-high") {
      result.sort((a, b) => a.today - b.today);
    }

    if (sortBy === "high-to-low") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortBy]);

  return (
    <div className="mt-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-gray-500">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য
        </p>

        <select
          aria-label="দাম অনুযায়ী পণ্য সাজান"
          value={sortBy}
          onChange={(event) =>
            setSortBy(event.target.value as SortOption)
          }
          className="select select-bordered w-full max-w-52 bg-white text-gray-800"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <p className="font-semibold text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;