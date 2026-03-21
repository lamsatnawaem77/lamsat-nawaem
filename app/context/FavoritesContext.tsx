"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "./AuthContext";
import type { Product } from "../types";

type FavoritesContextType = {
  favorites: Product[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (product: Product) => Promise<void>;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "lamsat_favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // تحميل محلي للمستخدم غير المسجل
  useEffect(() => {
    if (user) return;

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // حفظ محلي عند عدم تسجيل الدخول
  useEffect(() => {
    if (user) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites, user]);

  // ربط المفضلات بـ Firestore عند تسجيل الدخول
  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const ref = doc(db, "users", user.uid, "meta", "favorites");

    const unsubscribe = onSnapshot(
      ref,
      async (snapshot) => {
        const cloudFavorites = (snapshot.data()?.items as Product[]) ?? [];

        // أول مرة فقط: لو توجد مفضلات محلية ولم يوجد ملف سحابي، ارفعها
        if (!snapshot.exists()) {
          const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
          const localFavorites: Product[] = localRaw ? JSON.parse(localRaw) : [];

          if (localFavorites.length > 0) {
            await setDoc(ref, { items: localFavorites }, { merge: true });
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setFavorites(localFavorites);
          } else {
            setFavorites([]);
          }
        } else {
          setFavorites(cloudFavorites);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        setLoading(false);
      },
      () => {
        setFavorites([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const isFavorite = (id: number) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = async (product: Product) => {
    const exists = favorites.some((item) => item.id === product.id);
    const updated = exists
      ? favorites.filter((item) => item.id !== product.id)
      : [...favorites, product];

    setFavorites(updated);

    if (!user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return;
    }

    const ref = doc(db, "users", user.uid, "meta", "favorites");
    await setDoc(ref, { items: updated }, { merge: true });
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      loading,
    }),
    [favorites, loading]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
}