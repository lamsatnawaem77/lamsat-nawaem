import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/app/components/AddToCartButton";

const products = [
  { id: 1, name: "منتج 1", price: 25, image: "/products/products1.png" },
  { id: 2, name: "منتج 2", price: 30, image: "/products/products2.png" },
  { id: 3, name: "منتج 3", price: 20, image: "/products/products3.png" },
];

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center mt-10 text-red-500 font-bold">
        ❌ المنتج غير موجود
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-pink-50 p-6">
      <div className="bg-white p-6 rounded-xl shadow max-w-md w-full text-center space-y-4">

        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={250}
          className="mx-auto rounded-lg"
        />

        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="text-pink-600 font-bold text-lg">
          ${product.price}
        </p>

        <AddToCartButton product={product} />

        <Link
          href="/products"
          className="block text-pink-600 underline"
        >
          ← الرجوع للمنتجات
        </Link>
      </div>
    </main>
  );
}
