import "@mantine/core/styles.css";
// import "./globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FE6232"></meta>
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <Suspense>{children}</Suspense>
        </MantineProvider>
        <footer></footer>
      </body>
    </html>
  );
}
