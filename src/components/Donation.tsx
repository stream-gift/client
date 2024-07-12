"use client";
import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";

import { EXAMPLE_RECIPIENT_ADDRESS } from "@/lib/config";

import DonateButton from "./DonateButton";

export default function Donation({
    sender,
    amount,
    message,
}: {
    sender: string;
    amount: number;
    message: string;
}) {
    //Basically the 'streamer' who is getting a donation

    const recipientAddress = EXAMPLE_RECIPIENT_ADDRESS;
    const [handleInput, setHandleInput] = useState<number>();
    const [handleMessage, setHandleMessage] = useState<string>("");

    const currentAccount = useCurrentAccount();

    function changeHandle(value: number) {
        setHandleInput(value);
    }

    function changeMessage(value: string) {
        setHandleMessage(value);
    }

    return (
        <main className="flex min-h-screen flex-col items-center w-full ">
            <div className="bg-[#1c1c1c20] border-[1px] border-gr rounded-lg p-4">
                <h1 className="text-3xl">
                    You just received a donation for {amount} TFUEL from {sender}!{" "}
                </h1>
                <p className="pt-5 text-xl text-center">{message}</p>
            </div>
        </main>
    );
}
