"use client";
import { useCurrentAccount, useSignPersonalMessage } from "@mysten/dapp-kit";
import { useState } from "react";

type SignedMessageResult = {
    // should import type SuiSignPersonalMessageOutput instead (line 102 result type)...
    signature: string;
    bytes: string;
};

export default function SignMessageButton({
    message,
    callback,
}: {
    recipient: string;
    amount: number;
    message: string;
    callback: (...args: any[]) => void;
}) {
    const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message
    const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>();
    const [signature, setSignature] = useState("");
    const [bytes, setBytes] = useState("");
    const currentAccount = useCurrentAccount();

    return (
        <div className="mt-8">
            {currentAccount && message && !signedMessageResult && !signature && !bytes && (
                <>
                    <button
                        className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg"
                        onClick={() => {
                            signPersonalMessage(
                                {
                                    message: new TextEncoder().encode(message),
                                },
                                {
                                    onSuccess: result => {
                                        setSignedMessageResult(result);
                                        setSignature(result.signature);
                                        setBytes(result.bytes);
                                        callback(result);
                                    },
                                },
                            );
                        }}
                    >
                        Sign Message
                    </button>
                </>
            )}
        </div>
    );
}
