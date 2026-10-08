import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CompareProvider } from "./compare-provider";
import NavigationBar from "./components/navigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Motos Colombia Comparador",
    default: "Motos Colombia Comparador - Encuentra tu moto ideal",
  },
  description: "Compara precios, especificaciones técnicas, y características de las mejores motos en Colombia. Yamaha, Suzuki, Honda, KTM y más.",
  keywords: ["motos", "colombia", "comparador", "precios de motos", "yamaha", "suzuki", "ktm", "honda", "comprar moto"],
  openGraph: {
    title: "Motos Colombia Comparador",
    description: "Compara precios y especificaciones técnicas de las mejores motos en Colombia.",
    url: "https://tu-dominio.com",
    siteName: "Motos Colombia Comparador",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Motos Colombia Comparador",
    description: "Compara precios y especificaciones técnicas de las mejores motos en Colombia.",
  },
};

import Footer from "./components/footer";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col w-full">
        <CompareProvider>
          <NavigationBar />
          {children}
          <Footer />
        </CompareProvider>
      </body>
    </html>
  );
}
