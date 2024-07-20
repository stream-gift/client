"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { b64DecodeUnicode, truncateWalletAddress } from "@/lib/helper";
import CheckDonations from "@/action/checkDonations";
import GetStreamer from "@/action/getStreamer";
import Donation from "@/components/Donation";
import { useAudio } from "@/hooks/useAudio";

export default function DonationEventListener() {
    const [user, setUser] = useState<any>(null);
    const [playing, audio] = useAudio("/notification.wav");
    const [soundEnabled, setSoundEnabled] = useState(false);

    const pathname = usePathname();
    const username = pathname.split("/")[1];

    const [toggleAudio, setToggleAudio] = useState(false);
    const [donation, setDonation] = useState<any>(null);

    useEffect(() => {
        if (username) {
            const interval = setInterval(async () => {
                try {
                    console.log(username)
                    const res = await CheckDonations(username);
                    if (res?.status !== false && res?.[0]?.sender) {
                        setDonation(res[0]);
                        setToggleAudio(s => !s);
                    } else {
                        setDonation(false);
                    }
                } catch (e) {}
            }, 30_000);

            return () => clearInterval(interval);
        }
    }, [username, user, soundEnabled]);

    useEffect(() => {
        if (username) {
            (async () => {
                // Get public streamer data
                const user_raw = (await GetStreamer(username)).user;
                if (user_raw?.status !== false) setUser(user_raw);
            })();
        }
    }, [username]);

    useEffect(() => {
        if (soundEnabled && donation !== false) (audio as () => void)();
    }, [soundEnabled, donation, toggleAudio]);

    if (!user || user?.preferred_username !== username) return <p>Please login...</p>;

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            {user?.notificationsound && !soundEnabled && (
                <button
                    onClick={() => {
                        setSoundEnabled(true);
                        setToggleAudio(s => !s);
                        toast.success("Donation sounds are enabled");
                    }}
                    className="px-3 py-1 w-fit rounded-lg text-white bg-blue font-semibold text-lg"
                >
                    Click here to enable donate sounds
                </button>
            )}
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex"></div>
            {donation && (
                <Donation
                    sender={truncateWalletAddress(donation.sender)}
                    amount={donation.amount}
                    message={donation.message}
                />
            )}
        </main>
    );
}
