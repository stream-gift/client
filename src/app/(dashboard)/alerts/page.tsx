import { Input } from "@/components/ui/input";
import { APIService } from "@/lib/api/server";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import React from "react";
import { TbInfoCircle } from "react-icons/tb";
import { EventsLink } from "./components/EventsLink";
import { AlertSettings } from "./components/AlertSettings";

export default async function AlertsPage() {
  const settings = await APIService.Streamer.getSettings();
  const token = await APIService.Streamer.getToken();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">Alerts</h1>
      <p className="text-gray-400">
        Customize your alerts and change alert settings.
      </p>

      <div className="mt-6">
        <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1 flex flex-col">
          <div className="flex items-center gap-1.5 text-white/60">
            <h3 className="text-lg font-medium">Alerts Browser Source Link</h3>
            <Popover>
              <PopoverTrigger>
                <TbInfoCircle className="size-5" />
              </PopoverTrigger>
              <PopoverContent>
                <p className="font-bold">
                  This is the browser source link where donation alerts will
                  display.
                </p>

                <div className="mt-3">
                  In your streaming software, add a browser source, and add the
                  link above. Remember to interact with the page and click the
                  &quot;Start&quot; button to receive live donation alerts.
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <EventsLink token={token} />
        </div>
      </div>

      <div className="mt-6">
        <AlertSettings settings={settings} />
      </div>

      {/* <pre>{JSON.stringify({ settings, token }, null, 2)}</pre> */}
    </div>
  );
}
