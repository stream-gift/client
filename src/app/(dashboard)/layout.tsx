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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen lg:h-screen flex max-w-[100%] bg-zinc-950">
      <Sidebar className="w-[20%] hidden lg:flex border-r border-white/10" />

      <div id="scroll-reset" className="w-full overflow-y-auto">
        <div className="p-8 h-full w-full">{children}</div>
      </div>
    </div>
  );
}
