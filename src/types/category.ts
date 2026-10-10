export interface Category {
  id?: string | number;
  name: string;
  slug: string;
  [key: string]: unknown;
}