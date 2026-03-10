import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mantall Stock Quotes",
  description: "Stock quotes and dividend tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <header className="border-b shadow-sm mb-4">
          <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="font-bold text-xl">Mantall Stock Quotes</div>
            <div className="text-sm text-gray-500">
              {new Date().toISOString().split("T")[0]}
            </div>
          </nav>
        </header>
        <main className="max-w-7xl mx-auto px-4 pb-8">{children}</main>
      </body>
    </html>
  );
}
