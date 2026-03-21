"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Menu, Search, ShoppingBag, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const navCategories = ["عبايات", "فساتين", "أطقم", "بلوزات"];

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <header className="fixed top-0 left-0 z-30 w-full">
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
                <button type="submit" className="rounded-full bg-white/10 p-2">
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

              <Link href="/cart" className="relative rounded-full bg-white/10 p-2">
                <ShoppingBag size={18} />
                {totalCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white">
                    {totalCount}
                  </span>
                )}
              </Link>

              <Link href="/favorites" className="rounded-full bg-white/10 p-2 lg:hidden">
                <Heart size={18} />
              </Link>

              <button className="rounded-full bg-white/10 p-2 lg:hidden">
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
  );
}