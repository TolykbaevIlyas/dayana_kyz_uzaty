import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Playfair_Display,
  Raleway,
} from "next/font/google";
import { InvitationProvider } from "@/context/InvitationContext";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500"],
  variable: "--font-raleway",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Қыз Ұзату — Даяна",
  description:
    "Приглашение на торжество Қыз Ұзату — Даяна, 29 августа 2026",
  openGraph: {
    title: "Қыз Ұзату — Даяна",
    description: "Вы приглашены на особенный вечер",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${raleway.variable} ${cormorant.variable} ${playfair.variable}`}
    >
      <body suppressHydrationWarning>
        <InvitationProvider>{children}</InvitationProvider>
      </body>
    </html>
  );
}
