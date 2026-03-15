"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-pink-500 text-white">
      <Link href="/" className="font-bold text-lg">
        Lamsat Nawaem
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/products">المنتجات</Link>
        <Link href="/cart">السلة</Link>

        {user ? (
          <>
            <span>👋 {user.name}</span>
            <button
              onClick={logout}
              className="bg-white text-pink-500 px-3 py-1 rounded"
            >
              خروج
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-white text-pink-500 px-3 py-1 rounded"
          >
            دخول
          </Link>
        )}
      </div>
    </nav>
  );
}
