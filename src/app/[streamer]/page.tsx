import { notFound } from "next/navigation";
import { DonateInterface } from "./components/DonateInterface";
import { cn } from "@/lib/utils";
import { getContrastFromBg } from "@/utils/contrast";
import { APIService } from "@/lib/api/server";
import { getOptimalColorFromBackground } from "@/utils/color";

interface PageProps {
  params: {
    streamer: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const data = await APIService.Streamer.getStreamer(params.streamer);

  if (!data) {
    notFound();
  }

  return {
    title: `Tip ${data.username} | stream.gift`,
  };
}

export default async function StreamerPage({ params }: PageProps) {
  const data = await APIService.Streamer.getStreamer(params.streamer);

  if (!data) {
    notFound();
  }

  return (
    <div
      className="min-h-screen w-full flex items-start md:items-center justify-center px-5 sm:px-8 py-10 md:py-0"
      style={{ background: data.profileColor }}
    >
      <div className="flex flex-grow w-full items-center justify-center">
        <div className="w-full md:max-w-[595px]">
          <h1
            className={cn(
              "text-2xl text-left font-light",
              getContrastFromBg(data.profileColor, "text-black", "text-white")
            )}
          >
            Send a tip to <span className="font-medium">{data.username}</span>
          </h1>

          <div className="w-full relative mt-4">
            <img
              src={data.profileBanner || "https://i.imgur.com/iugfnT6.jpg"}
              alt={`${data.username} profile banner`}
              className="w-full h-40 object-cover rounded-xl"
            />

            <div
              className="absolute -bottom-4 left-6 p-[2.5px] rounded-full"
              style={{
                background: getOptimalColorFromBackground(data.profileColor),
              }}
            >
              <img
                src={data.profileImage}
                alt={`${data.username} profile image`}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          </div>

          <DonateInterface streamer={data} className="mt-8" />
        </div>
      </div>
    </div>
  );
}
