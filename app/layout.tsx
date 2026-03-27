import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import ConditionalNavbar from "./components/ConditionalNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <CurrencyProvider>
                <ConditionalNavbar />
                {children}
              </CurrencyProvider>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}