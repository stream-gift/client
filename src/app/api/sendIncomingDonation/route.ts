import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient } from "@tanstack/react-query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    let streamer = request.nextUrl.searchParams.get("streamer"); // streamer = recipient
    let sender = request.nextUrl.searchParams.get("sender");
    let digest = request.nextUrl.searchParams.get("digest");
    let message = request.nextUrl.searchParams.get("message");
    //TODO: streamer query data...
    console.log(message);
    async function callAPI(streamer: string, digest: string) {
        const streamer_address =
            "0x7049901babe076fd05d88f93d3504b6025dab5b15b98fdca921f9ca8e3b52bfb";
        console.log("fetching for ", digest);
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
