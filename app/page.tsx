import CategoryCircles from "./components/CategoryCircles";
import FeatureStrip from "./components/FeatureStrip";
import HomeProducts from "./components/HomeProducts";
import { products } from "./data/products";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f8f3ee] pb-10 pt-44 lg:pt-52">
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="relative z-20 -mt-6 lg:-mt-10">
          <FeatureStrip />
        </div>

        <div className="mt-4 lg:mt-8">
          <CategoryCircles />
        </div>

        <div className="mt-5 lg:mt-8">
          <HomeProducts title="وصل حديثًا" products={products.slice(0, 4)} />
        </div>

        <section className="mt-5 overflow-hidden rounded-[28px] bg-gradient-to-l from-[#d8b4a0] to-[#f4e1d8] p-5 shadow-sm lg:mt-8 lg:p-8">
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
            <div className="text-right">
              <p className="text-sm text-neutral-700 lg:text-base">عرض خاص</p>
              <h3 className="mt-1 text-2xl font-bold lg:text-4xl">
                خصم حتى 40%
              </h3>
              <p className="mt-2 max-w-2xl text-sm text-neutral-700 lg:text-base">
                على العبايات والفساتين والمنتجات المختارة لفترة محدودة.
              </p>
            </div>

            <button className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 lg:text-base">
              تسوقي الآن
            </button>
          </div>
        </section>

        <div className="mt-5 lg:mt-8">
          <HomeProducts title="الأكثر طلبًا" products={products.slice(0, 4)} />
        </div>
      </div>
    </main>
  );
}