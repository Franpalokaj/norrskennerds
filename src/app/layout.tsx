import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Norrsken Workshop — Build Your AI Coaching System",
  description:
    "A 90-minute workshop where you build a personal AI coaching system using Claude.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#2b2a27] text-[#c4bfb6]">
        {children}
      </body>
    </html>
  );
}
