"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const {
    user,
    loading: authLoading,
    isAdmin,
    login,
    loginWithGoogle,
    loginWithFacebook,
    loginWithMicrosoft,
  } = useAuth();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, authLoading, isAdmin, router]);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setError("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await login(email, password);
    } catch (error: any) {
      console.error("Email login error:", error);
      setError("فشل تسجيل الدخول. تأكدي من البريد وكلمة المرور.");
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithGoogle();
    } catch (error: any) {
      console.error("Google login error:", error);
      setError("فشل تسجيل الدخول بحساب Google.");
      setLoading(false);
    }
  };

  const handleMicrosoft = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithMicrosoft();
    } catch (error: any) {
      console.error("Microsoft login error:", error);
      setError("فشل تسجيل الدخول بحساب Microsoft.");
      setLoading(false);
    }
  };

  const handleFacebook = async () => {
    try {
      setLoading(true);
      setError("");
      await loginWithFacebook();
    } catch (error: any) {
      console.error("Facebook login error:", error);
      setError("فشل تسجيل الدخول بحساب Facebook.");
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

        <h1 className="mb-6 text-center text-2xl font-bold">تسجيل الدخول</h1>

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

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <button
          onClick={handleLogin}
          disabled={loading || authLoading}
          className="mb-3 w-full rounded-lg bg-pink-500 py-3 text-white transition hover:bg-pink-600 disabled:opacity-60"
        >
          {loading ? "جاري تسجيل الدخول..." : "دخول"}
        </button>

        <div className="my-4 text-center text-sm text-gray-500">أو</div>

        <button
          onClick={handleGoogle}
          disabled={loading || authLoading}
          className="mb-3 w-full rounded-lg border py-3 transition hover:bg-gray-50 disabled:opacity-60"
        >
          المتابعة باستخدام Google
        </button>

        <button
          onClick={handleMicrosoft}
          disabled={loading || authLoading}
          className="mb-3 w-full rounded-lg border py-3 transition hover:bg-gray-50 disabled:opacity-60"
        >
          المتابعة باستخدام Microsoft
        </button>

        <button
          onClick={handleFacebook}
          disabled={loading || authLoading}
          className="w-full rounded-lg border py-3 transition hover:bg-gray-50 disabled:opacity-60"
        >
          المتابعة باستخدام Facebook
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          ليس لديك حساب؟{" "}
          <Link href="/register" className="font-semibold text-pink-600">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
}