export type ProductSizeOption = {
  size: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  category: string;
  stock: number;
  featured?: boolean;
  sizeOptions: ProductSizeOption[];
};

export type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
};