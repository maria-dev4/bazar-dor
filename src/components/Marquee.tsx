interface Product {
  id: number;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

const toBn = (n: number) => n.toLocaleString("bn-BD");

const changeStyle = {
  up: { icon: "▲", color: "text-red-600" }, // দাম বেড়েছে
  down: { icon: "▼", color: "text-green-600" }, // দাম কমেছে
  flat: { icon: "–", color: "text-gray-500" },
};

const PriceMarquee = async () => {
  let products: Product[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/products",
      { next: { revalidate: 600 } }
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();
    products = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Products fetch failed:", error);
  }

  if (products.length === 0) return null;

  const items = products.map((p) => {
    const style = changeStyle[p.change.dir];

    return (
      <span
        key={p.id}
        className="mr-8 inline-flex shrink-0 items-center gap-1.5 text-xs sm:text-sm"
      >
        <span>{p.image}</span>
        <span className="font-semibold text-gray-800">{p.nameBn}</span>
        <span className="text-gray-600">
          {toBn(p.today)} টাকা/{unitBn[p.unit] ?? p.unit}
        </span>
        <span className={`font-medium ${style.color}`}>
          {style.icon} {toBn(Math.abs(p.change.pct))}%
        </span>
      </span>
    );
  });

  return (
    <div className="border-b border-gray-200 bg-green-50">
      <div className="mx-auto flex max-w-6xl items-center">


        <div className="marquee relative flex-1 overflow-hidden py-2 pl-3">
          <div className="marquee-track">
            <div className="flex shrink-0">{items}</div>
            <div className="flex shrink-0" aria-hidden="true">
              {items}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceMarquee;