"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, totalPrice } = useCart();
  const { formatPrice, currency } = useCurrency();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState("");

  const handleCheckout = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setError("يرجى إدخال الاسم ورقم الهاتف");
      return;
    }

    setError("");

    const orderText = cart
      .map(
        (item) =>
          `• ${item.name}${item.size ? ` - المقاس: ${item.size}` : ""} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
      )
      .join("%0A");

    const totalFormatted = formatPrice(totalPrice);

    const message =
      `مرحباً، أريد تأكيد الطلب:%0A%0A` +
      `الاسم: ${customerName}%0A` +
      `رقم الهاتف: ${customerPhone}%0A` +
      `العملة المختارة: ${currency}%0A%0A` +
      `الطلبات:%0A${orderText}%0A%0A` +
      `المجموع: ${totalFormatted}`;

    const phoneNumber = "905301106809";
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-lg mb-4">🛒 السلة فارغة</p>
        <Link href="/products" className="text-pink-500 font-semibold">
          العودة للتسوق
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 md:px-10">
      <div className="mb-8 flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold text-center">سلة التسوق</h1>
        <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold">
          {currency === "TRY" ? "₺ TRY" : "$ USD"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size ?? "no-size"}`}
              className="flex flex-col md:flex-row items-center gap-4 border rounded-2xl p-4 shadow-sm"
            >
              <div className="relative w-28 h-28 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <div className="flex-1 w-full text-center md:text-right">
                <h2 className="text-lg font-semibold">{item.name}</h2>

                {item.size && (
                  <p className="text-sm text-gray-500 mt-1">المقاس: {item.size}</p>
                )}

                <p className="text-pink-600 font-bold mt-2">
                  {formatPrice(item.price)}
                </p>

                <div className="flex items-center justify-center md:justify-start gap-3 mt-4">
                  <button
                    onClick={() => decreaseQty(item.id, item.size)}
                    className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                  >
                    -
                  </button>

                  <span className="min-w-[24px] text-center font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQty(item.id, item.size)}
                    className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center gap-3">
                <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-2xl p-5 shadow-sm h-fit">
          <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>

          <div className="flex justify-between mb-3">
            <span>عدد المنتجات</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>

          <div className="flex justify-between text-lg font-bold border-t pt-4 mb-5">
            <span>المجموع</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <div className="mb-6 flex justify-start">
            <Link
              href="/"
              className="rounded-full border bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              العودة إلى الرئيسية
            </Link>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

            <input
              type="text"
              placeholder="رقم الهاتف"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-400"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              onClick={handleCheckout}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-xl py-3 font-semibold transition"
            >
              إتمام الطلب عبر واتساب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}