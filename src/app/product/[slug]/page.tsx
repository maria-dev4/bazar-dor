import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { toBn, unitBn } from "@/lib/format";
import { Market } from "@/types/product";

interface Props {
  params: Promise<{ slug: string }>;
}

const trendText = {
  up: "গতকালের তুলনায় বেড়েছে",
  down: "গতকালের তুলনায় কমেছে",
  flat: "গতকালের মতোই আছে",
};

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?from=protected");
  }

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { nameBn, image, unit, categoryIcon, categoryNameBn, category } =
    product;

  const lowest = Math.min(...product.markets.map((m) => m.min));
  const highest = Math.max(...product.markets.map((m) => m.max));
  const average = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );

  const byDivision = product.markets.reduce<Record<string, Market[]>>(
    (groups, market) => {
      (groups[market.division] ??= []).push(market);
      return groups;
    },
    {},
  );

  const stats = [
    { label: "সর্বনিম্ন দাম", value: lowest, style: "text-green-700" },
    { label: "সর্বোচ্চ দাম", value: highest, style: "text-red-600" },
    { label: "গড় দাম", value: average, style: "text-gray-900" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <Link
        href="/"
        className="text-sm font-medium text-green-700 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>

      <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center sm:p-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-5xl">
          {image}
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {nameBn}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {categoryNameBn} বিভাগের এই পণ্যের আজকের গড় দাম {toBn(average)}{" "}
            টাকা, {trendText[product.change.dir]}।
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
            <Link
              href={`/category/${category}`}
              className="rounded-full bg-green-100 px-3 py-1 text-green-800 hover:bg-green-200"
            >
              {categoryIcon} {categoryNameBn}
            </Link>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
              প্রতি {unitBn(unit)}
            </span>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-4"
          >
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className={`mt-1 text-2xl font-bold ${stat.style}`}>
              {toBn(stat.value)}{" "}
              <span className="text-sm font-normal text-gray-500">
                টাকা/{unitBn(unit)}
              </span>
            </p>
          </div>
        ))}
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Object.entries(byDivision).map(([division, markets]) => (
            <div
              key={division}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <h3 className="mb-2 text-sm font-bold text-green-800">
                {division} বিভাগ
              </h3>

              <ul className="divide-y divide-gray-100">
                {markets.map((m) => (
                  <li
                    key={m.market}
                    className="flex items-center justify-between gap-3 py-2 text-sm"
                  >
                    <span className="text-gray-700">{m.market}</span>
                    <span className="shrink-0 font-semibold text-gray-900">
                      {toBn(m.min)} – {toBn(m.max)} টাকা
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
