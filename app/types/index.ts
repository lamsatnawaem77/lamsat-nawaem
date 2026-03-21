export type SizeOption = {
  size: string;
  price: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  sizeOptions: SizeOption[];
  material?: string;
  colors?: string[];
};