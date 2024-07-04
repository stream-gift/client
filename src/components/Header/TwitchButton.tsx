'use client'

import toast from "react-hot-toast";
import { useState } from "react";
import { TwitchUserStore, useAccountStore } from "@/lib/states";

import './wallet-button.scss';
import { handleLogin } from '@/lib/auth';

export default function TwitchButton() {

    const user = useAccountStore(state => state.user);
    const setUser = useAccountStore(state => state.setUser);

    const [loading, setLoading] = useState(false);

    async function login_twitch() {
        setLoading(true);
        const user = await handleLogin("twitch");
        console.log(user);
        setLoading(false);
    }

    if (loading) return <></>

    return (
        <>
        { user ? (
            <p
                className="wallet-connect-button"
                style={{ color: "#6441a5" }}
            >
                {user.preferred_username}
            </p>
        ) : (
            <button
                onClick={login_twitch}
                className="wallet-connect-button"
                style={{ color: "#6441a5" }}
            >
                #twitch-login
            </button>
        )}
        </>
    )
}