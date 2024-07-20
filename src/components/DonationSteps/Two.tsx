"use client";

import Image from "next/image";
import Pagination from "./Pagination";
import { useWalletStore } from "@/lib/states";
import toast from "react-hot-toast";
import Donate from '@/action/donate';
import { useState } from 'react';

export default function StepTwo({ streamer, userInfo, amount, message, setStep }: any) {
    const wallet = useWalletStore(s => s.wallet);
    const handler = useWalletStore(s => s.handler);

    const [loading, setLoading] = useState(false);

    async function signTransaction() {
        if (loading) return;
        setLoading(true);

        try {
            const hash = await handler?.sendTransaction(userInfo.streamer_address, amount.toString(), message);

            if (!hash) return toast.error("Transaction is cancelled");

            const donation_response = await Donate(
                streamer,
                hash,
                wallet!,
                message
            );

            if (donation_response?.status) {
                setStep(0);
                toast.success("Donation is sent", {
                    duration: 9999
                });
            }
            else {
                toast.error("Transaction cannot be validated");
            }
        } catch (e) {
            console.error(e);
            toast.error("Transaction is failed");
        }
        setLoading(false);
    }

    return (
        <>
            <h1 className="font-light text-5xl mb-8 max-md:max-w-full text-center max-md:text-3xl">
                Send {streamer} a tip on{" "}
                <a
                    href={`https://twitch.tv/${userInfo.preferred_username}`}
                    target="_blank"
                    className="text-[#863AD7] underline"
                >
                    Twitch
                </a>
            </h1>

            <div className="flex flex-col items-center px-2 py-3 rounded-[6px] border-[1px] border-[rgba(38,205,213,0.50)] bg-blueglass w-[460px] max-md:w-[calc(100%-20px)]">
                <Pagination maxPages={3} page={2} />

                <p className="text-center mt-6 leading-8">
                    {message ? (
                        <>
                            Message signed. Now sign & execute the value transaction with the
                            message. This will cost {amount} TFUEL.
                        </>
                    ) : (
                        <>
                            Sign & execute the value transaction with the message. This will cost{" "}
                            {amount} TFUEL.
                        </>
                    )}
                </p>

                <div className="flex flex-col gap-2 w-full px-2 my-16">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-xl">Status:</p>
                        <p>
                            Awaiting transaction (
                            <span className="text-[rgba(0,157,255,0.65)]">1</span>/2)
                        </p>
                    </div>
                    <div className="flex w-full items-center justify-between">
                        <p className="text-xl">You send:</p>
                        <div className="flex items-center gap-2 bg-[#14141480] px-3 py-2 rounded-[20px]">
                            <Image
                                src="/tfuel.svg"
                                alt="TFUEL"
                                height={20}
                                width={20}
                                className="rounded-full"
                            />
                            <p className="text-xl">{amount} TFUEL</p>
                        </div>
                    </div>
                    {message && (
                        <div className="flex w-full items-center justify-between">
                            <p className="text-xl whitespace-nowrap">Your msg:</p>
                            <div className="flex items-center gap-2 bg-[#14141480] p-3 rounded-[20px] text-xs max-w-[300px]">
                                {message}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={signTransaction}
                    className={`rounded-[24px] py-2 px-4 bg-transparent border-[1px] border-teal hover:bg-teal hover:text-black transition-all text-lg font-medium ${loading ? 'cursor-default' : ''}`}
                >
                    {loading ? 'Please wait...' : 'Sign transaction'}
                </button>
            </div>
        </>
    );
}
