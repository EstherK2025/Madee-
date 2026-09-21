import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Announce from "./components/Announce";

export const metadata: Metadata = {
  title: {
    default: "Madee — L'élégance modeste, réinventée",
    template: "%s · Madee",
  },
  description:
    "Madee, maison de mode modeste et interculturelle. Des pièces raffinées qui permettent à la femme noire de s'affirmer et de se sentir pleinement elle-même.",
  openGraph: {
    title: "Madee — L'élégance modeste, réinventée",
    description:
      "Maison de mode modeste et interculturelle, pensée pour la femme qui s'affirme.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/jpeg" href="/madee-logo-green.jpg" />
      </head>
      <body>
        <CartProvider>
          <Announce />
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
