import { APIService } from "@/lib/api/server";
import { redirect } from "next/navigation";
import {
  TbCash,
  TbChartAreaLine,
  TbCoins,
  TbExternalLink,
  TbInfoCircle,
  TbMoneybag,
  TbTrendingUp,
} from "react-icons/tb";

import { Chart } from "./components/Chart";
import { Button } from "@/components/ui/button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DonationLink } from "./components/DonationLink";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimeAgo } from "@/components/timeago";
import { cn } from "@/lib/utils";

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

  return (
    <div className="container mx-auto pb-8">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Home</h1>

        <div>
          <div className="bg-zinc-900 border border-white/10 text-white px-4 py-2 rounded-md flex items-center gap-2.5 text-sm relative">
            <div className="size-2 rounded-full bg-gradient-to-br from-green-600 to-green-400 shadow-inner shadow-white/5"></div>
            <div className="size-2 absolute animate-ping rounded-full bg-green-500"></div>
            Live Data
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-white/10 bg-zinc-900 p-3 rounded-lg flex items-center gap-3">
          <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
            <TbCoins className="text-white size-6" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-white/50 text-sm tracking-wide">Donations</p>
              <TbTrendingUp className="text-green-400" />
            </div>
            <p className="text-white text-xl font-bold font-mono">
              {data.aggregated.totalDonations}
            </p>
          </div>
        </div>

        <div className="border border-white/10 bg-zinc-900 p-3 rounded-lg flex items-center gap-3">
          <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
            <TbCash className="text-white size-6" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-white/50 text-sm tracking-wide">Earnings</p>
              <TbTrendingUp className="text-green-400" />
            </div>
            <p className="text-white text-xl font-bold font-mono">
              {data.aggregated.totalDonationsAmount / LAMPORTS_PER_SOL || 0}
              <span className="text-white/60 ml-2">SOL</span>
            </p>
          </div>
        </div>

        <div className="border border-white/10 bg-zinc-900 p-3 rounded-lg flex items-center gap-3">
          <div className="p-4 bg-gradient-to-br from-primary to-primary/80 rounded-lg">
            <TbMoneybag className="text-white size-6" />
          </div>

          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <p className="text-white/50 text-sm tracking-wide">Balance</p>
              <TbTrendingUp className="text-green-400" />
            </div>
            <p className="text-white text-xl font-bold font-mono">
              {data.balances.find((balance: any) => balance.currency === "SOL")
                ?.balance / LAMPORTS_PER_SOL || 0}
              <span className="text-white/60 ml-2">SOL</span>
            </p>
          </div>
        </div>

        <div className="border border-white/10 bg-zinc-900 p-6 rounded-lg md:col-span-2 relative">
          <div
            className={cn(
              "p-0 md:p-4",
              data.donations.length === 0 && "blur-md"
            )}
          >
            <Chart data={data.donations} />
          </div>

          {data.donations.length === 0 && (
            <div className="absolute top-0 left-0 w-full h-full z-10 rounded-lg flex flex-col items-center justify-center">
              <TbChartAreaLine className="text-white size-12" />
              <p className="text-white/80 text-base mt-3">No data available</p>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
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
                    stream.gift is the main link. twitch.gift and kick.gift are
                    for aesethetic purposes and redirect to stream.gift
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <DonationLink username={streamer.username} />
          </div>
          <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1 flex flex-col flex-grow">
            <h3 className="text-white/60 text-lg font-medium">
              Recent Donations
            </h3>

            {data.donations.length === 0 ? (
              <div className="mt-3 flex flex-col items-center justify-center flex-grow">
                <TbCoins className="text-white size-10" />
                <p className="text-white/80 text-base mt-3">No donations yet</p>
              </div>
            ) : (
              <ScrollArea className="mt-3 h-[360px] w-full pr-4">
                <div className="flex flex-col gap-4">
                  {data.donations.map((donation: Donation) => (
                    <div
                      key={donation.id}
                      className="bg-zinc-800 border border-white/10 p-4 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src="/images/3p/solana.png"
                            className="size-5"
                            alt="solana"
                          />
                          <div className="flex items-center gap-1 font-mono text-xl">
                            <span className="font-medium">
                              {donation.amount / LAMPORTS_PER_SOL}
                            </span>
                            <span className="text-white/60">SOL</span>
                          </div>
                        </div>

                        <a
                          href={`https://explorer.solana.com/tx/${donation.transactionHash}`}
                          target="_blank"
                        >
                          <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-all text-sm">
                            <div>
                              <TimeAgo date={donation.updatedAt} />
                            </div>

                            <TbExternalLink />
                          </div>
                        </a>
                      </div>

                      <div className="text-white/50 text-sm mt-1">
                        ~{(donation.amountUsd / 100).toFixed(2)} USDT
                      </div>

                      <div className="mt-3 text-sm">
                        <div>
                          <span className="text-white/60 mr-2 font-medium">
                            Message
                          </span>{" "}
                          {donation.message || "[empty]"}
                        </div>

                        <div className="mt-1">
                          <span className="text-white/60 mr-2 font-medium">
                            Name
                          </span>{" "}
                          {donation.name || "[empty]"}
                        </div>

                        <div className="mt-1">
                          <span className="text-white/60 mr-2 font-medium">
                            Sender
                          </span>{" "}
                          {donation.transactionSender!.slice(0, 8) +
                            "..." +
                            donation.transactionSender!.slice(-8)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
