import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arroz & Linha Soft - Do arroz ao botão, tudo no seu controle!",
  description: "Sistema de PDV e gestão para mercadinhos e armarinhos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 bg-blue-900 text-white text-center py-2 text-sm">
          Powered by Arroz & Linha Soft – Do arroz ao botão, tudo no seu controle!
        </footer>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}