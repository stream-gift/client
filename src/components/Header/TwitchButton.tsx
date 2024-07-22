"use client";

import Image from "next/image";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { type IUser, useAccountStore, useWalletStore } from "@/lib/states";
import TwitchLogin from "@/action/twitchLogin";
import { handleLogin } from "@/lib/auth";
import "./wallet-button.scss";

export default function TwitchButton() {
    const user = useAccountStore(state => state.user);
    const wallet = useWalletStore(state => state.wallet);
    const setUser = useAccountStore(state => state.setUser);
    const setStatus = useAccountStore(state => state.setStatus);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) return setStatus("fetched");
        else setLoading(false);

        (async () => {
            // Get Twitch account via access-token
            await loginAction();
            setLoading(false);
            setStatus("fetched");
        })();
    }, []);

    async function login_twitch() {
        try {
            if (user || loading) return;
            setLoading(true);

            const user_ = await handleLogin("twitch");
            if (!user_?.thirdparty_user_info?.user_info?.name) return toast.error("Login failed");

            const newUser: IUser = {
                preferred_username: user_.thirdparty_user_info.user_info.name,

                // Temporarily set as false
                textToSpeech: false,
                notificationsound: false,
                logged_via: "twitch"
            };

            if (wallet) newUser["evm_streamer_address"] = wallet;

            loginAction(user_.uuid, user_.token).catch((e) => {
                console.log(e);
                if (e?.error_message) toast.error(e.error_message);
                else toast.error("Login is failed");
            });
        } catch (e) {
            console.error(e);
            toast.error("Login failed");
        }
    }

    function loginAction(uuid?: string, token?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            TwitchLogin(uuid, token)
                .then((response: any) => {
                    if (response?.success !== false) {
                        setUser(response);
                        return resolve();
                    }
                    if (response?.error_message) {
                        return reject(response);
                    }
                    return reject();
                })
        });
    }

    if (user && user.logged_via !== "twitch") return <></>

    return (
        <button
            onClick={async () => {
                await login_twitch();
                setLoading(false);
                setStatus("fetched");
            }}
            className="flex items-center gap-2 px-5 h-12 text-[#A821DC] font-medium border-[1px] border-[#A51FDD] bg-black rounded-[26px] transition-colors hover:bg-[#00000020] max-md:px-2 max-md:h-8"
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {user ? (
                        <>
                            <span className="max-md:hidden">
                                Logged in as {user.preferred_username}
                            </span>
                            <span className="hidden max-md:flex">{user.preferred_username}</span>
                        </>
                    ) : (
                        <>LOGIN WITH TWITCH</>
                    )}
                    <Image
                        className="max-md:hidden"
                        src="/twitch.svg"
                        alt="Twitch"
                        height={28}
                        width={28}
                    />
                </>
            )}
        </button>
    );
}
