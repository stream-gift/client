"use server";

import { cookies } from "next/headers";

export default async function TwitchLogin(token: string) {
    return new Promise((resolve, reject) => {
        fetch(process.env.BACKEND + "/login-streamer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
        })
            .then(res => res.json())
            .then(res => {
                cookies().set("access-token", res.token, {
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days later
                });
                return resolve(res.token);
            })
            .catch(e => {
                return reject(false);
            });
    });
}
