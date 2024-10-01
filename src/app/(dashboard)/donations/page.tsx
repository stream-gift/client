import { TimeAgo } from "@/components/timeago";
import { APIService } from "@/lib/api/server";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { redirect } from "next/navigation";
import React from "react";
import { TbCoins, TbExternalLink } from "react-icons/tb";

export default async function DonationsPage() {
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
      <h1 className="text-3xl font-bold mb-2">Donations</h1>
      <p className="text-gray-400">View & see all your donations.</p>

      {data.donations.length === 0 && (
        <div className="mt-6 h-64 border border-white/20 rounded-lg border-dashed flex flex-col items-center justify-center">
          <TbCoins className="text-white size-12" />
          <p className="text-white/80 text-lg mt-3">No donations yet</p>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        {data.donations.map((donation: Donation) => (
          <div
            key={donation.id}
            className="bg-zinc-900 border border-white/10 p-6 rounded-lg"
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
                <span className="text-white/60 mr-2 font-medium">Message</span>{" "}
                {donation.message || "[empty]"}
              </div>

              <div className="mt-1">
                <span className="text-white/60 mr-2 font-medium">Name</span>{" "}
                {donation.name || "[empty]"}
              </div>

              <div className="mt-1 break-all">
                <span className="text-white/60 mr-2 font-medium">Sender</span>{" "}
                {donation.transactionSender}
              </div>

              <div className="mt-1 break-all">
                <span className="text-white/60 mr-2 font-medium">
                  Transaction Hash
                </span>{" "}
                {donation.transactionHash}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
