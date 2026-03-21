"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";
import type { Product } from "../types";

type Props = {
  product: Product;
  className?: string;
};

export default function AddToFavoritesButton({
  product,
  className = "",
}: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(product.id);

  return (
    <button
      type="button"
      onClick={() => void toggleFavorite(product)}
      className={`rounded-full border p-2 transition ${
        active
          ? "border-pink-500 bg-pink-500 text-white"
          : "border-gray-300 bg-white text-gray-700 hover:border-pink-400 hover:text-pink-500"
      } ${className}`}
      aria-label="إضافة إلى المفضلة"
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}