import Image from "next/image";
import Link from "next/link";

const products = [
  { id: 1, name: "منتج 1", price: 25, image: "/products/products1.png" },
  { id: 2, name: "منتج 2", price: 30, image: "/products/products2.png" },
  { id: 3, name: "منتج 3", price: 20, image: "/products/products3.png" },
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-8">
        منتجات لمسة نواعم 💗
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow text-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="mx-auto mb-4"
            />

            <h2 className="font-bold mb-2">{product.name}</h2>
            <p className="text-pink-600 mb-4">${product.price}</p>

            <Link
              href={`/products/${product.id}`}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
