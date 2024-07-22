"use client";

import AccountUpdate from '@/action/accountUpdate';
import Button from "@/components/Button";
import { useAccountStore } from "@/lib/states";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';

export default function Tips() {
    const user = useAccountStore(s => s.user);
    const setUser = useAccountStore(s => s.setUser);

    const [textToSpeech, setTextToSpeech] = useState<boolean>(false);
    const [notificationsound, setNotificationsound] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        setTextToSpeech(user?.textToSpeech);
        setNotificationsound(user?.notificationsound);
    }, [user]);

    function saveChanges() {
        if (!user) return;

        AccountUpdate({ textToSpeech, notificationsound })
            .then(() => {
                toast.success("Handle is successfully set");
                setUser({ ...user, textToSpeech, notificationsound });
            })
            .catch(response => {
                if (response?.message) toast.error(response.message);
            })
    }

    return (
        <div>
            <h1 className="text-5xl font-medium mb-6">Tips/Crowdfunding</h1>
            <p className="text-xl font-light mb-16">
                Modify your stream settings for incoming donations.
            </p>

            <h2 className="text-2xl font-medium mb-2">Appearance</h2>
            <div className="flex flex-col gap-3 w-[700px] p-4 rounded-2xl border-[1px] border-[rgba(255,255,255,0.20)] max-md:w-full mb-10">
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        className="scale-150"
                        id="donation-sound"
                        checked={notificationsound}
                        onChange={() => setNotificationsound(s => !s)}
                    />
                    <label className="text-lg" htmlFor="donation-sound">
                        Play a notification sound when you get a donation
                    </label>
                </div>
                <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        className="scale-[1.60]"
                        id="tts-sound"
                        checked={textToSpeech}
                        onChange={() => setTextToSpeech(s => !s)}
                    />
                    <label className="text-lg" htmlFor="tts-sound">
                        TTS (text-to-speech) messages when donation
                    </label>
                </div>
            </div>

            <Button
                click={saveChanges}
                type="tealbox"
                disabled={
                    textToSpeech === user?.textToSpeech &&
                    notificationsound === user?.notificationsound
                }
            >
                Save Changes
            </Button>
        </div>
    );
}
