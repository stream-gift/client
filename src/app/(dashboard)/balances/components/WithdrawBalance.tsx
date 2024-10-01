"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { use, useMemo, useState } from "react";
import { TbDownload, TbLoader2 } from "react-icons/tb";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { ClientAPIService } from "@/lib/api/client";
import { useRouter } from "next/navigation";

export default function WithdrawBalance({
  className,
  addresses,
  balances,
}: {
  className?: string;
  addresses: Address[];
  balances: StreamerBalance[];
}) {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);

  const currentBalance = useMemo(() => {
    return balances.find((b) => b.currency === "SOL")?.balance || 0;
  }, [balances]);

  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalAddress, setWithdrawalAddress] = useState(
    addresses[0]?.address || ""
  );

  const [isLoading, setIsLoading] = useState(false);

  const withdraw = async () => {
    setIsLoading(true);

    const withdrawalAmountLamports = withdrawalAmount * LAMPORTS_PER_SOL;

    if (withdrawalAmountLamports > currentBalance) {
      toast.error("Insufficient balance");
      setIsLoading(false);
      return;
    }

    const withdrawal = await ClientAPIService.Streamer.withdraw({
      amount: withdrawalAmountLamports,
      address: withdrawalAddress,
    });

    toast.success("Withdrawal initiated...");
    setIsLoading(false);
    setModalOpen(false);

    router.refresh();
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(className)}
          size="lg"
          onClick={() => setModalOpen(true)}
        >
          <TbDownload className="mr-2" />
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h3 className="mb-4 text-xl">New Withdrawal</h3>

          <div>
            <div>
              <div className="mb-2">Amount</div>
              <Input
                placeholder="Amount"
                type="number"
                min={0}
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
              />

              <div className="text-xs text-white/80 mt-2">
                Max: {currentBalance / LAMPORTS_PER_SOL} SOL
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2">Address</div>
              <Input
                placeholder="Address"
                type="text"
                value={withdrawalAddress}
                onChange={(e) => setWithdrawalAddress(e.target.value)}
              />

              <div className="text-xs text-white/80 mt-2">
                Must be a Solana address on SOL Chain
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={withdraw}
              disabled={isLoading}
            >
              {isLoading ? (
                <TbLoader2 className="mr-2 animate-spin" />
              ) : (
                <TbDownload className="mr-2" />
              )}
              Withdraw
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
