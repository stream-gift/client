"use client";

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
    return <></>
}