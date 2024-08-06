"use client";

import Image from "next/image";
import Pagination from "./Pagination";
import { useWalletStore } from "@/lib/states";
import toast from "react-hot-toast";

export default function StepOne({
    streamer,
    userInfo,
    amount,
    message,
    setMessageSignature,
    setStep,
}: any) {
    const handler = useWalletStore(s => s.handler);

    async function signMessage() {
        try {
            const sign = await handler?.signMessage(message);
            setMessageSignature(sign);
            setStep(2);
        } catch (e) {
            console.error(e);
            toast.error("Signing is failed");
        }
    }

    return (
        <>
            <h1 className="font-light text-5xl mb-8 text-center max-md:max-w-full max-md:text-3xl">
                Send {streamer} a tip on{" "}
                {1 == 1 ? (
                    <a
                        href={`https://twitch.tv/${userInfo.preferred_username}`}
                        target="_blank"
                        className="text-[#863AD7] underline"
                    >
                        Twitch
                    </a>
                ) : (
                    <a
                        href={`https://kick.com/${userInfo.preferred_username}`}
                        target="_blank"
                        className="text-[#52fc17] underline"
                    >
                        Kick
                    </a>
                )}
            </h1>

            <div className="flex flex-col items-center px-2 py-3 rounded-[6px] border-[1px] border-[rgba(38,205,213,0.50)] bg-blueglass w-[460px] max-md:w-[calc(100%-20px)]">
                <Pagination maxPages={3} page={1} />

                <p className="text-center mt-6 leading-8">
                    Sign the encoded message first with your connected address, then you will be
                    prompted to sign the transaction.
                </p>

                <div className="flex flex-col gap-2 w-full px-2 my-16">
                    <div className="flex w-full items-center justify-between">
                        <p className="text-xl">Status:</p>
                        <p>Awaiting msg signature (0/2)</p>
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
                    onClick={signMessage}
                    className="rounded-[24px] py-2 px-4 bg-transparent border-[1px] border-teal hover:bg-teal hover:text-black transition-all text-lg font-medium"
                >
                    Sign message
                </button>
            </div>
        </>
    );
}
