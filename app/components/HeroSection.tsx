"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/products/hero-1.jpg",
    title: "إطلالتكِ الأجمل تبدأ من هنا",
    subtitle: "خصومات مميزة على العبايات والفساتين والمنتجات المختارة",
  },
  {
    id: 2,
    image: "/products/hero-2.jpg",
    title: "لمسة نواعم بأسلوب عصري",
    subtitle: "اكتشفي الجديد في الأناقة والجمال والشنط والأحذية",
  },
  {
    id: 3,
    image: "/products/hero-3.jpg",
    title: "كل ما تحتاجينه في متجر واحد",
    subtitle: "تصميم أنيق، عروض يومية، وتجربة أقرب لأسلوب المتاجر الكبيرة",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[430px] w-full overflow-hidden sm:h-[520px] lg:h-[720px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-5 lg:px-8 lg:pb-24">
          <div className="text-right text-white lg:max-w-2xl">
            <p className="text-sm text-white/80 lg:text-base">متجر لمسة نواعم</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-6xl">
              {slides[active].title}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/90 sm:text-base lg:max-w-xl lg:text-lg">
              {slides[active].subtitle}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-end gap-3">
              <Link
                href="/"
                className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition hover:opacity-90 lg:px-7 lg:py-3 lg:text-base"
              >
                تسوقي الآن
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/60 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 lg:px-7 lg:py-3 lg:text-base"
              >
                اكتشفي الجديد
              </Link>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    active === index ? "w-7 bg-white" : "w-2.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}