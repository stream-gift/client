"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  TbSmartHome,
  TbCoins,
  TbMoneybag,
  TbUserPlus,
  TbSettings,
  TbNotification,
  TbVideo,
  TbMovie,
  TbBrandDiscord,
  TbPodium,
  TbTrophy,
  TbUserCircle,
} from "react-icons/tb";
import { FaDiscord } from "react-icons/fa";
import { useUser } from "@/app/user-provider";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
const SidebarButtonIconClass = cn(
  "size-4 text-white/60 group-hover:text-white transition-all"
);

function SidebarButton({
  icon,
  label,
  route,
  target,
}: {
  icon: React.ReactNode;
  label: string;
  route: string;
  target?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === route;
  return (
    <Link href={route} target={target}>
      <Button
        className="w-full justify-start group gap-2.5 px-3"
        variant={isActive ? "default" : "ghost"}
      >
        {icon}
        <span className="text-sm">{label}</span>
      </Button>
    </Link>
  );
}

export function Sidebar({ className }: { className?: string }) {
  const { user, streamer } = useUser();

  return (
    <div className={cn("p-6 flex flex-col", className)}>
      <div className="flex items-center gap-2">
        <img src="/images/logo.svg" className="size-8" alt="Logo" />
        {/* <span className="font-medium text-lg">stream.gift</span> */}
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-2 mt-3">
          <div className="text-sm text-white/80">Dashboard</div>

          <SidebarButton
            icon={<TbSmartHome className={SidebarButtonIconClass} />}
            label="Home"
            route="/home"
          />

          <SidebarButton
            icon={<TbCoins className={SidebarButtonIconClass} />}
            label="Donations"
            route="/donations"
          />

          <SidebarButton
            icon={<TbMoneybag className={SidebarButtonIconClass} />}
            label="Balances"
            route="/balances"
          />

          <SidebarButton
            icon={<TbNotification className={SidebarButtonIconClass} />}
            label="Alerts"
            route="/alerts"
          />

          <SidebarButton
            icon={
              <TbMovie strokeWidth={1.2} className={SidebarButtonIconClass} />
            }
            label="Streams"
            route="/streams"
          />

          {/* <SidebarButton
            icon={
              <TbUserCircle
                strokeWidth={1.2}
                className={SidebarButtonIconClass}
              />
            }
            label="Profile"
            route="/profile"
          /> */}

          {/* <SidebarButton
            icon={<TbUserPlus className={SidebarButtonIconClass} />}
            label="Referrals"
            route="/referrals"
          /> */}
        </div>

        <div className="flex flex-col gap-2 mt-6">
          <div className="text-sm text-white/80">Community</div>

          {/* <SidebarButton
            icon={<TbTrophy className={SidebarButtonIconClass} />}
            label="Leaderboard"
            route="/leaderboard"
          /> */}

          <SidebarButton
            icon={<FaDiscord className={SidebarButtonIconClass} />}
            label="Discord"
            route="https://discord.gg/TgmAQRraSA"
            target="_blank"
          />
        </div>
      </div>

      <div className="flex flex-grow justify-start items-end">
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={
                streamer!.profileImage ||
                user!.googleImage ||
                (user!.twitchImage as string)
              }
            />
          </Avatar>
          <div>
            <div className="text-base text-white font-medium">
              {streamer!.username}
            </div>
            <div className="text-sm text-white/60"> Streamer</div>
          </div>
        </div>
      </div>
    </div>
  );
}
