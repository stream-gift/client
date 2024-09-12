import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import AuthService from "@/lib/api/auth.service";
import { UserProvider } from "./user-provider";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "stream.gift",
  description: "Stream.gift",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await AuthService.getUser();

  return (
    <html lang="en">
      <head>
        {/* Meta Tags for Favicon/App Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#23cdd5" />
        <meta name="msapplication-TileColor" content="#23cdd5" />
        <meta name="theme-color" content="#23cdd5" />
      </head>

      <body className={archivo.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider initialUser={user}>
            <div>{children}</div>
          </UserProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
