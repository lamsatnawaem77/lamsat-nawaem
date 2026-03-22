"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  LogOut,
  X,
} from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navCategories = ["عبايات", "فساتين", "أطقم", "بلوزات"];

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(search)}`);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed left-0 top-0 z-[500] w-full">
        <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-4 lg:px-6 lg:pt-5">
          <div className="rounded-2xl bg-black/20 px-3 py-3 backdrop-blur-sm lg:px-5">
            <div className="flex items-center justify-between text-white">
              <div className="hidden items-center gap-5 lg:flex">
                <Link href="/" className="text-sm hover:opacity-80">
                  الرئيسية
                </Link>
                <Link href="/products" className="text-sm hover:opacity-80">
                  المنتجات
                </Link>
                <Link href="/products" className="text-sm hover:opacity-80">
                  الفئات
                </Link>
              </div>

              <Link href="/" className="text-center">
                <h1 className="text-xl font-extrabold tracking-[0.28em] sm:text-2xl lg:text-3xl">
                  LAMSAT
                </h1>
                <p className="mt-1 text-[10px] tracking-[0.25em] text-white/85 sm:text-[11px]">
                  NAWAEM
                </p>
              </Link>

              <div className="flex items-center gap-2">
                <form
                  onSubmit={handleSearch}
                  className="hidden items-center gap-2 lg:flex"
                >
                  <input
                    type="text"
                    placeholder="ابحثي..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-44 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/70 outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-white/10 p-2"
                  >
                    <Search size={18} />
                  </button>
                </form>

                <Link
                  href="/favorites"
                  className="hidden rounded-full bg-white/10 p-2 lg:block"
                >
                  <Heart size={18} />
                </Link>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="hidden rounded-full bg-white/10 p-2 lg:block"
                    aria-label="تسجيل الخروج"
                    type="button"
                  >
                    <LogOut size={18} />
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="hidden rounded-full bg-white/10 p-2 lg:block"
                  >
                    <User size={18} />
                  </Link>
                )}

                <Link
                  href="/cart"
                  className="relative rounded-full bg-white/10 p-2"
                >
                  <ShoppingBag size={18} />
                  {totalCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                      {totalCount}
                    </span>
                  )}
                </Link>

                <Link
                  href="/favorites"
                  className="rounded-full bg-white/10 p-2 lg:hidden"
                >
                  <Heart size={18} />
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="rounded-full bg-white/10 p-2 lg:hidden"
                  aria-label="فتح القائمة"
                >
                  <Menu size={20} />
                </button>
              </div>
            </div>

            <nav className="mt-4 overflow-x-auto lg:mt-5">
              <div className="flex min-w-max items-center gap-5 border-b border-white/20 pb-2 text-sm text-white/90 lg:justify-center lg:gap-8 lg:text-base">
                <Link
                  href="/products"
                  className="border-b-2 border-white pb-1 font-semibold text-white"
                >
                  الكل
                </Link>

                {navCategories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="pb-1"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[590] bg-black/50 lg:hidden"
          />

          <aside className="fixed right-0 top-0 z-[600] h-full w-80 max-w-[85%] bg-white p-5 text-right shadow-2xl lg:hidden">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-black">القائمة</h2>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border p-2 text-gray-700"
                aria-label="إغلاق القائمة"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSearch} className="mb-5 flex items-center gap-2">
              <input
                type="text"
                placeholder="ابحثي..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border px-4 py-2 text-sm outline-none"
              />

              <button
                type="submit"
                className="rounded-full bg-pink-500 p-2 text-white"
              >
                <Search size={18} />
              </button>
            </form>

            <div className="mb-6 space-y-3 border-b pb-5">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              >
                الرئيسية
              </Link>

              <Link
                href="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              >
                كل المنتجات
              </Link>

              <Link
                href="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              >
                المفضلة
              </Link>

              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 hover:bg-gray-100"
              >
                السلة
              </Link>
            </div>

            <div className="mb-6 space-y-3 border-b pb-5">
              <p className="text-sm font-bold text-gray-500">الفئات</p>

              {navCategories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl px-3 py-2 hover:bg-gray-100"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              {user ? (
                <>
                  <div className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700">
                    <p className="mb-1 font-semibold">الحساب المسجل</p>
                    <p className="break-all">{user.email}</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-black px-4 py-3 text-white"
                    type="button"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full rounded-xl bg-pink-500 px-4 py-3 text-center text-white"
                  >
                    تسجيل الدخول
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full rounded-xl border px-4 py-3 text-center"
                  >
                    إنشاء حساب
                  </Link>
                </>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}