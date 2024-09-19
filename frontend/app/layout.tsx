import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/utils/QueryProvider";

export const metadata: Metadata = {
  title: "Trasy - Travel Easily",
  description: "Travel booking website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
