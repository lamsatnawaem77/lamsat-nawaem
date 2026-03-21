export type SizeOption = {
  size: string;
  price: number;
};

export type Product = {
  id: number | string;
  name: string;
  image: string;
  price: number;
  description: string;
  category?: string;
  material?: string;
  colors: string[];
  sizeOptions: SizeOption[];
};