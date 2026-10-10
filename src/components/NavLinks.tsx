import Link from "next/link";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavLinks = async () => {
  let categories: Category[] = [];

  try {
    const res = await fetch(
      "https://api.api-store.workers.dev/api/bazardor/categories",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    categories = Array.isArray(data)
      ? data
      : Array.isArray(data.data)
      ? data.data
      : [];
  } catch (error) {
    console.error("Categories fetch failed:", error);
  }

  return (
    <div className="flex gap-5 py-3 whitespace-nowrap md:justify-center">
      {categories.map((c) => (
        <Link
          key={c.id}
          href={`/${c.slug}`}
          className="shrink-0 text-sm font-medium text-gray-700 transition hover:text-green-700"
        >
          <span className="mr-1">{c.icon}</span>
          {c.nameBn}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;