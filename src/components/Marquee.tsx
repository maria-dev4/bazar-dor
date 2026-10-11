import { getProducts } from "@/lib/api";
import { toBn, unitBn } from "@/lib/format";

const PriceMarquee = async () => {
  const products = await getProducts();

  if (products.length === 0) {
    return null;
  }

  const items = [...products, ...products];

  return (
    <div className="marquee overflow-hidden border-y border-gray-200 bg-green-50 py-3">
      <div className="marquee-track items-center gap-8">
        {items.map((product, index) => (
          <div
            key={`${product.id}-${index}`}
            className="flex shrink-0 items-center gap-2 text-sm"
          >
            <span>{product.categoryIcon || "🛒"}</span>

            <span className="font-medium text-gray-800">{product.nameBn}</span>

            <span className="font-bold text-gray-900">
              ৳{toBn(product.today)}/{unitBn(product.unit)}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "font-semibold text-red-600"
                  : product.change.dir === "down"
                    ? "font-semibold text-green-700"
                    : "font-semibold text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? "▲"
                : product.change.dir === "down"
                  ? "▼"
                  : "—"}{" "}
              {toBn(Math.abs(product.change.pct))}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceMarquee;
