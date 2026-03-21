"use client";

import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../context/FavoritesContext";
import AddToCartButton from "../components/AddToCartButton";
import AddToFavoritesButton from "../components/AddToFavoritesButton";

export default function FavoritesPage() {
  const { favorites, loading } = useFavorites();

  if (loading) {
    return (
      <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
        <p className="text-center">جاري تحميل المفضلات...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-10">
      <div className="mb-6 flex justify-start">
        <Link
          href="/"
          className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
        >
          العودة إلى الرئيسية
        </Link>
      </div>

      <h1 className="mb-8 text-center text-3xl font-bold">المفضلات</h1>

      {favorites.length === 0 ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="mb-4 text-lg text-gray-600">
            لا توجد منتجات في المفضلة حاليًا
          </p>
          <Link
            href="/products"
            className="rounded-full bg-pink-500 px-6 py-3 font-semibold text-white transition hover:bg-pink-600"
          >
            تصفح المنتجات
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {favorites.map((product) => {
            const mainImage = product.images[0];
            const startingPrice = product.sizeOptions[0]?.price ?? 0;
            const startingSize = product.sizeOptions[0]?.size ?? "";

            return (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-md transition hover:shadow-lg"
              >
                <Link href={`/products/${product.slug}`}>
                  <div className="relative h-72 w-full bg-white">
                    <Image
                      src={mainImage}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>

                <div className="p-4 text-right">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <AddToFavoritesButton product={product} />
                    <div>
                      <Link href={`/products/${product.slug}`}>
                        <h2 className="text-xl font-bold transition hover:text-pink-600">
                          {product.name}
                        </h2>
                      </Link>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <p className="mb-2 font-semibold text-pink-600">
                    يبدأ من {startingPrice} د.ك
                  </p>

                  <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                    {product.description}
                  </p>

                  <div className="flex justify-end">
                    <AddToCartButton
                      product={product}
                      selectedSize={startingSize}
                      selectedPrice={startingPrice}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}