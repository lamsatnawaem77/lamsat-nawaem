"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AddToCartButton from "../components/AddToCartButton";
import AddToFavoritesButton from "../components/AddToFavoritesButton";
import type { Product } from "../types";

type Props = {
  products: Product[];
};

const categories = ["الكل", "عبايات", "فساتين", "أطقم", "بلوزات"];

export default function ProductsClientPage({ products }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "الكل";
  const currentSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(currentSearch);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        currentCategory === "الكل" || product.category === currentCategory;

      const query = currentSearch.trim().toLowerCase();
      const searchMatch =
        query === "" ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [products, currentCategory, currentSearch]);

  const goToCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (category === "الكل") {
      params.delete("category");
    } else {
      params.set("category", category);
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <main className="relative z-10 min-h-screen bg-[#f8f3ee] px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex justify-start">
          <Link
            href="/"
            className="rounded-full border border-black px-5 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            العودة إلى الرئيسية
          </Link>
        </div>

        <h1 className="mb-8 text-center text-4xl font-bold">منتجاتنا</h1>

        <form onSubmit={handleSearch} className="mb-5">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-3xl border border-black bg-transparent px-5 py-4 text-right text-lg outline-none"
          />
        </form>

        <div className="relative z-20 mb-8 flex flex-wrap justify-end gap-3">
          {categories.map((category) => {
            const isActive = currentCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => goToCategory(category)}
                className={`touch-manipulation rounded-full border px-6 py-3 text-lg transition ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-black bg-white text-black hover:bg-black hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg text-gray-600">لا توجد منتجات مطابقة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => {
              const mainImage = product.images?.[0] ?? "/file.svg";
              const startingPrice = product.sizeOptions?.[0]?.price ?? 0;
              const startingSize = product.sizeOptions?.[0]?.size ?? "";

              return (
                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  <Link href={`/products/${product.slug}`}>
                    <div className="relative h-[420px] w-full bg-white">
                      <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="p-6 text-right">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <AddToFavoritesButton product={product} />

                      <div className="flex-1">
                        <Link href={`/products/${product.slug}`}>
                          <h2 className="text-2xl font-bold">{product.name}</h2>
                        </Link>
                        <p className="mt-1 text-lg text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>

                    <p className="mb-2 text-right text-2xl font-bold text-pink-600">
                      يبدأ من {startingPrice} د.ك
                    </p>

                    <p className="mb-2 text-right text-lg text-gray-600">
                      المقاس المتوفر: {startingSize}
                    </p>

                    <p className="mb-5 text-right text-lg text-gray-600">
                      {product.description}
                    </p>

                    <AddToCartButton
                      product={product}
                      selectedSize={startingSize}
                      selectedPrice={startingPrice}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}