"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { toBn } from "@/lib/format";

type SortOrder = "default" | "asc" | "desc";

interface Props {
  category: Category;
  products: Product[];
}

const CategoryProducts = ({ category, products }: Props) => {
  const [order, setOrder] = useState<SortOrder>("default");

  const sorted = [...products].sort((a, b) => {
    if (order === "asc") return a.today - b.today;
    if (order === "desc") return b.today - a.today;
    return 0;
  });

  const header = (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <span className="text-3xl">{category.icon}</span>
      <div>
        <h1 className="text-lg font-bold text-gray-900">{category.nameBn}</h1>
        <p className="text-xs text-gray-500">
          {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
        </p>
      </div>
    </div>
  );

  if (products.length === 0) {
    return (
      <div>
        {header}
        <div className="mt-12 flex flex-col items-center text-center">
          <h2 className="text-lg font-bold text-gray-900">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
          </h2>
          <Link
            href="/"
            className="btn btn-sm mt-4 border-none bg-green-700 text-white hover:bg-green-800 sm:btn-md"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {header}

      <div className="mt-4 flex items-center justify-end gap-2 rounded-xl border border-gray-200 bg-white p-3">
        <label htmlFor="sort" className="text-sm text-gray-600">
          সাজান
        </label>

        <div className="relative">
          <select
            id="sort"
            value={order}
            onChange={(e) => setOrder(e.target.value as SortOrder)}
            className="appearance-none rounded-md border border-gray-300 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-800 focus:border-green-700 focus:outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-gray-500">
        মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;