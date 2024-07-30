"use server";

import { type IUser } from "@/lib/states";
import { cookies } from "next/headers";

type AtLeastOneTwitchUserStoreKey = {
    [K in keyof IUser]: { [P in K]: IUser[P] };
}[keyof IUser] &
    Partial<IUser>;

export default async function AccountUpdate(update: AtLeastOneTwitchUserStoreKey) {
    return new Promise(async (resolve, reject) => {
        let token: string | undefined = cookies().get("access-token")?.value;

        if (!token) return reject({ status: false, message: "User cannot be found" });

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
                return reject({ status: false, message: e?.message || "An error occured" });
            });
    });
}
