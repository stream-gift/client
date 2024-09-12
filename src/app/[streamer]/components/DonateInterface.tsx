"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

interface DonationButtonProps {
  amount: number;
  currentAmount: number;
  setCurrentAmount: (amount: number) => void;
  usingCustomAmount: boolean;
  setUsingCustomAmount: (amount: boolean) => void;
}

const DonationButton: React.FC<DonationButtonProps> = ({
  amount,
  currentAmount,
  setCurrentAmount,
  usingCustomAmount,
  setUsingCustomAmount,
}) => {
  return (
    <Button
      variant={
        currentAmount === amount && !usingCustomAmount ? "outline" : "light"
      }
      className={cn(
        currentAmount === amount && !usingCustomAmount
          ? "text-white"
          : "border border-gray-200"
      )}
      onClick={() => {
        setCurrentAmount(amount);
        setUsingCustomAmount(false);
      }}
    >
      <img
        src="https://cryptologos.cc/logos/solana-sol-logo.png"
        className="size-3.5 rounded-full mr-1.5"
        alt="solana"
      />
      {amount}
    </Button>
  );
};

interface DonateInterfaceProps {
  username: string;
  className?: string;
}

export const DonateInterface: React.FC<DonateInterfaceProps> = ({
  username,
  className,
}) => {
  const [presetAmount, setPresetAmount] = useState(0.2);
  const [usingCustomAmount, setUsingCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);

  const donationAmount = useMemo(
    () => (usingCustomAmount ? customAmount : presetAmount),
    [usingCustomAmount, customAmount, presetAmount]
  );

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 h-fit md:min-h-72",
        className
      )}
    >
      <div className="bg-white h-full rounded-lg p-4 text-black">
        <h3 className="text-md font-semibold">Tip Amount</h3>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <DonationButton
            amount={0.05}
            currentAmount={presetAmount}
            setCurrentAmount={setPresetAmount}
            usingCustomAmount={usingCustomAmount}
            setUsingCustomAmount={setUsingCustomAmount}
          />

          <DonationButton
            amount={0.1}
            currentAmount={presetAmount}
            setCurrentAmount={setPresetAmount}
            usingCustomAmount={usingCustomAmount}
            setUsingCustomAmount={setUsingCustomAmount}
          />

          <DonationButton
            amount={0.2}
            currentAmount={presetAmount}
            setCurrentAmount={setPresetAmount}
            usingCustomAmount={usingCustomAmount}
            setUsingCustomAmount={setUsingCustomAmount}
          />

          <DonationButton
            amount={0.3}
            currentAmount={presetAmount}
            setCurrentAmount={setPresetAmount}
            usingCustomAmount={usingCustomAmount}
            setUsingCustomAmount={setUsingCustomAmount}
          />

          <DonationButton
            amount={0.5}
            currentAmount={presetAmount}
            setCurrentAmount={setPresetAmount}
            usingCustomAmount={usingCustomAmount}
            setUsingCustomAmount={setUsingCustomAmount}
          />

          <Button
            variant={usingCustomAmount ? "outline" : "light"}
            className={cn(
              usingCustomAmount ? "text-white" : "border border-gray-200"
            )}
            onClick={() => setUsingCustomAmount(true)}
          >
            Custom
          </Button>
        </div>

        {usingCustomAmount && (
          <div className="flex items-center justify-center">
            <Input
              type="number"
              className="w-full mt-4 border-gray-200"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(Number(e.target.value))}
              min={0}
              step={0.0001}
              max={400}
              // ~ $50k
              startContent={
                <img
                  src="https://cryptologos.cc/logos/solana-sol-logo.png"
                  className="size-3.5 rounded-full mr-1.5"
                  alt="solana"
                />
              }
            />
          </div>
        )}
        <h3 className="text-md font-semibold mt-4">Message</h3>
        <Textarea
          className="w-full mt-2 resize-none border-gray-200"
          placeholder="Add a message for the streamer"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <h3 className="text-md font-semibold mt-4">Name</h3>
        <Input
          type="text"
          className="w-full mt-2 border-gray-200"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="bg-white h-full rounded-lg p-4 text-black">
        <pre className="text-xs">
          {JSON.stringify(
            {
              donationAmount,
              message,
              name,
            },
            null,
            2
          )}
        </pre>
      </div>
    </div>
  );
};
