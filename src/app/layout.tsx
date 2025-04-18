import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import StoreProvider from "./StoreProvider";

const sen = Sen({
  weight: ["400", "500", "600", "700", "800"],
  subsets:['latin'],
  display:'swap',
})

export const metadata: Metadata = {
  title: "Qnect | Home",
  description: "Made By Augmentifyinc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sen.className} antialiased`}>
        <StoreProvider>
          
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
