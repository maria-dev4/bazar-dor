import Link from "next/link";
import { getCategories } from "@/lib/api";

const NavLinks = async () => {
  const categories = await getCategories();

  return (
    <div className="flex gap-5 py-3 whitespace-nowrap md:justify-center">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/category/${c.slug}`}
          className="shrink-0 text-sm font-medium text-gray-700 transition hover:text-green-700"
        >
          {c.icon} {c.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;