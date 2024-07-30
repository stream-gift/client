"use server";

import { cookies } from "next/headers";

export default async function Logout() {
    cookies().delete("access-token");
    return true;
}
