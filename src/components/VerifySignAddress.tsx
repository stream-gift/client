"use client";

import { useState } from "react";
import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSignPersonalMessage,
} from "@mysten/dapp-kit";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import React from "react";
import { useModalStore } from "@/lib/states";
import Image from "next/image";

type SignedMessageResult = {
    signature: string;
    bytes: string;
};

export default function VerifySignAddress({
    streamer,
    address,
    _signature,
}: {
    streamer: string;
    address: string;
    _signature: string;
}) {
    const setModal = useModalStore(state => state.setModal);

    const { mutate: signPersonalMessage } = useSignPersonalMessage(); // message

    const [signedMessageResult, setSignedMessageResult] = useState<SignedMessageResult>();
    const [signature, setSignature] = useState("");
    const [bytes, setBytes] = useState("");
    const currentAccount = useCurrentAccount();

    async function verifySignedAddress(streamer: string, address: string, signature: string) {
        console.log("calling api...");
        let res = await fetch("/api/verifySignedAddress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ streamer, address, signature }),
        });
        if (!res.ok) throw Error("bad request");
        res = await res.json();
        console.log(res);
    }

    function signAndVerify() {
        signPersonalMessage(
            {
                message: new TextEncoder().encode(address),
            },
            {
                onSuccess: async result => {
                    console.log("messaged signed, ", result.signature);
                    setSignedMessageResult(result);
                    setSignature(result.signature);
                    setBytes(result.bytes);
                    await verifySignedAddress(streamer, address, result.signature);
                },
            },
        );
    }

    return (
        <div className="w-full flex justify-between p-1">
            {currentAccount && !signedMessageResult && !signature && !bytes && (
                <>
                    <div className="flex items-center max-w-1/2 max-md:w-[50vw] my-auto ml-2 text-lg font-semibold">
                        <p className="dots w-full">{address}</p>
                    </div>
                    {!_signature ? (
                        <button
                            className="px-3 py-2 rounded-lg bg-[#4da2ff] text-white"
                            onClick={() => {
                                setModal("custom", {
                                    content: (
                                        <div className="h-full flex flex-col">
                                            <p className="font-bold text-xl mb-1">
                                                To verify your address, click the sign message
                                                below. This doesn&#39;t cost any GAS/MIST, and is
                                                done locally.
                                            </p>
                                            <div>
                                                <label className="font-bold text-xl text-gr mb-1 block max-md:text-center">
                                                    SUI Identifier{" "}
                                                    {_signature ? (
                                                        <span className="text-[#FFE500]">
                                                            (Verified)
                                                        </span>
                                                    ) : (
                                                        <span className="text-[#05FF00]">
                                                            Unverified
                                                        </span>
                                                    )}{" "}
                                                    <a
                                                        href="https://suins.io/"
                                                        target="_blank"
                                                        className="text-gr"
                                                    >
                                                        (Buy a SUINS here)
                                                    </a>
                                                </label>
                                                <div className="max-w-[768px] h-12 border-[1px] border-gr rounded-md py-2 flex items-center gap-3 max-md:mx-auto">
                                                    <div className="flex items-center justify-between p-2 text-xl font-bold bg-white">
                                                        <Image
                                                            src="/sui.svg"
                                                            alt="SUI"
                                                            height={22}
                                                            width={22}
                                                            className="rounded-lg"
                                                        />
                                                        {address}
                                                    </div>
                                                    {_signature ? (
                                                        <></>
                                                    ) : (
                                                        <button
                                                            className="px-3 py-2 rounded-lg bg-blue border text-white font-bold text-md"
                                                            onClick={signAndVerify}
                                                        >
                                                            Sign and verify address
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-end justify-end gap-2">
                                                <button
                                                    className="px-3 py-2 rounded-lg border-blue border text-white font-bold text-md"
                                                    onClick={() => setModal("", null)}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                });
                            }}
                        >
                            Sign & verify address
                        </button>
                    ) : (
                        <button
                            className="px-3 py-2 rounded-lg border-[#4da2ff] border text-white"
                            onClick={() => {
                                setModal("custom", {
                                    content: (
                                        <div className="h-full flex flex-col">
                                            <p className="font-bold text-xl mb-1 max-md:text-center">
                                                To verify your address, click the sign message
                                                below. This doesn&#39;t cost any GAS/MIST, and is
                                                done locally.
                                            </p>
                                            <div>
                                                <label className="font-bold text-xl text-gr mb-2 mt-2 block max-md:text-center">
                                                    SUI Identifier{" "}
                                                    {_signature ? (
                                                        <span className="text-[#FFE500]">
                                                            (Verified)
                                                        </span>
                                                    ) : (
                                                        <span className="text-[#05FF00]">
                                                            Unverified
                                                        </span>
                                                    )}{" "}
                                                    <a
                                                        href="https://suins.io/"
                                                        target="_blank"
                                                        className="text-gr"
                                                    >
                                                        (Buy a SUINS here)
                                                    </a>
                                                </label>
                                                <div className="rounded-md flex flex-wrap items-center gap-3 max-md:mx-auto">
                                                    <div className="w-fit max-lg:w-full flex items-center justify-start p-2 text-xl font-bold bg-white text-black rounded-lg gap-2">
                                                        <Image
                                                            src="/sui.svg"
                                                            alt="SUI"
                                                            height={30}
                                                            width={30}
                                                            className="rounded-lg"
                                                        />
                                                        <p className="dots w-full">{address}</p>
                                                    </div>
                                                    {!_signature ? (
                                                        <></>
                                                    ) : (
                                                        <button
                                                            className="px-3 py-2 rounded-lg bg-blue text-white font-bold text-md"
                                                            onClick={signAndVerify}
                                                        >
                                                            Sign and verify address
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex items-end justify-end gap-2">
                                                <button
                                                    className="px-3 py-2 rounded-lg border-[#4da2ff] border text-white font-bold text-md"
                                                    onClick={() => setModal("", null)}
                                                >
                                                    Cancel
                                                </button>
                                                <button className="px-3 py-2 rounded-lg bg-[#4da2ff] text-white font-bold text-md">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    ),
                                });
                            }}
                        >
                            Edit
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
