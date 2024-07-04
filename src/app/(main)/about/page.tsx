"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import Image from "next/image";
import "../../../components/Header/wallet-button.scss";
import React from "react";

export default function GetStarted() {
    return (
        <div className="min-h-screen pt-16">
            <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
                About stream.gift
            </h1>
            <p className="text-gr mb-7 font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
                Created by Nick Mura
            </p>

            <p className="text-gr mt-7 font-bold text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                stream.gift is a payment solution for streaming platforms & users who want to accept
                donations via crypto.
            </p>

            <p className="text-gr mt-7 font-bold text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                We developed this over the course of 2 months in May & June 2024, utilizing core Sui
                features such as zkLogin, programmable transaction blocks and sponsored
                transactions.
            </p>

            <p className="text-gr mt-7 font-bold text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                Relevant links/resources & contact information to the left sidebar and below.
            </p>
            <div className="w-full flex max-md:justify-center mt-7 ">
                <ConnectButton
                    id="wallet-connect-button-2"
                    connectText={
                        <div className="flex items-center gap-3">
                            <Image src="/sui.svg" alt="SUI" height={28} width={28} />
                            Connect your Wallet
                        </div>
                    }
                />
            </div>
        </div>
    );
}
