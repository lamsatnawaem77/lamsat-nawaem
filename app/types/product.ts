export type SizeOption = {
  size: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category?: string;
  material?: string;
  colors: string[];
  sizeOptions: SizeOption[];
  slug?: string;
  images?: string[];
  stock?: number;
  featured?: boolean;
};