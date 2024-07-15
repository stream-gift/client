"use server";

import { cookies } from "next/headers";

export default async function TwitchLogin(uuid?: string, token?: string, wallet?: string) {
    return new Promise((resolve, reject) => {
        const accessToken = cookies().get("access-token")?.value;

        let bodyObject: any = accessToken ? { accessToken } : { uuid, token };
        if (wallet) bodyObject["wallet"] = wallet;

        fetch(process.env.BACKEND + "/login-streamer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyObject),
        })
            .then(res => res.json())
            .then(res => {
                if (res?.logged) return resolve(res.data);
                if (res?.logged === false) {
                    cookies().delete("access-token");
                    return reject();
                }

                if (res?.token) {
                    cookies().set("access-token", res.token, {
                        httpOnly: true,
                        expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days later
                    });
                }

                return resolve(res.data);
            })
            .catch(e => {
                console.error(e);
                return reject({ success: false });
            });
    });
}
