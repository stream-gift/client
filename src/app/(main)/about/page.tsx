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
                Created by Nick Mura & Trident Ventures
            </p>
            <p className="text-gr mt-7 font-medium text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
               Introducing stream.gift, a streaming service that allows streamers on platforms like Twitch & Kick to crowdfund and receive donations via cryptocurrency & TFUEL. Viewers can donate to their favorite streamers on Theta Network, and have their donation be read on stream.
            </p>
            <p className="text-gr mt-7 font-medium text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                In addition, with integration with Theta Edge Cloud we've created our <a href='https://github.com/stream-gift/vod-saver'>vod-saver</a>{" "} tool, a permanent storage solution for streamers past livestreams & VODs, and ease of access for saving one - just paste your temporary video URL and start uploading to the Cloud immediately.
            </p>

            <p className="text-gr mt-7 font-medium text-lg max-w-[70%] max-md:max-w-full max-md:text-center">

            </p>
            <div className="w-full flex max-md:justify-center mt-7 ">
                <ConnectButton />
            </div>
        </div>
    );
} 
