import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { APIService } from "@/lib/api/server";
import { UserProvider } from "./user-provider";
import { ProgressProvider } from "./progress-provider";
const archivo = Archivo({ subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "stream.gift",
  description: "Stream.gift",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await APIService.Auth.getUser();
  const streamer = await APIService.Streamer.getStreamer(user.id);

  return (
    <html lang="en" className={`${jetbrainsMono.variable}`}>
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
        <ProgressProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <UserProvider initialUser={user} initialStreamer={streamer}>
              <div>{children}</div>
            </UserProvider>
            <Toaster />
          </ThemeProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
