"use server";

import { IVod } from "@/types/vod.type";
import { cookies } from "next/headers";

export default async function GetVodStatus(hash: string): Promise<IVod> {
    const _cookies = cookies();

    return new Promise((resolve, reject) => { 
        try {
            fetch(`${process.env.VOD_SERVER}/api/videos/status?hash=${hash}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-vod-api-key': process.env.VOD_API_KEY!,
                }
            })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    return resolve(data.data.video);
                } else {
                    return reject(data.message);
                }
            });
        } catch (error) {
            return reject(error);
        }
    });
}