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

export default function StreamerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const network = process.env.NEXT_PUBLIC_SOLANA_NETWORK || "devnet";
  // const network = "mainnet-beta";

  const endpoint = useMemo(() => clusterApiUrl(network as Cluster), [network]);
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
