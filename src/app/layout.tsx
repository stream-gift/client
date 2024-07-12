import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

import "./globals.css";

const ubuntu = Ubuntu({ weight: ["300", "400", "500", "700"], variable: "--ubuntu", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "stream.gift - Twitch donates on THETA network",
    description: "Donate to your favorite Twitch streamer on THETA network.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={ubuntu.className}>{children}</body>
        </html>
    );
}
