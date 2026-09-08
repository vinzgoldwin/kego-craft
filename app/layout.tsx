import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "Kego";
  const description =
    "I build websites and mobile apps for small teams, from the first conversation to launch.";

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: "/og.png", width: 1792, height: 939, alt: "Kego" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="/favicon.svg?v=3"
          type="image/svg+xml"
          sizes="any"
        />
        <link
          rel="preload"
          href="/fonts/geist.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
