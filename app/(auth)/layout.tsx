import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import type React from "react";
import "../globals.css";
export const metadata = {
  title: "Bird",
  description: "Bird - A Next.js 16 Social Media App.",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div className="flex min-h-screen w-full items-center justify-center">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
