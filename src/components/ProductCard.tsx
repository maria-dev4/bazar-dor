import Link from "next/link";
import { Product } from "@/types/product";
import { toBn, unitBn } from "@/lib/format";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const changeColor =
    product.change.dir === "up"
      ? "bg-red-50 text-red-600"
      : product.change.dir === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex min-h-36 items-stretch gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-green-600 hover:shadow-md sm:gap-4"
    >
      <div className="flex w-20 shrink-0 flex-col justify-between sm:w-24">
        <div className="flex h-16 items-center justify-center rounded-lg bg-gray-50 text-4xl sm:h-20 sm:text-5xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="mt-3">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 whitespace-nowrap text-lg font-extrabold text-gray-900">
            ৳{toBn(product.today)}
          </p>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
  <h3 className="break-words text-sm font-bold leading-6 text-gray-900 sm:text-base">
    {product.nameBn}
  </h3>

  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
    প্রতি {unitBn(product.unit)}
  </p>

  <span
    className={`mt-auto ml-auto rounded-full px-2 py-1 text-xs font-bold ${changeColor}`}
  >
    {product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : ""}
    {toBn(Math.abs(product.change.pct))}%
  </span>
</div>
    </Link>
  );
};

export default ProductCard;