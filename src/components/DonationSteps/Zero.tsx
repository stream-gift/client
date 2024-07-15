"use client";

import Image from "next/image";
import ConnectButton from "../Connect/Button";
import toast from 'react-hot-toast';

export default function StepZero({
    streamer,
    userInfo,
    amount,
    message,
    wallet,
    setStep,
    setAmount,
    setMessage,
}: any) {
    return (
        <>
            <h1 className="font-light text-5xl mb-5 max-md:max-w-full text-center">
                Show some love to {streamer} with a tip on{" "}
                <a
                    href={`https://twitch.tv/${userInfo.preferred_username}`}
                    target="_blank"
                    className="text-[#863AD7] underline"
                >
                    Twitch
                </a>
            </h1>
            <p className="text-center font-light text-2xl max-w-[40%]">
                Send a tip & message to your favorite streamer. Your donation will be read on
                stream.
            </p>

            <div className="max-w-[600px] w-full flex flex-col mx-auto mt-12">
                <label
                    htmlFor="donation-amount"
                    className="text-md text-gr block max-md:text-center"
                >
                    Amount
                </label>
                <div className="relative w-full mb-7 h-12 border-[1px] border-gr rounded-md p-2 flex items-center">
                    <input
                        id="donation-amount"
                        type="number"
                        onChange={e => setAmount(Number(e.target.value))}
                        defaultValue={amount}
                        placeholder="Donation amount"
                        className="w-[calc(100%-120px)] border-none placeholder:text-gr text-xl"
                    />
                    <div className="flex items-center gap-2 absolute right-2">
                        <Image
                            src="/tfuel.svg"
                            alt="TFUEL"
                            height={30}
                            width={30}
                            className="rounded-full"
                        />
                        <p className="text-xl">TFUEL</p>
                    </div>
                </div>

                <label
                    htmlFor="donation-message"
                    className="text-md text-gr block max-md:text-center"
                >
                    Message
                </label>
                <textarea
                    id="donation-message"
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Enter a message here (optional)"
                    className="flex-1 min-h-[220px] mb-7 text-xl placeholder:text-gr resize-none border-[1px] border-gr rounded-md p-2 text-white"
                    spellCheck={false}
                    maxLength={255}
                ></textarea>

                <div className="flex justify-center w-full mt-12">
                    {wallet ? (
                        <button
                            onClick={() => {
                                if (amount > 0) {
                                    setStep(message ? 1 : 2)
                                } else toast.error("Enter a valid TFUEL amount");
                            }}
                            className="rounded-[24px] py-2 px-4 bg-transparent border-[1px] border-teal hover:bg-teal hover:text-black transition-all text-lg font-medium"
                        >
                            Send tip
                        </button>
                    ) : (
                        <div className="hover:scale-[1.05] transition w-fit">
                            <ConnectButton />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
