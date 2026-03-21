"use client";

import { useCart } from "../context/CartContext";
import type { Product } from "../types";

type Props = {
  product: Product;
  selectedSize?: string;
  selectedPrice?: number;
};

export default function AddToCartButton({
  product,
  selectedSize,
  selectedPrice,
}: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        image: product.images[0],
        price: selectedPrice ?? product.sizeOptions[0]?.price ?? 0,
      },
      selectedSize
    );
  };

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-xl bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
    >
      أضف إلى السلة
    </button>
  );
}