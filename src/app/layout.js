import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default: "Medi-Care",
    template: "%s | Medi-Care",
  },

  description:
    "Medi-Care is a trusted platform where you can find doctors and access quality medical care.",

  keywords: [
    "Medi-Care",
    "medical care",
    "doctors",
    "healthcare",
    "doctor appointment",
  ],

  authors: [{ name: "Medi-Care" }],

  openGraph: {
    title: "Medi-Care",
    description:
      "Find doctors and access quality medical care with Medi-Care.",
    type: "website",
    siteName: "Medi-Care",
  },

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main className="flex-grow flex flex-col">
          {children}
        </main>

        <ToastContainer />
      </body>
    </html>
  );
}