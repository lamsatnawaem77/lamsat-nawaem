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

export type CartItem = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
};

type AddToCartItem = {
  id: number | string;
  name: string;
  price: number;
  image: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: AddToCartItem, size?: string) => Promise<void>;
  removeFromCart: (id: number | string, size?: string) => Promise<void>;
  increaseQty: (id: number | string, size?: string) => Promise<void>;
  decreaseQty: (id: number | string, size?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  loading: boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "lamsat_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) return;

    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      setCart(saved ? JSON.parse(saved) : []);
    } catch {
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) return;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, user]);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const ref = doc(db, "users", user.uid, "meta", "cart");

    const unsubscribe = onSnapshot(
      ref,
      async (snapshot) => {
        const cloudCart = (snapshot.data()?.items as CartItem[]) ?? [];

        if (!snapshot.exists()) {
          const localRaw = localStorage.getItem(LOCAL_STORAGE_KEY);
          const localCart: CartItem[] = localRaw ? JSON.parse(localRaw) : [];

          if (localCart.length > 0) {
            await setDoc(ref, { items: localCart }, { merge: true });
            localStorage.removeItem(LOCAL_STORAGE_KEY);
            setCart(localCart);
          } else {
            setCart([]);
          }
        } else {
          setCart(cloudCart);
          localStorage.removeItem(LOCAL_STORAGE_KEY);
        }

        setLoading(false);
      },
      () => {
        setCart([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const persistCart = async (updated: CartItem[]) => {
    setCart(updated);

    if (!user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return;
    }

    const ref = doc(db, "users", user.uid, "meta", "cart");
    await setDoc(ref, { items: updated }, { merge: true });
  };

  const addToCart = async (product: AddToCartItem, size?: string) => {
    const existingItem = cart.find(
      (item) => item.id === product.id && item.size === size
    );

    let updated: CartItem[];

    if (existingItem) {
      updated = cart.map((item) =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [...cart, { ...product, size, quantity: 1 }];
    }

    await persistCart(updated);
  };

  const removeFromCart = async (id: number | string, size?: string) => {
    const updated = cart.filter(
      (item) => !(item.id === id && item.size === size)
    );
    await persistCart(updated);
  };

  const increaseQty = async (id: number | string, size?: string) => {
    const updated = cart.map((item) =>
      item.id === id && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    await persistCart(updated);
  };

  const decreaseQty = async (id: number | string, size?: string) => {
    const updated = cart
      .map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    await persistCart(updated);
  };

  const clearCart = async () => {
    await persistCart([]);
  };

  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}