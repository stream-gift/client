"use client";

import React from "react";
import ConnectButton from "@/components/Connect/Button";
import "../../../components/Header/wallet-button.scss";

export default function GetStarted() {
    return (
        <div className="min-h-screen p-16 max-md:p-4">
            <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
                About stream.gift
            </h1>
            <p className="text-gr mb-7 font-medium text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
                Created by Nick Mura
            </p>
            <p className="text-gr mt-7 font-medium text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                stream.gift is a cryptocurrency solution for streaming platforms & streamers who want to accept
                donations/tips via crypto. In 2023, Twitch streamers raised over 400M in crowdfunding efforts.
                stream.gift currently supports Twitch (with partial support for Kick & Theta Edge livestreaming). You can send donations via Theta Network, an EVM compatible network, as well as <a href=''>Sui Network</a> with plans to support more networks in the future
                Kick & Theta Edge Cloud streaming.
            </p>
            <div className="w-full flex max-md:justify-center mt-7 ">
                <ConnectButton />
            </div>
        </div>
    );
}
