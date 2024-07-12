"use client";

import React from "react";
import ConnectButton from "@/components/Connect/Button";
import "../../../components/Header/wallet-button.scss";

export default function GetStarted() {
    return (
        <div className="min-h-screen p-16">
            <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
                About stream.gift
            </h1>
            <p className="text-gr mb-7 font-medium text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
                Created by Nick Mura
            </p>
            <p className="text-gr mt-7 font-medium text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                stream.gift is a payment solution for streaming platforms & users who want to accept
                donations via crypto.
            </p>
            <div className="w-full flex max-md:justify-center mt-7 ">
                <ConnectButton />
            </div>
        </div>
    );
}
