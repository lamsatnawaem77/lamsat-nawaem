"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "عبايات",
    image: "/products/cat-abaya.png",
    href: "/products?category=عبايات",
  },
  {
    id: 2,
    name: "فساتين",
    image: "/products/cat-dress.png",
    href: "/products?category=فساتين",
  },
  {
    id: 3,
    name: "أطقم",
    image: "/products/cat-homedress.png",
    href: "/products?category=أطقم",
  },
  {
    id: 4,
    name: "بلوزات",
    image: "/products/cat-womensuit.png",
    href: "/products?category=بلوزات",
  },
];

export default function CategoryCircles() {
  return (
    <section className="rounded-[28px] bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/products"
          className="text-sm text-neutral-500 transition hover:text-black lg:text-base"
        >
          عرض الكل
        </Link>

        <h2 className="text-lg font-bold lg:text-2xl">الفئات</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="group block text-center"
          >
            <div className="relative mx-auto h-[84px] w-[84px] overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 transition group-hover:scale-[1.03] group-hover:border-neutral-300 sm:h-[92px] sm:w-[92px] lg:h-[104px] lg:w-[104px]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>

            <p className="mt-2 text-sm font-medium text-neutral-800 lg:text-[15px]">
              {category.name}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}