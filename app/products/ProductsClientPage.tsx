"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products } from "@/app/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import AddToFavoritesButton from "@/app/components/AddToFavoritesButton";

const categories = ["الكل", "عبايات", "فساتين", "أطقم", "بلوزات"];

export default function ProductsClientPage() {
  const searchParams = useSearchParams();
  const searchFromUrl = searchParams.get("search") ?? "";
  const categoryFromUrl = searchParams.get("category") ?? "الكل";

  const [search, setSearch] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setSearch(searchFromUrl);
    setSelectedCategory(categoryFromUrl);
  }, [searchFromUrl, categoryFromUrl]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "الكل" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 flex justify-start">
        <Link
          href="/"
          className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
        >
          العودة إلى الرئيسية
        </Link>
      </div>

      <h1 className="mb-6 text-center text-3xl font-bold">منتجاتنا</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="ابحثي عن منتج..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border px-4 py-3 text-right outline-none focus:border-pink-400"
        />
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              selectedCategory === category
                ? "bg-black text-white"
                : "border bg-white text-black"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {filteredProducts.map((product) => {
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
                  <div className="text-right">
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

                <p className="mb-2 text-sm text-gray-600">
                  المقاس المتوفر: {startingSize}
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

      {filteredProducts.length === 0 && (
        <p className="mt-10 text-center text-gray-500">
          لا توجد منتجات مطابقة للبحث أو الفئة.
        </p>
      )}
    </main>
  );
}