"use server";

import { Vod } from "@/types/vod.type";
import { cookies } from "next/headers";

export default async function GetUserVods(userId: string): Promise<Vod[]> {
    const _cookies = cookies();

    return new Promise((resolve, reject) => { 
        try {
            fetch(`${process.env.VOD_SERVER}/api/videos?userid=${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-vod-api-key': process.env.VOD_API_KEY!,
                }
            })
            .then(res => res.json())
            .then((data) => {
                if (data.success) {
                    return resolve(data.data.rows);
                } else {
                    return reject(data.message);
                }
            });
        } catch (error) {
            return reject(error);
        }
    });
}