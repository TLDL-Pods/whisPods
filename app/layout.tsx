import "./globals.css";
import type { Metadata } from "next";
import { EpisodeProvider } from "./contexts/dataContext";
import Navbar from "./Navbar";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "TLDL",
  description: "Too Long Didn't Listen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen text-white bg-stone-900">
        <EpisodeProvider>
          <Navbar>{children}</Navbar>
        </EpisodeProvider>
        <Analytics />
      </body>
    </html>
  );
}
