"use client";

import VerifySignature from '@/action/verifySign';
import { useAccountStore, useWalletStore } from "@/lib/states";
import toast from 'react-hot-toast';

export default function VerifySignAddress({ address }: { address: string | null }) {
    const user = useAccountStore(s => s.user);
    const wallet = useWalletStore(s => s.wallet);
    const handler = useWalletStore(s => s.handler);
    const setUser = useAccountStore(s => s.setUser);

    async function signMessage() {
        if (!user) return toast.error("Log in");
        if (!wallet) return toast.error("Connect your wallet");

        const signed = await handler?.signMessage(new TextEncoder().encode(address!));
        if (!signed) return toast.error("Signature verification is failed");

        VerifySignature(signed, wallet)
            .then((response: any) => {
                if (response?.status) setUser({ ...user, signature: signed })
            })
            .catch(response => {
                console.error(response);
                toast.error(response.message);
            });
    }

    if (!address) return <></>;

    return (
        <button
            onClick={signMessage}
            className="px-6 py-2 border-[1px] border-teal rounded-md bg-tealbox text-white text-lg"
        >
            Sign message
        </button>
    );
}
