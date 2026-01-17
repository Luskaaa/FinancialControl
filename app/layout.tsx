import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/Header";
import GridDebug from "./components/debug/GridDebug";

export const metadata: Metadata = {
  title: "Controle de Gastos",
  description: "A simple expense tracking application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">        
        <main className="min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 gap-4 py-10 px-4 items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
