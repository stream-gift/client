import { Button } from "@/components/ui/button";
import { APIService } from "@/lib/api/server";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";
import {
  TbArrowUp,
  TbCheck,
  TbCircle,
  TbCircleCheck,
  TbCircleCheckFilled,
  TbCircleXFilled,
  TbDownload,
  TbExternalLink,
  TbLoader2,
  TbMoneybag,
  TbProgressCheck,
  TbSend,
  TbTrendingUp,
} from "react-icons/tb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WithdrawBalance from "./components/WithdrawBalance";
import { TimeAgo } from "@/components/timeago";
import { cn } from "@/lib/utils";
import { MIST_PER_SUI } from "@mysten/sui/utils";

export default async function BalancesPage() {
  const addresses = await APIService.Streamer.getAddresses();
  const balances = await APIService.Streamer.getBalances();
  const withdrawals = await APIService.Streamer.getWithdrawals();

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">Balances</h1>
      <p className="text-gray-400">
        View your current balances, make a withdrawal and see withdrawal
        history.
      </p>

      <div className="mt-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <div className="border border-white/10 bg-zinc-900 p-3 rounded-lg flex items-center justify-center gap-4">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-1">
                  <p className="text-green-400 text-base tracking-wide">
                    Current Balance
                  </p>
                  <TbArrowUp className="text-green-400" />
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <img src="/images/3p/sui.png" alt="SUI" className="size-6" />

                  <p className="text-white text-2xl font-bold font-mono">
                    {balances.find((balance: any) => balance.currency === "SUI")
                      ?.balance / Number(MIST_PER_SUI) || 0}
                    <span className="text-white ml-2">SUI</span>
                  </p>
                </div>
              </div>
            </div>

            <WithdrawBalance
              className="mt-5 w-full"
              addresses={addresses}
              balances={balances}
            />

            <h2 className="text-xl font-medium text-white/80 mt-5">
              Withdrawals History
            </h2>

            {withdrawals.length === 0 && (
              <>
                <div className="mt-5 h-48 border border-white/20 rounded-lg border-dashed flex flex-col items-center justify-center">
                  <TbDownload className="text-white size-10" />
                  <p className="text-white/80 text-lg mt-3">
                    No withdrawals yet
                  </p>
                </div>
              </>
            )}

            <div className="mt-4 flex flex-col gap-4">
              {withdrawals.map((withdrawal: StreamerWithdrawal) => (
                <div
                  key={withdrawal.id}
                  className="bg-zinc-900 border border-white/10 p-5 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/3p/sui.png"
                        className="size-5"
                        alt="sui"
                      />
                      <div className="flex items-center gap-1 font-mono text-xl">
                        <span className="font-medium">
                          {withdrawal.amount / Number(MIST_PER_SUI)}
                        </span>
                        <span className="text-white/60">SUI</span>
                      </div>
                    </div>

                    <a
                      href={
                        withdrawal.transactionHash
                          ? `https://suiscan.xyz/mainnet/tx/${withdrawal.transactionHash}`
                          : "#"
                      }
                      target="_blank"
                    >
                      <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-all text-sm">
                        <div>
                          <TimeAgo date={withdrawal.createdAt} />
                        </div>

                        {withdrawal.transactionHash && <TbExternalLink />}
                      </div>
                    </a>
                  </div>

                  {withdrawal.status === "COMPLETED" && (
                    <>
                      <div className="px-3 py-[2.5px] text-sm bg-green-500 rounded-full flex items-center gap-1 mt-3 w-fit shadow shadow-green-500/50 font-medium">
                        <TbCircleCheckFilled className="text-white size-4" />
                        <span>Completed</span>
                      </div>
                    </>
                  )}

                  {withdrawal.status === "FAILED" && (
                    <>
                      <div className="px-3 py-[2.5px] text-sm bg-red-500 rounded-full flex items-center gap-1 mt-3 w-fit shadow shadow-red-500/50 font-medium">
                        <TbCircleXFilled className="text-white size-4" />
                        <span>Failed</span>
                      </div>
                    </>
                  )}

                  {withdrawal.status === "SENT" && (
                    <>
                      <div className="px-3 py-[2.5px] text-sm bg-blue-500 rounded-full flex items-center gap-1 mt-3 w-fit shadow shadow-blue-500/50 font-medium">
                        <TbSend className="text-white size-4" />
                        <span>Sent</span>
                      </div>
                    </>
                  )}

                  {withdrawal.status === "PENDING" && (
                    <>
                      <div className="px-3 py-[2.5px] text-black text-sm bg-yellow-500 rounded-full flex items-center gap-1 mt-3 w-fit shadow shadow-yellow-500/50 font-medium">
                        <TbLoader2 className="size-4 animate-spin" />
                        <span>Processing</span>
                      </div>
                    </>
                  )}

                  <div
                    className={cn(
                      "mt-3 text-sm",
                      !withdrawal.transactionHash ? "hidden" : "",
                    )}
                  >
                    <div className="mt-1 break-all">
                      <span className="text-white/60 mr-2 font-medium">
                        Address
                      </span>{" "}
                      <span className="leading-relaxed">
                        {withdrawal.address}
                      </span>
                    </div>

                    <div className="mt-1 break-all">
                      <span className="text-white/60 mr-2 font-medium">
                        Transaction Hash
                      </span>{" "}
                      <span className="leading-relaxed">
                        {withdrawal.transactionHash}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-medium text-white/80 mb-2">
              Frequently Asked Questions
            </h2>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  How often are balances updated?
                </AccordionTrigger>
                <AccordionContent>
                  Balances are updated in real-time. You&apos;ll see the most
                  current balance reflecting your latest transactions and
                  earnings.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  What&apos;s the minimum withdrawal amount?
                </AccordionTrigger>
                <AccordionContent>
                  The minimum withdrawal amount is 0.1 SOL. This helps to ensure
                  that transaction fees don&apos;t eat into smaller withdrawals.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How long do withdrawals take?
                </AccordionTrigger>
                <AccordionContent>
                  Withdrawals are typically processed immediately. Once
                  processed, the transaction will be sent & visible on the
                  Solana blockchain. The speed of the transaction is dependent
                  on the Solana network.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Are there any fees for withdrawals?
                </AccordionTrigger>
                <AccordionContent>
                  We don&apos;t charge any fees for withdrawals. However,
                  standard Solana network transaction fees will apply, which are
                  typically very low.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I withdraw to any Solana wallet?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can withdraw to any valid Solana wallet address.
                  Always double-check the withdrawal address to ensure it&apos;s
                  correct.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* <pre className="mt-6">
        {JSON.stringify(
          {
            addresses,
            balances,
            withdrawals,
          },
          null,
          2
        )}
      </pre> */}
    </div>
  );
}
