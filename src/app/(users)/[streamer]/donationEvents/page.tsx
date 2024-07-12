"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Donation from "@/components/Donation";
import CheckDonations from "@/action/checkDonations";
import { b64DecodeUnicode, truncateWalletAddress } from "@/lib/helper";
import { useAccountStore } from "@/lib/states";
import { useAudio } from "@/hooks/useAudio";
import GetStreamer from "@/action/getStreamer";
import toast from "react-hot-toast";

export default function DonationEventListener() {
    const [user, setUser] = useState<any>(null);
    const [playing, toggleAudio] = useAudio("/notification.wav");
    const [soundEnabled, setSoundEnabled] = useState(false);

    const pathname = usePathname();
    const username = pathname.split("/")[1];

    const [donation, setDonation] = useState<any>(false);

    useEffect(() => {
        if (username) {
            const interval = setInterval(async () => {
                try {
                    const res = await CheckDonations(username);
                    if (res) console.log(res);

                    if (res?.status !== false && res?.[0]?.sender) {
                        setDonation(res[0]);

                        if (soundEnabled) {
                            // Play donation sound
                            (toggleAudio as () => void)();
                        }
                    } else {
                        setDonation(false);
                    }
                } catch (e) {}
            }, 30_000);

            return () => clearInterval(interval);
        }
    }, [username, user]);

    useEffect(() => {
        if (username) {
            (async () => {
                // Get public streamer data
                const user_raw = (await GetStreamer(username)).user;
                if (user_raw?.status !== false) setUser(user_raw);
            })();
        }
    }, [username]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12">
            {user?.notificationsound && !soundEnabled && (
                <button
                    onClick={() => {
                        setSoundEnabled(true);
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
                    message={b64DecodeUnicode(donation.message)}
                />
            )}
        </main>
    );
}
