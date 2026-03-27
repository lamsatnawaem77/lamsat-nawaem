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
  isFavorite: (id: string) => boolean;
  toggleFavorite: (product: Product) => Promise<void>;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const ref = doc(db, "users", user.uid, "meta", "favorites");

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const cloudFavorites = (snapshot.data()?.items as Product[]) ?? [];
        setFavorites(cloudFavorites);
        setLoading(false);
      },
      () => {
        setFavorites([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  const toggleFavorite = async (product: Product) => {
    if (!user) {
      return;
    }

    const exists = favorites.some((item) => item.id === product.id);
    const updated = exists
      ? favorites.filter((item) => item.id !== product.id)
      : [...favorites, product];

    setFavorites(updated);

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