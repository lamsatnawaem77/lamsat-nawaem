import Image from "next/image";

const categories = [
  { id: 1, name: "عبايات", image: "/products/cat-abaya.png" },
  { id: 2, name: "فساتين", image: "/products/cat-dress.png" },
  { id: 3, name: "شنط", image: "/products/cat-bag.png" },
  { id: 4, name: "أحذية", image: "/products/cat-shoes.png" },
  { id: 5, name: "عطور", image: "/products/cat-perfume.png" },
  { id: 6, name: "مكياج", image: "/products/cat-makeup.png" },
  { id: 7, name: "عناية", image: "/products/cat-care.png" },
  { id: 8, name: "إكسسوارات", image: "/products/cat-accessories.png" },
];

export default function CategoryCircles() {
  return (
    <section className="rounded-[28px] bg-white p-4 shadow-sm lg:p-6">
      <div className="mb-4 flex items-center justify-between">
        <button className="text-sm text-neutral-500 lg:text-base">
          عرض الكل
        </button>
        <h2 className="text-lg font-bold lg:text-2xl">الفئات</h2>
      </div>

      <div className="grid grid-cols-4 gap-x-3 gap-y-5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {categories.map((category) => (
          <button key={category.id} className="text-center">
            <div className="relative mx-auto h-[74px] w-[74px] overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 sm:h-[82px] sm:w-[82px] lg:h-[96px] lg:w-[96px]">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-xs leading-5 text-neutral-800 sm:text-sm lg:text-[15px]">
              {category.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}