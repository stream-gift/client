"use client";

import AccountUpdate from "@/action/accountUpdate";
import { truncateWalletAddress } from "@/lib/helper";
import { useAccountStore, useWalletStore } from "@/lib/states";
import { Wallet } from "@/lib/wallet";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function ConnectButton() {
    const user = useAccountStore(s => s.user);
    const wallet = useWalletStore(s => s.wallet);
    const setUser = useAccountStore(s => s.setUser);
    const handler = useWalletStore(s => s.handler);
    const setWallet = useWalletStore(s => s.setWallet);
    const setHandler = useWalletStore(s => s.setHandler);

    useEffect(() => {
        try {
            const walletHandler = new Wallet();
            setHandler(walletHandler);
        } catch (e) {
            console.error(e);
        }
    }, []);

    useEffect(() => {
        if (!handler) return;

        const finalize = () => {
            clearInterval(interval);
        };

        const interval = setInterval(async () => {
            const accounts = await handler.accounts();

            if (accounts) {
                let wallet_ = await connect();
                if (!wallet_) return finalize();
                setWallet(wallet_);

                finalize();
            } else finalize();
        }, 500);
    }, [handler]);

    async function connect() {
        if (wallet) return;
        if (!handler) return toast.error("Please install MetaMask extension.");
        const wallet_ = await handler.connect();

        if (!wallet_) return toast.error("An error has been occured while connecting your wallet");
        setWallet(wallet_);

        // Add streamer_address to DB
        if (user) {
            AccountUpdate({ evm_streamer_address: wallet_ }).then((response: any) => {
                if (response?.status) {
                    setUser({ ...user, evm_streamer_address: wallet_ });
                }
            });
        }
    }

    return (
        <button
            onClick={connect}
            className="h-12 flex items-center text-md text-[#262626] font-medium p-3 rounded-[4px] bg-teal max-md:px-2 max-md:h-8"
        >
            {wallet ? <>{truncateWalletAddress(wallet)}</> : <>Connect wallet</>}
        </button>
    );
}
