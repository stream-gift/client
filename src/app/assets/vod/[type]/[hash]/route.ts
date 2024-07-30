import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";

async function getPlaceholderBlob() {
    return await fetch("https://www.propertyhealthcheck.ie/wp-content/uploads/2020/05/video-placeholder.png")
        .then((res) => res.blob());
}

export async function GET(request: NextRequest, { params }: { params: { type: string; hash: string } }) {
    const { type, hash } = params;

    let blob;

    if (type !== "gifs" && type !== "thumbs") {
        blob = await getPlaceholderBlob();
        return new Response(blob, { headers: { "content-type": "image/png" } });
    }

    const response = await fetch(`${process.env.VOD_SERVER}/${type}/${hash}`, {
        headers: {
            "x-vod-api-key": process.env.VOD_API_KEY!,
        },
    });

    if (response.status === 404) {
        blob = await getPlaceholderBlob();
        return new Response(blob, { headers: { "content-type": "image/png" } });
    }

    blob = await response.blob();

    if (type === "gifs") {
        return new Response(blob, { headers: { "content-type": "image/gif" } });
    } else {
        return new Response(blob, { headers: { "content-type": "image/jpeg" } });
    }
}
