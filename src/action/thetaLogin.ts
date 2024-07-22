"use server";

import { cookies } from "next/headers";

export default async function ThetaLogin(wallet?: string) {
    const accessToken = cookies().get("theta-access-token")?.value;

    let bodyObject: any = accessToken ? { accessToken } : { wallet };

    const raw_response = await fetch(process.env.BACKEND + "/login-streamer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...bodyObject, logged_via: "theta" }),
    });
    const res = await raw_response.json();

    if (res?.logged) return res.data;
    if (res?.logged === false) {
        cookies().delete("theta-access-token");
        return { success: false };
    }

    if (res?.success === false) {
        return { success: false, error_message: res?.message };
    }

    if (res?.token) {
        cookies().set("theta-access-token", res.token, {
            httpOnly: true,
            expires: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30), // 30 days later
        });
    }

    return res.data;
}
