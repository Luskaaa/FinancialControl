import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/header/Header";
import GridDebug from "./components/debug/GridDebug";

export const metadata: Metadata = {
  title: "Controle de Gastos",
  description: "A simple expense tracking application.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="h-screen overflow-hidden">
        <main className="h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-2 md:gap-4 py-4 md:py-6 px-3 md:px-4 items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
