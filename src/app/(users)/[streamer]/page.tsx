/**
 * Streamers donate page
 */

"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Modals from "@/components/Modal/Modals";
import GetStreamer from "@/action/getStreamer";
import DonateButton from "@/components/DonateButton";
import StreamerExists from "@/action/streamerExists";
import DonateButtonWithMessage from "@/components/DonateButtonWithMessage";
import Image from "next/image";
import SignMessageButton from "@/components/SignMessageButton";
import { QRCodeSVG } from "qrcode.react";
import { b64DecodeUnicode } from "@/lib/helper";

type SignedMessageResult = {
    signature: string;
    bytes: string;
};

export default function Donate({ params }: { params: { streamer: string } }) {
    const streamer: string = params.streamer;
    const currentAccount = useCurrentAccount();

    const [exists, setExists] = useState<Boolean | null>(null);
    const [dropdown, setDropdown] = useState(false);
    const [step, setStep] = useState(0);
    // Form
    const [amount, setAmount] = useState<number>(0);
    const [mobile, setMobile] = useState<boolean>(false);
    const [user, setUser] = useState<any>(null);
    const [message, setMessage] = useState<string>("");
    const [digest, setDigest] = useState("");
    const [messageSignResult, setMessageSignResult] = useState<SignedMessageResult>();
    const [QRTransaction, setQRTransaction] = useState<string>("unsent");

    function mobileDonationModal() {
        setMobile(!mobile);
    }

    useEffect(() => {
        (async () => {
            const streamerExists: Boolean = (await StreamerExists(streamer)).status;
            setExists(streamerExists);
            const getStreamer = await GetStreamer(streamer);
            console.log(getStreamer);
            setUser(getStreamer.user);
        })();
    }, []);

    if (exists === null)
        return (
            <CustomWrapper>
                <></>
            </CustomWrapper>
        );

    if (!exists)
        return (
            <CustomWrapper>
                <div className="min-h-screen w-full pt-16">
                    <p className="text-gr font-bold mt-7 text-2xl max-w-[70%] max-md:max-w-full text-center">
                        Hmmm... It seems this streamer does not have a{" "}
                        <Link href="/">stream.gift</Link> account yet.
                    </p>
                </div>
            </CustomWrapper>
        );
    function qrDonation() {
        setMobile(!mobile);
    }

    async function sentTransaction(amount: number, message: string) {
        setQRTransaction("awaiting");
        let b64_message = b64DecodeUnicode(message);
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND}/check_new_qr?amount=${amount}&message=${b64_message}`,
        );
        if (!res.ok) throw Error("new error");
        res = await res.json();
        setQRTransaction(res.statusText);
    }
    return (
        <CustomWrapper>
            <div className="min-h-screen w-full pt-16 flex flex-col items-center">
                <h1 className="font-semibold text-5xl max-w-[70%] mb-10 max-md:max-w-full text-center">
                    Donate to {streamer} on{" "}
                    <a
                        href={`https://twitch.tv/${streamer}`}
                        target="_blank"
                        className="text-[#9F44FE] underline"
                    >
                        Twitch
                    </a>
                </h1>

                {step === 0 && (
                    <>
                        <p className="text-gr font-medium mb-7 text-2xl max-w-[70%] max-md:max-w-full text-center">
                            Send a tip/donation to{" "}
                            <a href={`https://www.twitch.tv/${streamer}`}>{streamer}</a> via SUI!
                            Get your donation read on stream.{" "}
                            {mobile ? (
                                <>
                                    <button disabled onClick={mobileDonationModal}>
                                        <b>
                                            Wanna send a donation via desktop/browser?{" "}
                                            <u>Click here.</u>
                                        </b>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button disabled onClick={mobileDonationModal}>
                                        <b>
                                            Mobile/QR code donations are <u>coming soon.</u>
                                        </b>
                                    </button>
                                </>
                            )}
                        </p>

                        <div className="mt-2 mb-4">
                            {!mobile ? (
                                <>
                                    <button
                                        disabled
                                        onClick={qrDonation}
                                        className="px-2 py-2 border border-opacity-60 rounded-lg opacity-60"
                                    >
                                        Mobile donation: OFF
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={qrDonation}
                                        className="px-2 py-2 border border-opacity-60 rounded-lg"
                                    >
                                        Mobile donation: ON
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Form */}
                        <div className="max-w-[600px] w-full flex flex-col mx-auto">
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
                                    className="flex-1 border-none placeholder:text-gr font-bold text-xl"
                                />
                                <div className="flex items-center gap-2 absolute right-2">
                                    <Image
                                        src="/sui.svg"
                                        alt="SUI"
                                        height={24}
                                        width={24}
                                        className="rounded-full"
                                    />
                                    <p className="text-xl font-bold">SUI</p>
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
                                className="
                flex-1 min-h-[220px] mb-7 font-bold text-xl placeholder:text-gr
                resize-none border-[1px] border-gr rounded-md p-2 text-gr"
                            ></textarea>

                            {currentAccount || mobile ? (
                                <button
                                    onClick={() => setStep(message ? 1 : 2)}
                                    className="rounded-md py-2 px-4 bg-blue font-bold text-lg"
                                >
                                    Send
                                </button>
                            ) : (
                                <div className="hover:scale-[1.05] transition w-full">
                                    <ConnectButton
                                        id="wallet-connect-button-3"
                                        connectText="connect your wallet"
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}

                {step === 1 && (
                    <div className="max-w-[768px] w-full">
                        <div className="w-full flex flex-col justify-start gap-5">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">Status:</p>
                                <p className="text-gr font-bold text-xl">
                                    Awaiting message signature (0/2)
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">You send:</p>
                                <p className="text-gr font-bold text-xl italic">{amount} SUI</p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">Message:</p>
                                <p className="text-gr font-bold text-xl italic">{message}</p>
                            </div>
                        </div>
                        {mobile ? (
                            <>
                                {QRTransaction == "unsent" ? (
                                    <>
                                        {" "}
                                        {/**Desktop tip/donation */}
                                        <p className="mt-5 text-gr font-bold text-xl italic w-full">
                                            Scan the QR code, and click the button once the
                                            transaction has been sent.
                                        </p>
                                    </>
                                ) : QRTransaction == "awaiting" ? (
                                    <>
                                        <p className="mt-5 text-gr font-bold text-xl italic w-full">
                                            Scan the QR code, and click the button once the
                                            transaction has been sent.
                                        </p>
                                    </>
                                ) : QRTransaction == "error" ? (
                                    <>
                                        <p className="mt-5 text-gr font-bold text-xl italic w-full">
                                            Scan the QR code, and click the button once the
                                            transaction has been sent.
                                        </p>
                                    </>
                                ) : (
                                    <> </>
                                )}
                                <div className="mt-4">
                                    <QRCodeSVG size={250} value={user.streamer_address}></QRCodeSVG>

                                    <div className=""></div>
                                    {QRTransaction == "unsent" ? (
                                        <>
                                            <button
                                                className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg"
                                                onClick={() => sentTransaction(amount, message)}
                                            >
                                                Send
                                            </button>
                                        </>
                                    ) : QRTransaction == "awaiting" ? (
                                        <>
                                            <button
                                                disabled
                                                className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg opacity-60"
                                                onClick={() => sentTransaction(amount, message)}
                                            >
                                                Send
                                            </button>
                                        </>
                                    ) : QRTransaction == "error" ? (
                                        <>
                                            <button
                                                disabled
                                                className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg opacity-60"
                                                onClick={() => sentTransaction(amount, message)}
                                            >
                                                Send
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                disabled
                                                className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg opacity-60"
                                                onClick={() => sentTransaction(amount, message)}
                                            >
                                                Send
                                            </button>
                                        </>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                {" "}
                                {/**Desktop tip/donation */}
                                <p className="mt-5 text-gr font-bold text-xl italic w-full">
                                    Sign the message first, then sign the transaction.
                                </p>
                                <SignMessageButton
                                    recipient={user.streamer_address}
                                    amount={amount}
                                    message={message}
                                    callback={(result: any) => {
                                        setMessageSignResult(result);
                                        setStep(2);
                                    }}
                                />
                            </>
                        )}
                    </div>
                )}

                {step === 2 && (
                    <div className="max-w-[768px] w-full">
                        <div className="max-w-[768px] flex flex-col gap-5">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">Status:</p>
                                <p className="text-gr font-bold text-xl">
                                    Received signature, now awaiting tx (
                                    <span className="text-blue">1</span>/2)
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">You send:</p>
                                <p className="text-gr font-bold text-xl italic">{amount} SUI</p>
                            </div>
                            {message && (
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-gr font-bold text-xl mr-3">Message:</p>
                                    <p className="text-gr font-bold text-xl italic">{message}</p>
                                </div>
                            )}
                        </div>

                        <p className="mt-5 text-gr font-bold text-xl italic">
                            Messaged has been signed, now sign the transaction for your donation to
                            be submitted.
                        </p>

                        {message ? (
                            <DonateButtonWithMessage
                                recipient={user.streamer_address}
                                amount={amount}
                                message={message}
                                result={messageSignResult as SignedMessageResult}
                                callback={s => {
                                    setDigest(s);
                                    setStep(3);
                                }}
                            />
                        ) : (
                            <DonateButton
                                recipient={user.streamer_address}
                                amount={amount}
                                callback={s => {
                                    setDigest(s);
                                    setStep(3);
                                }}
                            />
                        )}
                    </div>
                )}

                {step === 3 && (
                    <div className="max-w-[768px] w-full">
                        <div className="max-w-[768px] flex flex-col gap-5">
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">Status:</p>
                                <p className="text-gr font-bold text-xl">
                                    Transaction & message sent! (
                                    <span className="text-[#1DFF5D]">2</span>/2)
                                </p>
                            </div>
                            <div className="w-full flex items-center justify-between">
                                <p className="text-gr font-bold text-xl mr-3">You send:</p>
                                <p className="text-gr font-bold text-xl italic">{amount} SUI</p>
                            </div>
                            {message && (
                                <div className="w-full flex items-center justify-between">
                                    <p className="text-gr font-bold text-xl mr-3">Message:</p>
                                    <p className="text-gr font-bold text-xl italic">{message}</p>
                                </div>
                            )}
                        </div>

                        <p className="mt-5 text-gr font-bold text-xl italic">
                            Trasnsaction has been sent with the signed message to the {streamer}
                            &#39;s address. {streamer} will receive a notification on his stream
                        </p>

                        <div className="mt-10 border-[1px] border-gr rounded-lg">
                            <div
                                className="p-2 flex items-center justify-between cursor-pointer hover:bg-[#ffffff10]"
                                onClick={() => setDropdown(!dropdown)}
                            >
                                <span className="text-lg font-semibold">Signature Details</span>
                                <div className="h-6 w-6 flex items-center justify-center rounded-full border-[1px] border-gr text-gr transition-all hover:bg-gr cursor-pointer">
                                    <span className="font-semibold">{dropdown ? "-" : "+"}</span>
                                </div>
                            </div>
                            {dropdown && (
                                <div className="p-2 flex flex-col gap-2">
                                    <div className="break-words overflow-hidden">
                                        Signature:{" "}
                                        <span className="text-gray-400">
                                            {messageSignResult?.signature}
                                        </span>
                                    </div>
                                    <div className="break-words overflow-hidden">
                                        Base64 representation of message:{" "}
                                        <span className="text-gray-400">
                                            {messageSignResult?.bytes}
                                        </span>
                                    </div>
                                    {digest && (
                                        <div className="break-words overflow-hidden">
                                            digest: <span className="text-gray-400">{digest}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </CustomWrapper>
    );
}

function CustomWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Modals />
            <div className="flex pr-48 max-xl:pr-0">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="mt-10 p-2">{children}</main>
                </div>
            </div>
            <Footer />
        </>
    );
}
