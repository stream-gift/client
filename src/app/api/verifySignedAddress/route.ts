import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient } from "@tanstack/react-query";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    // let streamer = request.nextUrl.searchParams.get('streamer')
    //TODO: streamer query data...
    const body = await request.json();
    console.log(body);
    let res = await fetch(process.env.BACKEND + "/verifySignedAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw Error("bad");
    res = await res.json();
    console.log("success", res);
    return Response.json(res);
}
