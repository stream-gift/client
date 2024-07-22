"use client";

import { IUser, useAccountStore, useWalletStore } from "@/lib/states";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { truncateWalletAddress } from '@/lib/helper';
import ThetaLogin from '@/action/thetaLogin';

export default function ThetaButton() {
    const user = useAccountStore(state => state.user);
    const wallet = useWalletStore(state => state.wallet);
    const setUser = useAccountStore(state => state.setUser);
    const setStatus = useAccountStore(state => state.setStatus);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user || !wallet) return setStatus("fetched");
        else setLoading(false);

        (async () => {
            // Get Theta account via access-token
            await loginAction();
        })();
    }, [wallet]);

    useEffect(() => {
        if (user) setStatus("fetched");
    }, [user])

    async function login_theta() {
        try {
            if (user || loading) return;
            if (!wallet) return toast.error("You must connect your wallet");
            setLoading(true);

            const newUser: IUser = {
                preferred_username: truncateWalletAddress(wallet),

                // Temporarily set as false
                textToSpeech: false,
                notificationsound: false,
                logged_via: "theta",
            };

            newUser["evm_streamer_address"] = wallet;

            loginAction(wallet).catch((e) => {
                console.log(e);
                if (e?.error_message) toast.error(e.error_message);
                else toast.error("Login is failed");
            });
        } catch (e) {
            console.error(e);
            toast.error("Login failed");
        }
    }

    function loginAction(wallet_?: string): Promise<void> {
        setLoading(true);
        return new Promise((resolve, reject) => {
            if (!wallet_ && !wallet) {
                setLoading(false);
                setStatus("fetched");
                return reject()
            };

            ThetaLogin(wallet_)
                .then((response: any) => {
                    setLoading(false);
                    setStatus("fetched");

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

    return (
        <button
            onClick={async () => {
                await login_theta();
            }}
            className="flex items-center gap-2 px-5 h-12 text-white font-bold border-[1px] border-teal bg-black rounded-[26px] transition-colors hover:bg-[#00000020] max-md:px-2 max-md:h-8"
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
                        <>THETA EDGECLOUD</>
                    )}
                    <Image
                        className="max-md:hidden"
                        src="/edgecloud.svg"
                        alt="Edgecloud"
                        height={28}
                        width={28}
                    />
                </>
            )}
        </button>
    );
}
