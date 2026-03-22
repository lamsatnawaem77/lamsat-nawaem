"use client";

import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import type { Product } from "../types";

type Props = {
  product: Product;
  className?: string;
};

export default function AddToFavoritesButton({
  product,
  className = "",
}: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const active = isFavorite(product.id);

  const handleFavoriteClick = async () => {
    if (!user) {
      alert("يجب تسجيل الدخول أولًا حتى تتمكني من حفظ المنتجات في المفضلة");
      router.push("/login");
      return;
    }

    await toggleFavorite(product);
  };

  return (
    <button
      type="button"
      onClick={() => void handleFavoriteClick()}
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