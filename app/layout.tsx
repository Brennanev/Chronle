import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yearsy",
  description: "Guess the year of a historical event in six tries."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
