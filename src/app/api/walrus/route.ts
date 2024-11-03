import { request } from "http";
import { NextResponse } from "next/server";

type ErrorRes = {
  error: {
    code: number;
    message: string;
    name: string;
  };
};

type UploadResponse =
  | {
      newlyCreated: {
        blobObject: {
          id: string;
          storedEpoch: number;
          blobId: string;
        };
      };
    }
  | {
      alreadyCertified: {
        blobId: string;
      };
    };

export const POST = async (request: Request) => {
  try {
    // Upload Image
    const formData = await request.formData();
    const file = formData.get("file") as File;

    const req = await fetch(
      `${process.env.WALRUS_PUBLISHER}/v1/store?epochs=30`,
      {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      },
    );
    const data = (await req.json()) as ErrorRes | UploadResponse;

    if ("error" in data) {
      console.warn("Error uploading to Walrus:", data.error);
      throw data.error;
    }

    const blobId =
      "alreadyCertified" in data
        ? data.alreadyCertified.blobId
        : data.newlyCreated.blobObject.blobId;

    return NextResponse.json({
      cid: blobId,
      name: file.name,
    });
  } catch (error) {
    console.error("Error in upload handler:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
};

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const blobId = searchParams.get("blobId");
  const response = await fetch(`${process.env.WALRUS_AGGREGATOR}/v1/${blobId}`);
  return response;
};
