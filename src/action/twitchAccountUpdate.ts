"use server";

import { TwitchUserStore } from "@/lib/states";
import { cookies } from "next/headers";

export default async function TwitchAccountUpdate(update: TwitchUserStore) {
    return new Promise(async (resolve, reject) => {
        let token: string | undefined = cookies().get("access-token")?.value;

        if (!token) return reject({ status: false, error_message: "User cannot be found" });

        fetch(process.env.BACKEND + "/update-streamer", {
            method: "POST",
            headers: {
                "access-token": token || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ update }),
        })
            .then(res => res.json())
            .then(res => {
                return resolve({ status: true });
            })
            .catch(e => {
                return reject({ status: false, error_message: e?.message || "An error occured" });
            });
    });
}
