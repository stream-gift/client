import { APIService } from "@/lib/api/server";
import { LoggedIn, LoggedOut, useUser } from "./user-provider";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await APIService.Auth.getUser();
  const streamer = user ? await APIService.Streamer.getStreamer(user.id) : null;

  if (streamer) {
    return redirect(`/home`);
  }

  if (user) {
    return redirect(`/onboard`);
  }

  return <main className="min-h-screen"></main>;
}
