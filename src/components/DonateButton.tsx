"use client";

import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useState } from "react";
import { SUI_DECIMALS } from "@mysten/sui.js/utils";

export default function DonateButton({
    recipient,
    amount,
    callback,
}: {
    recipient: string;
    amount: number;
    callback: (...args: any[]) => void;
}) {
    const { mutate: signAndExecuteTransactionBlock } = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();

    const [digest, setDigest] = useState("");

    function callDonationPTB(amount: number) {
        let txb = new TransactionBlock();
        txb.setSender(currentAccount?.address as string);
        const [coin] = txb.splitCoins(txb.gas, [amount * 10 ** SUI_DECIMALS]);
        txb.transferObjects([coin], recipient);
        return txb.serialize();
    }

    async function sendIncomingDonation(digest: string) {
        let res = await fetch(
            `/api/sendIncomingDonation?digest=${digest}&streamer=${recipient}&sender=${currentAccount?.address}`,
        );
        if (!res.ok) throw Error("bad");
        res = await res.json();
    }

    return (
        <div className="mt-8">
            {currentAccount && (
                <>
                    <div>
                        <button
                            className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg"
                            onClick={() => {
                                signAndExecuteTransactionBlock(
                                    {
                                        transaction: callDonationPTB(amount),
                                    },
                                    {
                                        onSuccess: async result => {
                                            callback(result.digest);
                                            setDigest(result.digest);
                                            await sendIncomingDonation(result.digest);
                                        },
                                    },
                                );
                            }}
                        >
                            Sign Transaction
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
