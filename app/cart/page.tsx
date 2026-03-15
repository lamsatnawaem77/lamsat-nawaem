"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [error, setError] = useState("");

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p>🛒 السلة فارغة</p>
        <Link href="/products" className="text-pink-500 mt-4">
          العودة للتسوق
        </Link>
      </div>
    );
  }

  const phoneNumber = "905301106809"; // رقمك بدون +

  const message = `
🛍️ طلب جديد – لمسة نواعم

👤 الاسم: ${customerName}
📞 الهاتف: ${customerPhone}

🕒 الحالة: جاري مراجعة الطلب

${cart
  .map(
    (item) =>
      `• ${item.name}
الكمية: ${item.quantity}
السعر: $${item.price * item.quantity}`
  )
  .join("\n\n")}

------------------
💰 المجموع: $${totalPrice}
`;

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleSendOrder = () => {
    if (!customerName || !customerPhone) {
      setError("⚠️ يرجى إدخال الاسم ورقم الهاتف");
      return;
    }
    setError("");
    window.open(whatsappLink, "_blank");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🛒 سلة التسوق</h1>

      {/* بيانات الزبون */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 space-y-3">
        <input
          type="text"
          placeholder="الاسم الكامل"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="tel"
          placeholder="رقم الهاتف"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="w-full border p-2 rounded"
        />

        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* المنتجات */}
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow flex gap-4 items-center"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded"
            />

            <div className="flex-1">
              <h2 className="font-bold">{item.name}</h2>
              <p className="text-pink-500">
                ${item.price * item.quantity}
              </p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQty(item.id)}
                  className="px-3 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* الإجمالي */}
      <div className="bg-white p-4 rounded-xl shadow mt-6">
        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي</span>
          <span>${totalPrice}</span>
        </div>

        <button
          onClick={handleSendOrder}
          className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600"
        >
          إرسال الطلب عبر واتساب 💬
        </button>
      </div>
    </main>
  );
}
