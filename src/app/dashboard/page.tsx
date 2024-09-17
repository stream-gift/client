import { APIService } from "@/lib/api/server";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await APIService.Auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const streamer = await APIService.Streamer.getStreamer(user.id);

  if (!streamer) {
    return redirect("/onboard");
  }

  const data = await APIService.Streamer.getDashboard();
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Dashboard!
      <pre className="text-sm">{JSON.stringify(data, null, 4)}</pre>
    </main>
  );
}
