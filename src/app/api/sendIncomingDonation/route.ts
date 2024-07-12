import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    let streamer = request.nextUrl.searchParams.get("streamer"); // streamer = recipient
    let sender = request.nextUrl.searchParams.get("sender");
    let digest = request.nextUrl.searchParams.get("digest");
    let message = request.nextUrl.searchParams.get("message");

    // TODO: streamer query data...
    async function callAPI(streamer: string, digest: string) {
        let res = await fetch(
            `${process.env.BACKEND}/incoming_donation?digest=${digest}&streamer=${streamer}&sender=${sender}&message=${message}`,
        );
        if (!res.ok) throw Error("bad");
        res = await res.json();
        return res;
    }

    let res = await callAPI(String(streamer), String(digest));
    return Response.json(res);
}
