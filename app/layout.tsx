import type { Metadata, Viewport } from "next";
import "./globals.css";
import { geist } from "./fonts";
import AntdThemeProvider from "./components/providers/AntdThemeProvider";
import { MascotProvider } from "@/src/mascot/engine/MascotProvider";
import { Mascot } from "@/src/mascot/components/Mascot";
import { MascotLoadingOverlay } from "@/src/mascot/components/MascotLoadingOverlay";
import { MascotDevPanel } from "@/src/mascot/engine/useMascotDevPanel";

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
    <html lang="pt-BR" className={geist.variable}>
      <body className="min-h-screen bg-canvas text-ink font-sans">
        <AntdThemeProvider>
          <MascotProvider>
            {children}
            <Mascot />
            <MascotLoadingOverlay />
            <MascotDevPanel />
          </MascotProvider>
        </AntdThemeProvider>
      </body>
    </html>
  );
}
