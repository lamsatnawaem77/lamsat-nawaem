"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";

export default function CheckoutPage() {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  // 🔐 حماية الصفحة
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

  const tax = subtotal * 0.05; // 5%
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
      <h1 className="text-2xl font-bold mb-6">💳 إتمام الشراء</h1>

      <div className="bg-white p-4 rounded-lg shadow space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <hr />

        <div className="flex justify-between">
          <span>المجموع الفرعي</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>الضريبة (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي</span>
          <span>${total.toFixed(2)}</span>
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
