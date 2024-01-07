import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Instrument_Sans } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const APP_NAME = "Spend";
const APP_DEFAULT_TITLE = "Spend";
const APP_TITLE_TEMPLATE = "%s - Spend";
const APP_DESCRIPTION = "A simple budgeting app.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Spend",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="bg-background">{children}</body>
    </html>
  );
}
