import { APIService } from "@/lib/api/server";
import { redirect } from "next/navigation";
import { DonationLink } from "../home/components/DonationLink";
import React from "react";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Popover } from "@/components/ui/popover";
import { TbInfoCircle } from "react-icons/tb";

import { ProfileEditor } from "./components/ProfileEditor";

export default async function ProfilePage() {
  const user = await APIService.Auth.getUser();
  if (!user) {
    return redirect("/login");
  }

  const streamer = await APIService.Streamer.getStreamer(user.id);
  if (!streamer) {
    return redirect("/onboard");
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">Profile</h1>
      <p className="text-gray-400">Edit the look of your donation page.</p>

      <div className="mt-6">
        <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1 flex flex-col">
          <div className="flex items-center gap-1.5 text-white/60">
            <h3 className="text-lg font-medium">Your Donation Link</h3>
            <Popover>
              <PopoverTrigger>
                <TbInfoCircle className="size-5" />
              </PopoverTrigger>
              <PopoverContent>
                <p className="font-bold">
                  Share this link with your viewers to receive donations!
                </p>

                <div className="mt-3">
                  stream.gift is the main link. tik.gift, twitch.gift and
                  kick.gift are for aesethetic purposes and redirect to
                  stream.gift
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <DonationLink username={streamer.username} />
        </div>
      </div>

      <div className="mt-6">
        <ProfileEditor streamer={streamer} />
      </div>
    </div>
  );
}
