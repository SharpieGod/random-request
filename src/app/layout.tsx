import "~/styles/globals.css";
import { Toaster } from "sonner";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Random.ly",
  description: "Generating random numbers with ease",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-background-950 text-text-100">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster theme="dark" />
      </body>
    </html>
  );
}
