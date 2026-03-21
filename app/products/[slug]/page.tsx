"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { products } from "@/app/data/products";
import AddToCartButton from "@/app/components/AddToCartButton";
import AddToFavoritesButton from "@/app/components/AddToFavoritesButton";

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0] ?? "");
  const [selectedSize, setSelectedSize] = useState(
    product.sizeOptions[0]?.size ?? ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    product.sizeOptions[0]?.price ?? 0
  );

  const relatedProducts = useMemo(() => {
    return products
      .filter(
        (item) => item.category === product.category && item.id !== product.id
      )
      .slice(0, 4);
  }, [product]);

  <div className="mb-4 flex items-start justify-between gap-4">
  <AddToFavoritesButton product={product} />
  <div className="text-right">
    <p className="mb-2 text-sm text-gray-500">{product.category}</p>
    <h1 className="text-3xl font-bold">{product.name}</h1>
  </div>
</div>

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="relative mb-4 h-[500px] w-full overflow-hidden rounded-2xl bg-white">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

<div className="mb-6 flex justify-start">
  <Link
    href="/"
    className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
  >
    العودة إلى الرئيسية
  </Link>
</div>

          <div className="flex flex-wrap gap-3">
            {product.images.map((image) => (
              <button
                key={image}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative h-24 w-24 overflow-hidden rounded-xl border-2 ${
                  selectedImage === image
                    ? "border-pink-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="text-right">
          <p className="mb-2 text-sm text-gray-500">{product.category}</p>

          <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>

          <p className="mb-4 text-2xl font-bold text-pink-600">
            {selectedPrice} د.ك
          </p>

          <p className="mb-5 leading-8 text-gray-700">{product.description}</p>

          {product.material && (
            <p className="mb-3">
              <span className="font-bold">الخامة: </span>
              {product.material}
            </p>
          )}

          {product.colors && product.colors.length > 0 && (
            <p className="mb-6">
              <span className="font-bold">الألوان: </span>
              {product.colors.join(" - ")}
            </p>
          )}

          <div className="mb-6">
            <p className="mb-3 font-bold">اختاري المقاس:</p>

            <div className="flex flex-wrap justify-end gap-3">
              {product.sizeOptions.map((option) => (
                <button
                  key={option.size}
                  type="button"
                  onClick={() => {
                    setSelectedSize(option.size);
                    setSelectedPrice(option.price);
                  }}
                  className={`rounded-xl border px-5 py-2 transition ${
                    selectedSize === option.size
                      ? "border-pink-500 bg-pink-500 text-white"
                      : "border-gray-300 bg-white text-black"
                  }`}
                >
                  {option.size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500">
              المقاس المختار: <span className="font-semibold">{selectedSize}</span>
            </p>
          </div>

          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedPrice={selectedPrice}
          />
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/products"
              className="text-sm text-gray-500 transition hover:text-black"
            >
              عرض الكل
            </Link>

            <h2 className="text-2xl font-bold">منتجات مشابهة</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.slug}`}
                className="overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={item.images[0]}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4 text-right">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="mt-2 text-pink-600">
                    {item.sizeOptions[0]?.price ?? 0} د.ك
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}