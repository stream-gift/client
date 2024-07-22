/**
 * Streamers donate page
 */

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Wrapper from "@/components/Wrapper";
import { useWalletStore } from "@/lib/states";
import GetStreamer from "@/action/getStreamer";
import Modals from "@/components/Modal/Modals";
import StepZero from "@/components/DonationSteps/Zero";
import StepOne from "@/components/DonationSteps/One";
import StepTwo from "@/components/DonationSteps/Two";
import GetUserVods from "@/action/getUserVods";
import Link from "next/link";
import { useTimeAgo } from "next-timeago";
import { IVod } from "@/types/vod.type";
import Vod from "@/components/Clips/Vod";

export default function Donate({ params }: { params: { streamer: string } }) {
    const { TimeAgo } = useTimeAgo();

    const streamer = params.streamer;

    const wallet = useWalletStore(s => s.wallet);

    const [step, setStep] = useState(0);
    const [userInfo, setUserInfo] = useState<any>(null); // null: loading, false: not-found

    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [messageSignature, setMessageSignature] = useState("");

    const [vods, setVods] = useState<IVod[]>([]);

    useEffect(() => {
        GetStreamer(streamer).then(response => {
            if (!response?.user) return setUserInfo(false);
            setUserInfo(response.user);
        });

        try {
            GetUserVods(`twitch:${streamer}`).then(setVods);
        } catch (error) {
            console.error(error);
        }
    }, [streamer]);

    return (
        <CustomWrapper>
            {userInfo === null && <p className="p-3">Loading...</p>}
            {userInfo === false && (
                <div className="min-h-[calc(100dvh-160px)] flex flex-col items-center justify-center">
                    <p className="font-light text-5xl text-center max-md:max-w-full max-md:text-center max-md:text-3xl p-3">
                        This streamer has not signed up to stream.gift yet{" "}
                        <span className="whitespace-nowrap">{":("}</span>
                        <br />
                        <br />
                        Maybe you can invite him?
                    </p>
                </div>
            )}
            {userInfo && !userInfo?.evm_streamer_address && (
                <div className="min-h-[calc(100dvh-160px)] flex flex-col items-center justify-center">
                    <p className="font-light text-5xl text-center max-md:max-w-full max-md:text-center max-md:text-3xl p-3">
                        Streamer has a stream.gift account but wallet is not verified yet
                    </p>
                </div>
            )}
            {(userInfo || {})?.evm_streamer_address && (
                <div className="min-h-[calc(100dvh-160px)] w-full pt-16 flex flex-col items-center">
                    {step === 0 && (
                        <StepZero
                            streamer={streamer}
                            userInfo={userInfo}
                            amount={amount}
                            message={message}
                            wallet={wallet}
                            setStep={setStep}
                            setAmount={setAmount}
                            setMessage={setMessage}
                        />
                    )}
                    {step === 1 && (
                        <StepOne
                            streamer={streamer}
                            userInfo={userInfo}
                            amount={amount}
                            message={message}
                            setStep={setStep}
                            setMessageSignature={setMessageSignature}
                        />
                    )}
                    {step === 2 && (
                        <StepTwo
                            streamer={streamer}
                            userInfo={userInfo}
                            amount={amount}
                            message={message}
                            setStep={setStep}
                            setMessageSignature={setMessageSignature}
                        />
                    )}
                </div>
            )}

            <div className="mt-8 w-full max-w-[80%] mx-auto mb-6">
                {vods.length > 0 && (
                    <h1 className="text-2xl font-medium mb-8">{streamer}&apos;s past livestreams (VODs)</h1>
                )}
                <div className="grid grid-cols-4 gap-4">
                    {vods.length > 0 && vods.map(vod => <Vod key={vod.hash} vod={vod} />)}
                </div>
            </div>
        </CustomWrapper>
    );
}

const CustomWrapper = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <Wrapper>
            <Modals />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="w-full">{children}</main>
            </div>
        </Wrapper>
    );
};
