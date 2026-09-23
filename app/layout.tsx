import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Announce from "./components/Announce";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Madee — L'élégance, autrement",
    template: "%s · Madee",
  },
  description:
    "Madee, maison de mode. Des pièces élégantes qui permettent à chaque femme de se sentir belle, confiante et pleinement elle-même.",
  openGraph: {
    title: "Madee — L'élégance, autrement",
    description:
      "Des silhouettes pensées pour révéler votre allure. Découvrez notre première collection.",
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
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&display=swap"
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
