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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

const title = "Қыз ұзату — Даяна";
const description =
  "Келініздер, қуанышымыздың қадірменді қонағы болыныздар! Приглашаем вас стать почетными гостями нашей радости. Сіздерді аяулы қызымыз Даянаның ұзату тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы болуға шақырамыз!";
const previewImage = "/images/hero-image.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Қыз ұзату — Даяна",
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Даяна — Қыз ұзату",
      },
    ],
    locale: "ru_RU",
    alternateLocale: ["kk_KZ"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [previewImage],
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
