import type { Metadata } from "next";
import { Ubuntu_Mono } from "next/font/google";

import "./globals.css";
import "@mysten/dapp-kit/dist/index.css";

const ubuntu_mono = Ubuntu_Mono({ weight: "400", variable: "--ubuntu", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "stream.gift - Twitch donates on SUI network",
    description: "Donate to your favorite Twitch streamer on SUI network.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={ubuntu_mono.className}>{children}</body>
        </html>
    );
}
