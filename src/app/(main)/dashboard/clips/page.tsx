/* eslint-disable @next/next/no-img-element */
"use client";

import GetUserVods from "@/action/getUserVods";
import { IVod } from "@/types/vod.type";
import { useEffect, useState } from "react";
import { useTimeAgo } from "next-timeago";
import Link from "next/link";
import { useAccountStore, useModalStore } from "@/lib/states";
import Vod from "@/components/Clips/Vod";

export default function Clips() {
    const { TimeAgo } = useTimeAgo();

    const modal = useModalStore(state => state);
    const user = useAccountStore(state => state.user);

    const [initialLoading, setInitialLoading] = useState(true);
    const [vods, setVods] = useState<Vod[]>([]);

    const getVods = async () => {
        if (!user) {
            return;
        }

        const userVods = await GetUserVods(`twitch:${user.preferred_username}`);
        setVods(
            userVods
                .sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                )
                // .filter(vod => vod.status !== "failed")
                .map(vod => ({
                    ...vod,
                    thumb: vod.thumb || "/thumbs/placeholder.jpg",
                    gif: vod.gif || "/thumbs/placeholder.gif",
                })),
        );

        setInitialLoading(false);
    };

    const onVodModalCallback = () => {
        getVods();
    };

    useEffect(() => {
        getVods();
    }, [user]);

    return (
        <div className="w-full">
            <h1 className="text-5xl font-medium mb-6">Clips/VODs</h1>
            
            <button
                onClick={() => modal.setModal("vod-modal", { callback: onVodModalCallback })}
                className="text-[#262626] font-medium w-[160px] py-3 rounded-[4px] bg-teal"
            >
                Upload a VOD
            </button>

            {initialLoading && <p className="text-2xl font-light mt-8">Loading VODs...</p>}

            {vods.length === 0 && !initialLoading && (
                <p className="text-2xl font-light mt-8">You have no VODs uploaded currently.</p>
            )}

            <div className="mt-8 w-full">
                <div className="grid grid-cols-4 gap-4">
                    {vods.map(vod => (
                        <Vod key={vod.hash} vod={vod} />
                    ))}
                </div>
            </div>
        </div>
    );
}
