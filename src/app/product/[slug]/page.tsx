import Link from "next/link";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getProductBySlug } from "@/lib/api";
import { toBn, toBnFixed, unitBn } from "@/lib/format";

export const instant = false;

interface Props {
  params: Promise<{ slug: string }>;
}

const trends = {
  up: { icon: "▲", style: "bg-green-50 text-green-700" },
  down: { icon: "▼", style: "bg-red-50 text-red-600" },
  flat: { icon: "—", style: "bg-gray-100 text-gray-500" },
};

const formatAverage = (n: number) =>
  Number.isInteger(n) ? toBn(n) : toBnFixed(n, 2);

const ProductPage = async ({ params }: Props) => {
  const { slug } = await params;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/signin?from=protected");
  }

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const { nameBn, image, unit, today, yesterday, category, categoryNameBn, change } =
    product;

  const trend = trends[change.dir];
  const diff = Math.abs(today - yesterday);

  const rows = product.markets
    .map((m) => ({ ...m, average: (m.min + m.max) / 2 }))
    .sort((a, b) => a.average - b.average);

  const lowest = Math.min(...product.markets.map((m) => m.min));
  const highest = Math.max(...product.markets.map((m) => m.max));
  const average = Math.round(
    rows.reduce((sum, r) => sum + r.average, 0) / rows.length
  );

  const stats = [
    {
      label: "সর্বনিম্ন দাম",
      value: lowest,
      note: "সবচেয়ে কম দামের বাজারে",
      style: "text-green-700",
    },
    {
      label: "সর্বোচ্চ দাম",
      value: highest,
      note: "সবচেয়ে বেশি দামের বাজারে",
      style: "text-red-600",
    },
    {
      label: "গড় দাম",
      value: average,
      note: `প্রতি ${unitBn(unit)}, সব বাজারের গড়`,
      style: "text-green-700",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6">
      <nav aria-label="breadcrumb" className="text-xs text-gray-500">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <span className="mx-1.5">›</span>
        <Link href={`/category/${category}`} className="hover:text-green-700">
          {categoryNameBn}
        </Link>
        <span className="mx-1.5">›</span>
        <span className="text-gray-800">{nameBn}</span>
      </nav>

      <section className="mt-4 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-3xl">
            {image}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
              {nameBn}
            </h1>
            <p className="text-xs text-gray-500">
              প্রতি {unitBn(unit)} · {categoryNameBn}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              {change.dir === "flat" ? (
                "গতকালের মতোই আছে"
              ) : (
                <>
                  গতকালের তুলনায় আজ দাম{" "}
                  <strong className="text-gray-900">
                    {change.dir === "up" ? "বেড়েছে" : "কমেছে"}
                  </strong>{" "}
                  {toBn(diff)} টাকা
                </>
              )}
            </p>
          </div>
        </div>

        <div className="shrink-0 rounded-xl bg-gray-50 px-5 py-3 text-center">
          <p className="text-[11px] text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-extrabold text-gray-900">{toBn(today)}</p>
          <p className="text-[11px] text-gray-500">টাকা / {unitBn(unit)}</p>
          <span
            className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${trend.style}`}
          >
            {trend.icon} {toBnFixed(Math.abs(change.pct))}%
          </span>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="text-base font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 p-4"
            >
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className={`mt-1 text-xl font-bold ${stat.style}`}>
                {toBn(stat.value)}{" "}
                <span className="text-xs font-normal text-gray-600">টাকা</span>
              </p>
              <p className="mt-1 text-[11px] text-gray-500">{stat.note}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-6 text-base font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-500">
                <th className="px-4 py-2.5 font-medium">বাজার</th>
                <th className="px-4 py-2.5 font-medium">বিভাগ</th>
                <th className="px-4 py-2.5 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-4 py-2.5 text-right font-medium">সর্বোচ্চ</th>
                <th className="px-4 py-2.5 text-right font-medium">গড়</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.market} className="border-t border-gray-100">
                  <td className="px-4 py-2.5 text-gray-800">{row.market}</td>
                  <td className="px-4 py-2.5 text-gray-600">{row.division}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">
                    {toBn(row.min)} টাকা
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-700">
                    {toBn(row.max)} টাকা
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-900">
                    {formatAverage(row.average)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;