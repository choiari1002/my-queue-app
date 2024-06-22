import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { Suspense } from "react";
import { Root } from "./root.component";
import "@/app/app.scss";

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
          <Root>
            <Suspense>{children}</Suspense>
          </Root>
        </MantineProvider>
        <footer></footer>
      </body>
    </html>
  );
}
