"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [colors, setColors] = useState("");
  const [images, setImages] = useState("");
  const [size1, setSize1] = useState("");
  const [price1, setPrice1] = useState("");
  const [size2, setSize2] = useState("");
  const [price2, setPrice2] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "products"), {
        name,
        description,
        material,
        colors: colors
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        images: images
          .split(",")
          .map((img) => img.trim())
          .filter(Boolean),
        sizeOptions: [
          ...(size1 && price1 ? [{ size: size1, price: Number(price1) }] : []),
          ...(size2 && price2 ? [{ size: size2, price: Number(price2) }] : []),
        ],
      });

      setName("");
      setDescription("");
      setMaterial("");
      setColors("");
      setImages("");
      setSize1("");
      setPrice1("");
      setSize2("");
      setPrice2("");
      setMessage("تمت إضافة المنتج بنجاح 🌸");
    } catch (error) {
      console.error(error);
      setMessage("حدث خطأ أثناء إضافة المنتج");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">لوحة المشرف</h1>

      <form
        onSubmit={handleAddProduct}
        className="bg-white rounded-2xl shadow-md p-6 space-y-5"
      >
        <div>
          <label className="block mb-2 font-semibold">اسم المنتج</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">الوصف</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">الخامة</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            الألوان (افصلي بينها بفاصلة)
          </label>
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            placeholder="ذهبي, أبيض دافئ"
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            روابط الصور أو مساراتها (افصلي بينها بفاصلة)
          </label>
          <input
            type="text"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            placeholder="/products/bradi-light-1.jpeg, /products/bradi-light-2.jpeg"
            className="w-full border rounded-xl px-4 py-3"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-semibold">المقاس الأول</label>
            <input
              type="text"
              value={size1}
              onChange={(e) => setSize1(e.target.value)}
              placeholder="3×2"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">سعر المقاس الأول</label>
            <input
              type="number"
              value={price1}
              onChange={(e) => setPrice1(e.target.value)}
              placeholder="345"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">المقاس الثاني</label>
            <input
              type="text"
              value={size2}
              onChange={(e) => setSize2(e.target.value)}
              placeholder="3×3"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">سعر المقاس الثاني</label>
            <input
              type="number"
              value={price2}
              onChange={(e) => setPrice2(e.target.value)}
              placeholder="385"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl shadow-md transition"
        >
          {loading ? "جاري الإضافة..." : "إضافة المنتج"}
        </button>

        {message && (
          <p className="text-center text-sm font-semibold text-pink-600">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}