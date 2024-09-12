import { notFound } from "next/navigation";
import { DonateInterface } from "./components/DonateInterface";
import { cn } from "@/lib/utils";
import { getContrastFromBg } from "@/utils/contrast";
import StreamerService from "@/lib/api/streamer.service";

interface PageProps {
  params: {
    streamer: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { streamer: username } = params;

  const data = await StreamerService.getStreamer(username);

  return {
    title: `Tip ${data.username} | stream.gift`,
  };
}

export default async function StreamerPage({ params }: PageProps) {
  const { streamer: username } = params;

  const data = await StreamerService.getStreamer(username);

  if (!data) {
    notFound();
  }

  // const data = {
  //   username: "fakes1lent",
  //   address: "A2PZXr4iRYPwcCLHXcU5tg7KJBB5NR1hU29sFy8bXPkC",
  //   profileImage:
  //     "https://utfs.io/f/a28bae5a-2d69-453f-b35f-e153c22c6dc3-3y2oyu.jpeg",
  //   profileBanner:
  //     "https://utfs.io/f/ed07bfee-0f64-4d4b-83e8-101895cc387b-23vk.jpeg",
  //   profileColor: "linear-gradient(to top left,#4facfe,#00f2fe)",
  // };

  return (
    <div
      className="min-h-screen w-full flex items-start md:items-center justify-center px-5 sm:px-8 pt-10 md:pt-0"
      style={{ background: data.profileColor }}
    >
      <div className="flex flex-grow w-full items-center justify-center">
        <div className="w-full md:max-w-[595px]">
          <h1
            className={cn(
              "text-2xl text-left font-light",
              getContrastFromBg(data.profileColor, "text-white", "text-black")
            )}
          >
            Send a tip to <span className="font-bold">{data.username}</span>
          </h1>

          <div className="w-full relative mt-4">
            <img
              src={data.profileBanner}
              alt={`${data.username} profile banner`}
              className="w-full h-40 object-cover rounded-xl"
            />

            <div
              className="absolute -bottom-4 left-6 p-[3px] rounded-full"
              style={{ background: data.profileColor }}
            >
              <img
                src={data.profileImage}
                alt={`${data.username} profile image`}
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
          </div>

          <DonateInterface username={data.username} className="mt-8" />

          <a
            href={`https://stream.gift?utm_source=${data.username}&utm_medium=footer`}
            target="_blank"
            className="mt-4 flex items-center justify-center text-xs opacity-70 hover:opacity-100 cursor-pointer transition-opacity duration-300 ease-in-out"
          >
            Powered by{" "}
            <img
              src="/images/logo.svg"
              alt="logo"
              className="size-4 ml-1 mr-1"
            />{" "}
            stream.gift
          </a>
        </div>
      </div>
    </div>
  );
}
