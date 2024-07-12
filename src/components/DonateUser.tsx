"use client";
import { useState } from "react";
import DonateButton from "./DonateButton";
import DonateButtonWithMessage from "./DonateButtonWithMessage";
import { useWalletStore } from '@/lib/states';

export default function DonateUser({ address, user }: { address: string; user: string }) {
    //Basically the 'streamer' who is getting a donation
    const recipientAddress = address;
    const [handleInput, setHandleInput] = useState<number>(0);
    const [handleMessage, setHandleMessage] = useState<string>("");

    const wallet = useWalletStore(s => s.wallet);

    function changeHandle(value: number) {
        setHandleInput(value);
    }

    function changeMessage(value: string) {
        setHandleMessage(value);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between w-full p-24 max-md:px-0">
            <div className="w-1/3 max-2xl:w-[66%] max-md:w-full">
                <div className="">
                    {handleInput ? (
                        <>
                            <div id="donation-info-amount" className="">
                                Donation amount: {handleInput} TFUEL
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    {handleMessage ? (
                        <>
                            <div id="donation-info-amount" className="">
                                Dontion message: {handleMessage}
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>

                <div>
                    <input
                        id="donate"
                        name="donate"
                        type="number"
                        value={handleInput} //@ts-ignore
                        onInput={e => changeHandle(e.currentTarget.value)}
                        required
                        placeholder="1 TFUEL"
                        className="block w-full pl-8 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 py-2"
                    />
                    <input
                        id="donation-message"
                        name="donation-message"
                        type="text"
                        value={handleMessage} //@ts-ignore
                        onInput={e => changeMessage(e.currentTarget.value)}
                        required
                        placeholder="Enter a message..."
                        className="block w-full pl-8 mt-5 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3  py-2"
                    />
                </div>

                <div className="flex justify-center mt-2">
                    {wallet && handleInput && handleMessage ? (
                        <>
                            <DonateButtonWithMessage
                                recipient={recipientAddress}
                                amount={handleInput}
                                message={handleMessage}
                            />
                        </>
                    ) : wallet && handleInput && !handleMessage ? (
                        <>
                            <DonateButton recipient={recipientAddress} amount={handleInput} />
                        </>
                    ) : (
                        <>
                            <div style={{ padding: 20 }}>
                                <button
                                    disabled
                                    className=" px-3 py-3 rounded-lg bg-white text-black opacity-60"
                                >
                                    Sign and execute donation tx
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
