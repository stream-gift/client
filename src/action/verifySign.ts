"use server";

import { cookies } from "next/headers";

export default async function VerifySignature(sign: string, wallet: string) {
    return new Promise(async (resolve, reject) => {
        let token: string | undefined = cookies().get("access-token")?.value;

        if (!token) return reject({ status: false, message: "User cannot be found" });

        fetch(process.env.BACKEND + "/verifySignedAddress", {
            method: "POST",
            headers: {
                "access-token": token || "",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ signature: sign, address: wallet }),
        })
            .then(res => res.json())
            .then(res => {
                return resolve({ status: res?.status ?? false });
            })
            .catch(e => {
                return reject({ status: false, message: e?.message || "An error occured" });
            });
    });
}
