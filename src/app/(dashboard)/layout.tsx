import { Button } from "@/components/ui/button";
import {
  TbCoins,
  TbHome2,
  TbMoneybag,
  TbSettings,
  TbSmartHome,
  TbUserPlus,
} from "react-icons/tb";
import { Sidebar } from "./components/Sidebar";
import { useUser } from "../user-provider";
import { redirect } from "next/navigation";
import { APIService } from "@/lib/api/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await APIService.Auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const streamer = await APIService.Streamer.getStreamer(user.id);

  if (!streamer) {
    return redirect("/onboard");
  }

  return (
    <div className="min-h-screen lg:h-screen flex max-w-[100%] bg-zinc-950">
      <Sidebar className="w-[20%] hidden lg:flex border-r border-white/10" />

      <div id="scroll-reset" className="w-full overflow-y-auto">
        <div className="p-8 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
