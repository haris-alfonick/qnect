import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CartProvider from "@/components/CartProvider";

const sen = Sen({
  weight: ["400", "500", "600", "700", "800"],
  subsets:['latin'],
  display:'swap',
})

export const metadata: Metadata = {
  title: "Qnect",
  description: "Qnect - Your Connection Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sen.className} antialiased`}>
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
