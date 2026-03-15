import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-pink-50 gap-6">
      <h1 className="text-4xl font-bold text-pink-600">
        ❤️ لمسة نواعم ❤️
      </h1>

      <Link
        href="/products"
        className="bg-pink-600 text-white px-6 py-3 rounded-xl"
      >
        دخول المتجر
      </Link>
    </main>
  );
}
