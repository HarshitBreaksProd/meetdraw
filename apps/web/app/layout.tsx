import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import StoreProvider from "./StoreProvider";
import AuthSessionProvider from "@/components/providers/SessionProvider";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <AuthSessionProvider>
          <Providers>
            <StoreProvider>{children}</StoreProvider>
          </Providers>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
