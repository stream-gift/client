import { NextResponse } from "next/server";

type ErrorRes = {
  error: {
    code: number;
    message: string;
    name: string;
  };
};

type UploadResponse = {
  requestid: string;
  status: string;
  created: string;
  pin: {
    cid: string;
    name: string;
  };
};

export const POST = async (request: Request) => {
  try {
    // Upload Image
    const formData = await request.formData();
    const file = formData.get("file") as File;

    const uploadHeaders = new Headers();
    uploadHeaders.append("x-api-key", process.env.QUICKNODE_KEY!);

    const formdata = new FormData();
    formdata.append("Body", file, file.name);
    formdata.append("Key", Date.now() + file.name);
    formdata.append("ContentType", file.type);

    const req = await fetch(
      "https://api.quicknode.com/ipfs/rest/v1/s3/put-object",
      {
        method: "POST",
        headers: uploadHeaders,
        body: formdata,
      },
    );
    const data = (await req.json()) as ErrorRes | UploadResponse;

    if ("error" in data) {
      console.warn("Error uploading to IFPS:", data.error);
      throw data.error;
    }

    return NextResponse.json({ cid: data.pin.cid, name: data.pin.name });
  } catch (error) {
    console.error("Error in upload handler:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 },
    );
  }
};
