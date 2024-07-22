/* eslint-disable @next/next/no-img-element */
"use client";

import { useTimeAgo } from "next-timeago";
import Link from "next/link";

import { IVod } from "@/types/vod.type";

export default function Vod({ vod }: { vod: IVod }) {
    const { TimeAgo } = useTimeAgo();

    return (
        <div key={vod.id}>
                            <Link
                                href={`${vod.status === "completed" ? `/clips/${vod.hash}` : "#"}`}
                                target="_blank"
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
                                                {vod.progress || '0'}%
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
    );
}