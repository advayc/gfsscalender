import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GFSS Calendar | Glenforest Student Activity Council",
  description: "One clear place for every club, meeting, and school event at Glenforest Secondary School.",
  icons: {
    icon: "/gfss-calendar-mark.svg",
  },
  openGraph: {
    title: "GFSS Calendar",
    description: "Find every club, meeting, and school event at Glenforest Secondary School.",
    type: "website",
    images: ["/gfss-calendar-mark.svg"],
  },
  twitter: {
    card: "summary",
    title: "GFSS Calendar",
    description: "The shared calendar for Glenforest students.",
    images: ["/gfss-calendar-mark.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
