import type { Metadata } from "next";
import "./globals.css";
import {Inter as FontSans} from "next/font/google"
import {cn} from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner";
const fontSans=FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Clashing App",
  description: "Get your audience thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
     <body 
     className={cn(
      "min-h-screen bg-slate-100 font-sans antialiased",
      fontSans.variable
      )}
      >
        <Toaster richColors position="top-right" />
        {children}
        </body>
    </html>
  );
}
