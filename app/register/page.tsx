"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    if (password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف أو أكثر");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");
      await register(email, password);
      setMessage("تم إنشاء الحساب. أرسلنا رسالة تحقق إلى بريدك الإلكتروني.");
      router.push("/");
    } catch {
      setError("فشل إنشاء الحساب. ربما البريد مستخدم مسبقًا.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-5 flex justify-start">
          <Link
            href="/"
            className="rounded-full border bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
          >
            العودة إلى الرئيسية
          </Link>
        </div>

        <h1 className="mb-6 text-center text-2xl font-bold">إنشاء حساب</h1>

        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3 text-right outline-none focus:border-pink-400"
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3 text-right outline-none focus:border-pink-400"
        />

        <input
          type="password"
          placeholder="تأكيد كلمة المرور"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 w-full rounded-lg border p-3 text-right outline-none focus:border-pink-400"
        />

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        {message && (
          <p className="mb-4 text-center text-sm text-green-600">{message}</p>
        )}

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full rounded-lg bg-pink-500 py-3 text-white transition hover:bg-pink-600 disabled:opacity-60"
        >
          {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          لديك حساب؟{" "}
          <Link href="/login" className="font-semibold text-pink-600">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}