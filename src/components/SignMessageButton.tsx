"use client";
import { useState } from "react";

type SignedMessageResult = {
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
    const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>();
    const [signature, setSignature] = useState("");
    const [bytes, setBytes] = useState("");

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
