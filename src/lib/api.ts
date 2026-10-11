import { Category } from "@/types/category";
import { Product } from "@/types/product";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

async function fetchList<T>(
  path: string,
  revalidate: number
): Promise<T[]> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate },
    });

    if (!res.ok) {
      throw new Error(`Request failed: ${res.status}`);
    }

    const result = await res.json();

    if (Array.isArray(result)) {
      return result;
    }

    if (Array.isArray(result.data)) {
      return result.data;
    }

    if (Array.isArray(result.products)) {
      return result.products;
    }

    if (Array.isArray(result.categories)) {
      return result.categories;
    }

    return [];
  } catch (error) {
    console.error(`Failed to load ${path}:`, error);
    return [];
  }
}

export const getCategories = () =>
  fetchList<Category>("/categories", 3600);

export const getProducts = () =>
  fetchList<Product>("/products", 600);

export async function getProductBySlug(slug: string) {
  const products = await getProducts();

  return products.find((product) => product.slug === slug) ?? null;
}

export async function getProductsByCategory(slug: string) {
  const products = await fetchList<Product>(
    `/products?category=${encodeURIComponent(slug)}`,
    600
  );

  if (products.length > 0) {
    return products;
  }

  const allProducts = await getProducts();

  return allProducts.filter((product) => product.category === slug);
}