export interface Product {
  id: string | number;
  name: string;
  slug?: string;
  category?: string;
  unit?: string;
  price?: number;
  [key: string]: unknown;
}