import AuthService from "@/lib/api/auth.service";
import StreamerService from "@/lib/api/streamer.service";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await AuthService.getUser();

  if (!user) {
    return redirect("/login");
  }

  const streamer = await StreamerService.getStreamer(user.id);

  if (!streamer) {
    return redirect("/onboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard!
    </main>
  );
}
