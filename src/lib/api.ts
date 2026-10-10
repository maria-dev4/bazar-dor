const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}


export async function getProductsByCategory(category: string) {
  const response = await fetch(
    `${BASE_URL}/products?category=${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  return response.json();
}


export async function getProductById(id: string | number) {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product details");
  }

  return response.json();
}


export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}


export async function getCategoryBySlug(slug: string) {
  const response = await fetch(
    `${BASE_URL}/categories/${encodeURIComponent(slug)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category");
  }

  return response.json();
}