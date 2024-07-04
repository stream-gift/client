import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { QueryClient } from "@tanstack/react-query";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    // let streamer = request.nextUrl.searchParams.get('streamer')
    //TODO: streamer query data...

    return Response.json({
        status: "alive",
    });
}
