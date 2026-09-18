import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopify e-Learning",
  description: "Shopifyを体系的に学ぶ e-learning プラットフォーム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
