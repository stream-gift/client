"use server";

import { cookies } from "next/headers";

export default async function TwitchLogin(uuid?: string, token?: string) {
    const accessToken = cookies().get("access-token")?.value;

    let bodyObject: any = accessToken ? { accessToken } : { uuid, token };

    const raw_response = await fetch(process.env.BACKEND + "/login-streamer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bodyObject, logged_via: "twitch" }),
    });
    const res = await raw_response.json();

    if (res?.logged) return res.data;
    if (res?.logged === false) {
        console.log("helo");
        cookies().delete("access-token");
        return { success: false };
    }

    if (res?.success === false) {
        return { success: false, error_message: res?.message };
    }

    if (res?.token) {
        cookies().set("access-token", res.token, {
            httpOnly: true,
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days later
        });
    }

    return res.data;
}
