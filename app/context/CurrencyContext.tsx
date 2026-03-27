"use client";

import { createContext, useContext, useMemo, useState } from "react";

type Currency = "TRY" | "USD";

type CurrencyContextType = {
  currency: Currency;
  toggleCurrency: () => void;
  formatPrice: (priceTry: number) => string;
  convertPrice: (priceTry: number) => number;
};

const CurrencyContext = createContext<CurrencyContextType | null>(null);

// السعر الأساسي في الموقع بالليرة التركية
// 1 USD = 32 TRY
const USD_RATE = 32;

export function CurrencyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>("TRY");

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "TRY" ? "USD" : "TRY"));
  };

  const convertPrice = (priceTry: number) => {
    if (currency === "TRY") return priceTry;
    return priceTry / USD_RATE;
  };

  const formatPrice = (priceTry: number) => {
    if (currency === "TRY") {
      return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        maximumFractionDigits: 2,
      }).format(priceTry);
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(priceTry / USD_RATE);
  };

  const value = useMemo(
    () => ({
      currency,
      toggleCurrency,
      formatPrice,
      convertPrice,
    }),
    [currency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }

  return context;
}