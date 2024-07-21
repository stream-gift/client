/* eslint-disable @next/next/no-img-element */
"use client";

import GetUserVods from "@/action/getUserVods";
import { Vod } from "@/types/vod.type";
import { useEffect, useState } from "react";
import { useTimeAgo } from "next-timeago";
import Link from "next/link";
import { useAccountStore, useModalStore } from "@/lib/states";

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
                .filter(vod => vod.status !== "failed")
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
                        <div key={vod.id}>
                            <Link
                                href={`/dashboard/clips/${vod.status === "completed" ? vod.hash : "#"}`}
                            >
                                <div className="relative w-full aspect-video cursor-pointer hover:scale-[1.03] transition-all duration-300">
                                    <img
                                        src={`/assets/vod${vod.thumb}`}
                                        alt={vod.name}
                                        className="w-full rounded-lg border border-gray-800 shadow-md"
                                        id={`vod-${vod.hash}`}
                                        onMouseEnter={() => {
                                            const elem = document.querySelector(
                                                `#vod-${vod.hash}`,
                                            ) as HTMLImageElement | undefined;
                                            if (elem) {
                                                elem.src = `/assets/vod${vod.gif}`;
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            const elem = document.querySelector(
                                                `#vod-${vod.hash}`,
                                            ) as HTMLImageElement | undefined;
                                            if (elem) {
                                                elem.src = `/assets/vod${vod.thumb}`;
                                            }
                                        }}
                                    />

                                    {vod.status === "uploading" && (
                                        <div className="absolute z-50 w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.80)] rounded-md flex flex-col items-center justify-center">
                                            <p className="text-white font-medium">Uploading...</p>
                                            <small className="text-white mt-1">
                                                {vod.progress}%
                                            </small>
                                        </div>
                                    )}

                                    {(vod.status === "downloading" ||
                                        vod.status === "downloaded" ||
                                        vod.status === "processed") && (
                                        <div className="absolute z-50 w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.80)] rounded-md flex flex-col items-center justify-center">
                                            <p className="text-white font-medium">Downloading...</p>
                                        </div>
                                    )}

                                    {vod.duration && (
                                        <div className="absolute bottom-2 right-2 bg-[rgba(0,0,0,0.75)] rounded-md px-2 py-1 text-xs">
                                            <p className="text-white">{vod.duration}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-3">
                                    <p className="text-xl font-medium">{vod.name}</p>
                                    <small className="text-gray-400">
                                        <TimeAgo date={vod.createdAt} />
                                    </small>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
