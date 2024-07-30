import type { Metadata } from "next";
import { Fira_Code, Ubuntu } from "next/font/google";

import "./globals.css";

const ubuntu = Ubuntu({ weight: ["300", "400", "500", "700"], variable: "--ubuntu", subsets: ["latin"] });
const firaCode = Fira_Code({ variable: "--fira", subsets: ["latin"] });

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
            <body className={`${ubuntu.className} ${firaCode.variable}`}>{children}</body>
        </html>
    );
}
