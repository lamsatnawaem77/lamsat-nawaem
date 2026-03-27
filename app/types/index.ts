export type SizeOption = {
  size: string;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  images: string[];
  sizeOptions: SizeOption[];
  material?: string;
  colors?: string[];
  stock?: number;
  featured?: boolean;
};

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};