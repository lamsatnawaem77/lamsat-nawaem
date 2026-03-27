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
  Shield,
  Pin,
  PinOff,
  ChevronDown,
  Instagram,
  MessageCircle,
  Music2,
  Facebook,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useCurrency } from "../context/CurrencyContext";

const navCategories = ["عبايات", "فساتين", "أطقم", "بلوزات"];

const CONTACTS = {
  whatsapp:
    "https://wa.me/905301106809?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A3%D8%AD%D8%AF%20%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA%D9%83%D9%85",
  instagram: "https://www.instagram.com/lllbshylwf?igsh=YTk2eTBmMjk1cnNz",
  tiktok: "https://www.tiktok.com/@user5021360799849?_r=1&_t=ZS-952iZAf3VN2",
  facebook: "https://www.facebook.com/share/19ESqWpLZL/",
  whatsappLabel: "+90 530 110 68 09",
};

export default function Navbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [manualMode, setManualMode] = useState(false);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  const { cart } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const { currency, toggleCurrency } = useCurrency();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const startHideTimer = () => {
    clearHideTimer();

    hideTimerRef.current = setTimeout(() => {
      if (window.scrollY > 10 && !mobileMenuOpen && !manualMode) {
        setShowNavbar(false);
      }
    }, 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (manualMode) return;

      const currentScrollY = window.scrollY;
      const lastScrollY = lastScrollYRef.current;

      if (currentScrollY <= 10) {
        setShowNavbar(false);
        clearHideTimer();
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const scrollingDown = currentScrollY > lastScrollY;
      const scrollingUp = currentScrollY < lastScrollY;

      if (scrollingDown || scrollingUp) {
        setShowNavbar(true);
        startHideTimer();
      }

      lastScrollYRef.current = currentScrollY;
    };

    const handleUserActivity = () => {
      if (manualMode) return;

      if (window.scrollY > 10 && !mobileMenuOpen) {
        setShowNavbar(true);
        startHideTimer();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleUserActivity, { passive: true });
    window.addEventListener("touchmove", handleUserActivity, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleUserActivity);
      window.removeEventListener("touchmove", handleUserActivity);
      clearHideTimer();
    };
  }, [manualMode, mobileMenuOpen]);

  useEffect(() => {
    if (manualMode) {
      setShowNavbar(true);
      clearHideTimer();
      return;
    }

    if (mobileMenuOpen) {
      setShowNavbar(true);
      clearHideTimer();
    } else if (typeof window !== "undefined" && window.scrollY > 10) {
      startHideTimer();
    }
  }, [manualMode, mobileMenuOpen]);

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

  const enableManualMode = () => {
    setManualMode(true);
    setShowNavbar(true);
    clearHideTimer();
  };

  const enableAutoMode = () => {
    setManualMode(false);

    if (typeof window !== "undefined" && window.scrollY <= 10) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
      startHideTimer();
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 top-0 z-[500] w-full transition-all duration-500 ease-out ${
          showNavbar
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-3 pt-3 sm:px-4 lg:px-6 lg:pt-5">
          <div className="rounded-2xl border border-white/10 bg-black/25 px-3 py-3 shadow-xl backdrop-blur-md lg:px-5">
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

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
                  >
                    لوحة الأدمن
                  </Link>
                )}
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
                    className="w-44 rounded-full bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/70 outline-none ring-1 ring-white/10"
                  />
                  <button
                    type="submit"
                    className="rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                  >
                    <Search size={18} />
                  </button>
                </form>

                <button
                  type="button"
                  onClick={toggleCurrency}
                  className="rounded-full bg-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  aria-label="تغيير العملة"
                  title="تغيير العملة"
                >
                  {currency === "TRY" ? "₺ TRY" : "$ USD"}
                </button>

                <div className="hidden items-center gap-2 lg:flex">
                  <span className="mr-1 text-xs font-semibold text-white/80">
                    تابعينا
                  </span>

                  <a
                    href={CONTACTS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-green-500/90 p-2 text-white shadow-md transition hover:scale-105 hover:bg-green-500"
                    aria-label="واتساب"
                    title="واتساب"
                  >
                    <MessageCircle size={18} />
                  </a>

                  <a
                    href={CONTACTS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 p-2 text-white shadow-md transition hover:scale-105"
                    aria-label="إنستجرام"
                    title="إنستجرام"
                  >
                    <Instagram size={18} />
                  </a>

                  <a
                    href={CONTACTS.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/15 p-2 text-white shadow-md ring-1 ring-white/15 transition hover:scale-105 hover:bg-white/25"
                    aria-label="تيك توك"
                    title="تيك توك"
                  >
                    <Music2 size={18} />
                  </a>

                  <a
                    href={CONTACTS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-blue-600 p-2 text-white shadow-md transition hover:scale-105 hover:bg-blue-700"
                    aria-label="فيسبوك"
                    title="فيسبوك"
                  >
                    <Facebook size={18} />
                  </a>
                </div>

                <button
                  type="button"
                  onClick={manualMode ? enableAutoMode : enableManualMode}
                  className="hidden rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:block"
                  aria-label={manualMode ? "تفعيل الوضع التلقائي" : "تثبيت الهيدر"}
                  title={manualMode ? "رجوع إلى Auto" : "تثبيت الهيدر Manual"}
                >
                  {manualMode ? <PinOff size={18} /> : <Pin size={18} />}
                </button>

                <Link
                  href="/favorites"
                  className="hidden rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:block"
                >
                  <Heart size={18} />
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:block"
                    aria-label="لوحة الأدمن"
                  >
                    <Shield size={18} />
                  </Link>
                )}

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="hidden rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:block"
                    aria-label="تسجيل الخروج"
                    type="button"
                  >
                    <LogOut size={18} />
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="hidden rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:block"
                  >
                    <User size={18} />
                  </Link>
                )}

                <Link
                  href="/cart"
                  className="relative rounded-full bg-white/10 p-2 transition hover:bg-white/20"
                >
                  <ShoppingBag size={18} />
                  {totalCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-500 text-xs text-white shadow">
                      {totalCount}
                    </span>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={manualMode ? enableAutoMode : enableManualMode}
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:hidden"
                  aria-label={manualMode ? "تفعيل الوضع التلقائي" : "تثبيت الهيدر"}
                >
                  {manualMode ? <PinOff size={18} /> : <Pin size={18} />}
                </button>

                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className="rounded-full bg-white/10 p-2 transition hover:bg-white/20 lg:hidden"
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
                    className="pb-1 transition hover:text-white"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {!showNavbar && (
        <button
          type="button"
          onClick={enableManualMode}
          className="fixed left-4 top-4 z-[700] flex h-11 w-11 items-center justify-center rounded-full bg-black/75 text-white shadow-lg backdrop-blur-sm transition hover:scale-105"
          aria-label="إظهار الهيدر"
          title="إظهار الهيدر وتثبيته"
        >
          <ChevronDown size={20} />
        </button>
      )}

      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="إغلاق القائمة"
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[590] bg-black/50 lg:hidden"
          />

          <aside className="fixed right-0 top-0 z-[600] h-full w-80 max-w-[85%] overflow-y-auto bg-white p-5 text-right shadow-2xl lg:hidden">
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

            <div className="mb-6 border-b pb-5">
              <button
                type="button"
                onClick={toggleCurrency}
                className="w-full rounded-xl border px-4 py-3 text-center font-semibold"
              >
                {currency === "TRY"
                  ? "العملة الحالية: الليرة التركية ₺"
                  : "Current currency: USD $"}
              </button>
            </div>

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

              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-xl bg-black px-3 py-2 text-white"
                >
                  لوحة الأدمن
                </Link>
              )}
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

            <div className="mb-6 space-y-3 border-b pb-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-500">تواصل معنا</p>
                <span className="text-xs text-gray-400">تابعينا أيضًا</span>
              </div>

              <a
                href={CONTACTS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-green-50 px-4 py-3 transition hover:bg-green-100"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-green-500 p-2 text-white">
                    <MessageCircle size={16} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">واتساب</p>
                    <p className="text-xs text-gray-500">تواصل مباشر للطلبات والاستفسار</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">{CONTACTS.whatsappLabel}</span>
              </a>

              <a
                href={CONTACTS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-pink-50 px-4 py-3 transition hover:bg-pink-100"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 p-2 text-white">
                    <Instagram size={16} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">إنستجرام</p>
                    <p className="text-xs text-gray-500">شاهدي الصور والموديلات الجديدة</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">فتح الحساب</span>
              </a>

              <a
                href={CONTACTS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-gray-100 px-4 py-3 transition hover:bg-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-black p-2 text-white">
                    <Music2 size={16} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">تيك توك</p>
                    <p className="text-xs text-gray-500">شاهدي المحتوى والعروض والفيديوهات</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">فتح الحساب</span>
              </a>

              <a
                href={CONTACTS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3 transition hover:bg-blue-100"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-blue-600 p-2 text-white">
                    <Facebook size={16} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">فيسبوك</p>
                    <p className="text-xs text-gray-500">تابعي الصفحة والمنشورات والعروض</p>
                  </div>
                </div>
                <span className="text-xs text-gray-600">فتح الصفحة</span>
              </a>
            </div>

            <div className="mb-6 border-b pb-5">
              <button
                type="button"
                onClick={manualMode ? enableAutoMode : enableManualMode}
                className="w-full rounded-xl border px-4 py-3 text-center"
              >
                {manualMode ? "الرجوع إلى الوضع التلقائي Auto" : "تثبيت الهيدر Manual"}
              </button>
            </div>

            <div className="space-y-3">
              {user ? (
                <>
                  <div className="rounded-xl bg-gray-100 px-3 py-3 text-sm text-gray-700">
                    <p className="mb-1 font-semibold">الحساب المسجل</p>
                    <p className="break-all">{user.email}</p>
                    {isAdmin && (
                      <p className="mt-2 font-semibold text-green-600">
                        هذا الحساب أدمن
                      </p>
                    )}
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