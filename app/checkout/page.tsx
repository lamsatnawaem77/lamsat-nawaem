"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { useCurrency } from "@/app/context/CurrencyContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const { formatPrice, currency } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg">🛒 السلة فارغة</p>
        <Link
          href="/products"
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          الرجوع للمنتجات
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">💳 إتمام الشراء</h1>
        <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
          {currency === "TRY" ? "₺ TRY" : "$ USD"}
        </span>
      </div>

      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size ?? "no-size"}`}
            className="flex justify-between gap-3"
          >
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}

        <hr />

        <div className="flex justify-between">
          <span>المجموع الفرعي</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between">
          <span>الضريبة (5%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي</span>
          <span>{formatPrice(total)}</span>
        </div>

        <button
          onClick={() => {
            clearCart();
            alert("✅ تم الطلب بنجاح");
            router.push("/");
          }}
          className="w-full bg-pink-500 text-white py-2 rounded-lg mt-4"
        >
          تأكيد الطلب
        </button>
      </div>
    </main>
  );
}