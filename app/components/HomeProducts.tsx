"use client";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import type { Product } from "../types";

type Props = {
  title: string;
  products: Product[];
};

export default function HomeProducts({ title, products }: Props) {
  return (
    <section className="rounded-[28px] bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/products"
          className="text-sm text-neutral-500 transition hover:text-black"
        >
          عرض الكل
        </Link>

        <h2 className="text-xl font-bold text-neutral-900 lg:text-2xl">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => {
          const mainImage = product.images?.[0] ?? "/file.svg";
          const startingPrice = product.sizeOptions?.[0]?.price ?? 0;
          const startingSize = product.sizeOptions?.[0]?.size ?? "";

          return (
            <div
              key={product.id}
              className="overflow-hidden rounded-2xl bg-[#faf7f4] p-3"
            >
              <Link href={`/products/${product.slug}`}>
                <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-white">
                  <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="mt-3 text-right">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="line-clamp-2 text-sm font-semibold text-neutral-900 lg:text-base">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                  {product.description}
                </p>

                <div className="mt-2 flex items-center justify-end gap-2">
                  <span className="text-base font-bold text-black">
                    {startingPrice} د.ك
                  </span>
                </div>

                <div className="mt-3">
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
    </section>
  );
}