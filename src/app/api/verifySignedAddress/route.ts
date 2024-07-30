import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
    // let streamer = request.nextUrl.searchParams.get('streamer')
    // TODO: streamer query data...

    const body = await request.json();
    let res = await fetch(process.env.BACKEND + "/verifySignedAddress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });
    if (!res.ok) throw Error("bad");
    res = await res.json();
    return Response.json(res);
}
