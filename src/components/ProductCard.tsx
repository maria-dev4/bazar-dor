import Link from "next/link";
import { Product, toBn, unitBn } from "@/lib/product";

const trends = {
  up: {
    icon: "▲",
    style: "bg-red-50 text-red-600",
  },
  down: {
    icon: "▼",
    style: "bg-green-50 text-green-600",
  },
  flat: {
    icon: "–",
    style: "bg-gray-100 text-gray-500",
  },
};

const ProductCard = ({ product }: { product: Product }) => {
  const { slug, nameBn, categoryNameBn, image, today, unit, change } = product;

  const trend = trends[change.dir];

  return (
    <Link
      href={`/products/${slug}`}
      className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-green-50 text-2xl">
        {image}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {nameBn}
        </h3>

        <p className="text-xs text-gray-500">{categoryNameBn}</p>

        <p className="mt-1 text-sm font-bold text-gray-900">
          {toBn(today)} টাকা
          <span className="text-xs font-normal text-gray-500">
            /{unitBn(unit)}
          </span>
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${trend.style}`}
      >
        {trend.icon} {toBn(Math.abs(change.pct))}%
      </span>
    </Link>
  );
};

export default ProductCard;