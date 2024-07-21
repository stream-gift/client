/* eslint-disable @next/next/no-img-element */
"use client";

import { Vod } from "@/types/vod.type";
import { useEffect, useState } from "react";
import { useTimeAgo } from "next-timeago";
import { useParams, useRouter } from "next/navigation";
import GetVodStatus from "@/action/getVodStatus";
import Link from "next/link";

export default function Clips() {
    const { TimeAgo } = useTimeAgo();

    const router = useRouter()
    const params = useParams();

    const [initialLoading, setInitialLoading] = useState(true);
    const [vod, setVod] = useState<Vod>();

    useEffect(() => {
        const getVod = async () => {
            try {
                const userVod = await GetVodStatus(params.id as string);
                setVod(userVod);
                setInitialLoading(false);

                console.log(userVod);
            } catch {
                router.push("/dashboard/clips");
            }
        };

        getVod();
    }, []);

    return (
        <div className="w-full h-full">
            <Link href="/dashboard/clips" className="text-teal transition-all underline">
                Back to Clips/VODs
            </Link>

            {vod && <>
                <h1 className="text-5xl font-medium mt-6 mb-3">{vod.name}</h1>
                <p className="text-gray-400">
                    <TimeAgo date={vod.createdAt} />
                </p>
            </>}

            {initialLoading && (
                <p className="text-2xl font-light mt-8">Loading VOD...</p>
            )}

            <div className="mt-8 w-full">
                {vod && <div className="w-full">
                    <iframe src={vod!.player!} className="w-full aspect-video" />
                </div>}
            </div>
        </div>
    );
}
