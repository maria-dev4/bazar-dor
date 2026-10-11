import Link from "next/link";
import { Product } from "@/types/product";
import { toBn, toBnFixed, unitBn } from "@/lib/format";

const trends = {
  up: { icon: "▲", style: "bg-red-50 text-red-600" },
  down: { icon: "▼", style: "bg-green-50 text-green-700" },
  flat: { icon: "—", style: "bg-gray-100 text-gray-500" },
};
const ProductCard = ({ product }: { product: Product }) => {
  const { slug, nameBn, image, today, unit, change } = product;
  const trend = trends[change.dir];

  return (
    <Link
      href={`/product/${slug}`}
      className="block rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
          {image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {nameBn}
          </h3>
          <p className="text-xs text-gray-500">প্রতি {unitBn(unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div>
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-lg font-bold text-gray-900">
            {toBn(today)}{" "}
            <span className="text-xs font-normal text-gray-600">টাকা</span>
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${trend.style}`}
        >
          {trend.icon} {toBnFixed(Math.abs(change.pct))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;