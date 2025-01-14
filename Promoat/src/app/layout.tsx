import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import "./globals.css"; 
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css'

// Local fonts - make sure they're in the public/fonts directory
const geistSans = localFont({
  src: "/fonts/GeistVF.woff",  // Path relative to public
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",  // Path relative to public
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Dynamically load OnchainProviders with SSR disabled
const OnchainProviders = dynamic(
  () => import("../components/OnchainProviders"),
  { ssr: false }
);

export const metadata: Metadata = {
  title: "Promoat for Cryptro - Promote Your Event, Page, and More with Top Influencers Onchain",
  description: "Get access to influencers around the world and boost your presence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* External Google Font (Lexend Giga) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Giga:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={` flex items-center justify-center min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          fontFamily: '"Lexend Giga", sans-serif', // Google font fallback
        }}
      >
        {/* Wrapping children in OnchainProviders for context */}
        <OnchainProviders>
          {children}
        </OnchainProviders>
      </body>
    </html>
  );
}
