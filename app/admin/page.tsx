"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const addProduct = async () => {
    if (!name || !price) return alert("كمل البيانات");

    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      image,
      description,
    });

    alert("تمت إضافة المنتج ✅");
    setName("");
    setPrice("");
    setImage("");
    setDescription("");
  };

  return (
    <main className="min-h-screen p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">لوحة التحكم</h1>

      <input
        placeholder="اسم المنتج"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <input
        placeholder="السعر"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <input
        placeholder="رابط الصورة"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-2 mb-2"
      />

      <textarea
        placeholder="وصف المنتج"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 mb-4"
      />

      <button
        onClick={addProduct}
        className="w-full bg-pink-500 text-white py-2 rounded"
      >
        إضافة المنتج
      </button>
    </main>
  );
}
