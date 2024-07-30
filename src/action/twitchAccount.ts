"use server";

import { cookies } from "next/headers";

export default async function TwitchAccount(token?: string) {
    return new Promise((resolve, reject) => {
        let access_token: string | undefined = cookies().get("access-token")?.value;
        if (!token && access_token) token = access_token;
        else if (!token && !access_token) return reject({ status: false });

        fetch(process.env.BACKEND + "/check-streamer", {
            method: "GET",
            headers: {
                "access-token": token || "",
            },
        })
            .then(res => res.json())
            .then(res => {
                return resolve(res.user);
            })
            .catch(e => {
                return reject({ status: false });
            });
    });
}
