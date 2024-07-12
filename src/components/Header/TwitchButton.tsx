"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TwitchUserStore, useAccountStore, useWalletStore } from "@/lib/states";
import { handleLogin } from "@/lib/auth";
import "./wallet-button.scss";

export default function TwitchButton() {
    const user = useAccountStore(state => state.user);
    const wallet = useWalletStore(state => state.wallet);
    const setUser = useAccountStore(state => state.setUser);
    const setStatus = useAccountStore(state => state.setStatus);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Get Twitch account via access-token
        
    }, [])

    async function login_twitch() {
        try {
            if (user || loading) return;
            setLoading(true);

            const user_ = await handleLogin("twitch");
            if (!user_?.thirdparty_user_info?.user_info?.name) return toast.error("Login failed");

            const newUser: TwitchUserStore = {
                preferred_username: user_.thirdparty_user_info.user_info.name,
    
                // Temporarily set as false
                textToSpeech: false,
                notificationsound: false
            }

            if (wallet) newUser["streamer_address"] = wallet;

            setUser(newUser);
        } catch (e) {
            console.error(e);
            toast.error("Login failed");
        }
    }

    return (
        <button
            onClick={async () => {
                await login_twitch();
                setLoading(false);
            }}
            className="flex items-center gap-2 px-5 h-12 text-[#A821DC] font-medium border-[1px] border-[#A51FDD] bg-black rounded-[26px] transition-colors hover:bg-[#00000020]"
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {user ? (
                        <>Logged in as {user.preferred_username}</>
                    ) : (
                        <>Twitch Login</>
                    )}
                    <Image src="/twitch.svg" alt="Twitch" height={28} width={28} />
                </>
            )}
        </button>
    );
}
