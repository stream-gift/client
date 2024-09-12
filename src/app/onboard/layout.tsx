"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalContext,
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { Cluster, clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

import "@solana/wallet-adapter-react-ui/styles.css";
import "@uploadthing/react/styles.css";

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const endpoint = clusterApiUrl(
    (process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) || "devnet"
  );
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
