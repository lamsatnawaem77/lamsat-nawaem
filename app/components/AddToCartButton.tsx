"use client";

import { useCart } from "@/app/context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-pink-500 text-white py-2 rounded-lg"
    >
      أضف إلى السلة 🛒
    </button>
  );
}
