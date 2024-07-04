"use client";

import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useState } from "react";

import { SUI_DECIMALS } from "@mysten/sui.js/utils";
import { TransactionBlock } from "@mysten/sui.js/transactions";

type SignedMessageResult = {
    signature: string;
    bytes: string;
};

export default function DonateButtonWithMessage({
    recipient,
    amount,
    result,
    callback,
}: {
    recipient: string;
    amount: number;
    message: string;
    result: SignedMessageResult;
    callback: (...args: any[]) => void;
}) {
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
    const currentAccount = useCurrentAccount();
    const [serialTx, setSerialTx] = useState<string>("");
    const bytes = result.bytes;
    const signature = result.signature;

    let newTxb = false;

    async function callDonationPTB(amount: number) {
        console.log(recipient, amount, currentAccount?.address);
        let txb = new Transaction();
        txb.setSender(currentAccount?.address ?? "");
        const [coin] = txb.splitCoins(txb.gas, [amount * 10 ** SUI_DECIMALS]);
        txb.transferObjects([coin], recipient);
        return await txb.toJSON();
    }

    function _callDonationPTB(amount: number) {
        console.log(amount);
        console.log(recipient);

        let txb = new TransactionBlock();

        txb.setSender(String(currentAccount?.address));
        const [coin] = txb.splitCoins(txb.gas, [amount * 10 ** SUI_DECIMALS]);

        txb.transferObjects([coin], recipient);
        setSerialTx(txb.serialize());
        // TODO: Creating user signature that consists of the message argument encoded

        // Sponsored tx??? :hmm:

        return txb.serialize();
    }
    async function sendIncomingDonation(digest: string, bytes: string) {
        let res = await fetch(
            `/api/sendIncomingDonation?digest=${digest}&streamer=${recipient}&sender=${currentAccount?.address}&message=${bytes}`,
        );
        if (!res.ok) throw Error("bad");
        res = await res.json();
    }

    return (
        <div className="mt-8">
            {currentAccount && result && signature && bytes && (
                <>
                    <div>
                        <button
                            className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg"
                            onClick={() => {
                                signAndExecuteTransaction(
                                    {
                                        transaction: _callDonationPTB(amount),
                                    },
                                    {
                                        onSuccess: async result => {
                                            console.log(result);
                                            callback(result.digest);
                                            await sendIncomingDonation(result.digest, bytes);
                                        },
                                        onError: error => {
                                            console.log(error);
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
function setSerialTx(arg0: string) {
    throw new Error("Function not implemented.");
}
