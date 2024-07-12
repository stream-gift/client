"use client";

import { useAccountStore, useWalletStore } from '@/lib/states';
import { useState } from "react";

type SignedMessageResult = {
    signature: string;
    bytes: string;
};

export default function VerifySignAddress({
    address,
}: {
    address: string | null;
}) {
    const user = useAccountStore(s => s.user);
    const setUser = useAccountStore(s => s.setUser);
    const handler = useWalletStore(s => s.handler);

    async function signMessage() {
        const signed = await handler?.signMessage(new TextEncoder().encode(address!));

        setUser({ ...user!, signature: signed });
        console.log(signed);
    }

    if (!address) return <></>;

    if (user?.signature) return (
        <p className='text-tealtext font-medium text-lg'>Already Signed</p>
    )

    return (
        <button
            onClick={signMessage}
            className='px-6 py-2 border-[1px] border-teal rounded-md bg-tealbox text-white text-lg'
        >
            Sign message
        </button>
    )
}
