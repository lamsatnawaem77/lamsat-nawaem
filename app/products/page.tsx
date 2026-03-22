import { Suspense } from "react";
import ProductsClientPage from "./ProductsClientPage";
import { products } from "../data/products";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-center">جاري تحميل المنتجات...</p>
        </main>
      }
    >
      <ProductsClientPage products={products} />
    </Suspense>
  );
}