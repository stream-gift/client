export interface Vod {
    id: number;
    userid: string;
    src: string;
    name: string;
    hash: string;
    thumb: string | null;
    gif: string | null;
    duration: string | null;
    thetaid: string | null;
    player: string | null;
    progress: string | null;
    status: "downloading" | "downloaded" | "processed" | "uploading" | "completed" | "failed";
    createdAt: string;
    updatedAt: string;
}