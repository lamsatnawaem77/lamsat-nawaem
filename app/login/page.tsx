"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-80">
        <h1 className="text-xl font-bold mb-4">تسجيل الدخول</h1>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={() => {
            login(email);
            router.push("/checkout");
          }}
          className="w-full bg-pink-500 text-white py-2 rounded"
        >
          دخول
        </button>
      </div>
    </div>
  );
}
