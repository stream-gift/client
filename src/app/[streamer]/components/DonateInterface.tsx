"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { ClientAPIService } from "@/lib/api/client";
import { cn } from "@/lib/utils";
import { getOptimalColorFromBackground } from "@/utils/color";
import { getContrastFromBg } from "@/utils/contrast";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useQRCode } from "next-qrcode";
import { TbCopy, TbQrcode, TbSend, TbWallet, TbX } from "react-icons/tb";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckmarkAnimation } from "@/components/checkmark";
import { HiEmojiSad } from "react-icons/hi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
  useSignAndExecuteTransaction,
} from "@mysten/dapp-kit";
import { Transaction as TransactionBlock } from "@mysten/sui/transactions";
import { parseUnits } from "@/utils/bigints";

interface DonationButtonProps {
  amount: number;
  currentAmount: number;
  setCurrentAmount: (amount: number) => void;
  usingCustomAmount: boolean;
  setUsingCustomAmount: (amount: boolean) => void;
  disabled: boolean;
}

const DonationButton: React.FC<DonationButtonProps> = ({
  amount,
  currentAmount,
  setCurrentAmount,
  usingCustomAmount,
  setUsingCustomAmount,
  disabled,
}) => {
  return (
    <Button
      variant={
        currentAmount === amount && !usingCustomAmount ? "outline" : "light"
      }
      className={cn(
        // "font-mono text-xs",
        currentAmount === amount && !usingCustomAmount
          ? "text-white"
          : "border border-gray-200",
      )}
      onClick={() => {
        setCurrentAmount(amount);
        setUsingCustomAmount(false);
      }}
      disabled={disabled}
    >
      <img src="/images/3p/sui.png" className="size-3.5 mr-1.5" alt="solana" />
      {amount}
    </Button>
  );
};

const USDCDonationButton: React.FC<DonationButtonProps> = ({
  amount,
  currentAmount,
  setCurrentAmount,
  usingCustomAmount,
  setUsingCustomAmount,
  disabled,
}) => {
  return (
    <Button
      variant={
        currentAmount === amount && !usingCustomAmount ? "outline" : "light"
      }
      className={cn(
        // "font-mono text-xs",
        currentAmount === amount && !usingCustomAmount
          ? "text-white"
          : "border border-gray-200",
      )}
      onClick={() => {
        setCurrentAmount(amount);
        setUsingCustomAmount(false);
      }}
      disabled={disabled}
    >
      <img src="/images/3p/usdc.png" className="size-3.5 mr-1.5" alt="usdc" />
      {amount}
    </Button>
  );
};

interface DonateInterfaceProps {
  streamer: {
    username: string;
    profileColor: string;
  };
  className?: string;
}

const DONATION_AMOUNTS_SUI = [0.25, 1, 2, 5, 10];
const DONATION_AMOUNTS_USDC = [1, 3, 5, 10, 20];
const DONATION_TIME_LEFT = 15 * 60;

export const DonateInterface: React.FC<DonateInterfaceProps> = ({
  streamer,
  className,
}) => {
  const [currency, setCurrency] = useState<string>("sui");

  useEffect(() => {
    setPresetAmount(
      currency === "sui" ? DONATION_AMOUNTS_SUI[2] : DONATION_AMOUNTS_USDC[2],
    );
    setUsingCustomAmount(false);
  }, [currency]);

  const { Image: ImageQRCode } = useQRCode();

  const wallet = useCurrentAccount();
  const { mutate: disconnectWallet } = useDisconnectWallet();
  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  const [presetAmount, setPresetAmount] = useState(0.2);
  const [usingCustomAmount, setUsingCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState(0);

  const donationAmount = useMemo(
    () => (usingCustomAmount ? customAmount : presetAmount),
    [usingCustomAmount, customAmount, presetAmount],
  );

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const backgroundColor = useMemo(
    () => getOptimalColorFromBackground(streamer.profileColor),
    [],
  );
  const contrastColor = useMemo(() => getContrastFromBg(backgroundColor), []);

  const [isLoading, setIsLoading] = useState(false);

  const [donation, setDonation] = useState<any>(null);
  const [address, setAddress] = useState<string>("");
  const [secondsLeft, setSecondsLeft] = useState(DONATION_TIME_LEFT);
  const [secondsCounterInterval, setSecondsCounterInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [checkInterval, setCheckInterval] = useState<NodeJS.Timeout | null>(
    null,
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);

    const { donation, address } = await ClientAPIService.Donation.donate({
      message,
      name,
      amount: donationAmount,
      username: streamer.username,
      currency: "SOL",
    });

    setDonation(donation);
    setAddress(address.address);
    setSecondsLeft(DONATION_TIME_LEFT);

    localStorage.setItem(`donation-${streamer.username}`, donation.id);

    setSecondsLeft(DONATION_TIME_LEFT);
    setSecondsCounterInterval(
      setInterval(() => {
        setSecondsLeft((secondsLeft) => {
          if (secondsLeft <= 1) {
            clearInterval(secondsCounterInterval!);
            setSecondsCounterInterval(null);
            setError(true);
            setErrorMessage("Time ran out!");
          }

          return secondsLeft - 1;
        });
      }, 1000),
    );

    setCheckInterval(
      setInterval(async () => {
        const { donation: latestDonationState } =
          await ClientAPIService.Donation.getDonation(donation.id);

        if (latestDonationState.status === "PENDING") {
          return;
        }

        if (latestDonationState.status === "COMPLETED") {
          setSuccess(true);
        } else if (latestDonationState.status === "FAILED") {
          setError(true);
          setErrorMessage("Donation failed");
        }

        clearInterval(checkInterval!);
        setCheckInterval(null);
      }, 1000),
    );

    setIsLoading(false);
  };

  const handleTransactionSubmit = async () => {
    if (!wallet) throw new Error("WalletNotConnected");

    try {
      const amount = parseUnits(donationAmount.toString(10), 9);
      const txb = new TransactionBlock();
      const coin = txb.splitCoins(txb.gas, [amount]);
      txb.transferObjects([coin], address);
      const response = await signAndExecuteTransaction({
        transaction: txb,
      });
      console.log(`Transaction signature: ${response.signature}`);
      setSuccess(true);
    } catch (error) {
      console.error("Transaction failed", error);
      toast.error("Failed to send transaction");
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-4 h-fit md:min-h-72",
        className,
      )}
    >
      <div className="bg-white h-full rounded-lg p-4 text-black">
        <div className="flex items-center gap-3">
          <h3 className="text-md font-semibold">Tip Amount</h3>
        </div>

        <Tabs value={currency} onValueChange={setCurrency}>
          <TabsList className="mt-2 w-full grid grid-cols-2 gap-2 bg-gray-100">
            <TabsTrigger
              className="data-[state=active]:bg-white data-[state=active]:text-black"
              value="sui"
            >
              SUI
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-white data-[state=active]:text-black"
              value="usdc"
            >
              USDC
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sui">
            <div className="grid grid-cols-3 gap-2 mt-2">
              {DONATION_AMOUNTS_SUI.map((amount) => (
                <DonationButton
                  key={amount}
                  amount={amount}
                  currentAmount={presetAmount}
                  setCurrentAmount={setPresetAmount}
                  usingCustomAmount={usingCustomAmount}
                  setUsingCustomAmount={setUsingCustomAmount}
                  disabled={!!address}
                />
              ))}

              <Button
                variant={usingCustomAmount ? "outline" : "light"}
                className={cn(
                  usingCustomAmount ? "text-white" : "border border-gray-200",
                )}
                onClick={() => setUsingCustomAmount(true)}
                disabled={!!address}
              >
                Custom
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="usdc">
            <div className="grid grid-cols-3 gap-2 mt-2">
              {DONATION_AMOUNTS_USDC.map((amount) => (
                <USDCDonationButton
                  key={amount}
                  amount={amount}
                  currentAmount={presetAmount}
                  setCurrentAmount={setPresetAmount}
                  usingCustomAmount={usingCustomAmount}
                  setUsingCustomAmount={setUsingCustomAmount}
                  disabled={!!address}
                />
              ))}

              <Button
                variant={usingCustomAmount ? "outline" : "light"}
                className={cn(
                  usingCustomAmount ? "text-white" : "border border-gray-200",
                )}
                onClick={() => setUsingCustomAmount(true)}
                disabled={!!address}
              >
                Custom
              </Button>
            </div>
          </TabsContent>
        </Tabs>

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
                  src="/images/3p/usdc.png"
                  className="size-3.5 mr-1.5"
                  alt="usdc"
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
          disabled={!!address}
        />

        <h3 className="text-md font-semibold mt-4">Name</h3>
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={!!address}
          className={cn(
            "w-full mt-2 border-gray-200",
            !!address && "opacity-50",
          )}
        />
      </div>

      <div className="bg-white h-full rounded-lg p-4 text-black flex flex-col">
        {success && (
          <div className="text-center flex flex-grow flex-col h-full items-center justify-center">
            <CheckmarkAnimation />
            <div className="mt-2 font-bold">Thanks!</div>
            <div className="text-sm opacity-70">
              Your tip has been sent to {streamer.username}
            </div>
          </div>
        )}

        {error && (
          <div className="text-center flex flex-grow flex-col h-full items-center justify-center">
            <HiEmojiSad className="size-10 text-red-500" />
            <div className="mt-2 font-bold">Error</div>
            <div className="text-sm opacity-70">
              The timer ran out or your tip was lower than expected
            </div>
          </div>
        )}

        <div className="flex flex-col">
          {address && !success && !error && (
            <div className="">
              <div className="text-center text-sm mb-1">
                <span className="font-bold">
                  {Math.floor(secondsLeft / 60)}:
                  {secondsLeft % 60 < 10
                    ? `0${secondsLeft % 60}`
                    : secondsLeft % 60}
                </span>{" "}
                left
              </div>
              <Progress value={(secondsLeft / DONATION_TIME_LEFT) * 100} />

              <div className="mt-3 text-sm flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Streamer</div>
                  <div className="font-mono text-xs">{streamer.username}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-medium">Amount</div>
                  <div className="flex items-center">
                    <img
                      src="/images/3p/sui.png"
                      className="size-3 mr-1.5"
                      alt="solana"
                    />
                    <div className="font-mono text-xs">
                      {donationAmount} SUI
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-medium">Address</div>
                  <div className="flex items-center gap-1">
                    <div className="font-mono text-xs">
                      {address.slice(0, 6)}...{address.slice(-6)}
                    </div>
                    <TbCopy
                      className="size-3.5 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(address);
                        toast.success("Copied to clipboard");
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="font-medium">Wallet</div>
                  <div className="flex items-center gap-1">
                    <div className="font-mono text-xs">
                      {wallet
                        ? `${wallet.address.slice(0, 6)}...${wallet.address.slice(-6)}`
                        : "Not Connected"}
                    </div>
                    <TbX
                      className={cn(
                        "size-3.5 opacity-50 hover:opacity-100 transition-opacity duration-300 ease-in-out cursor-pointer",
                        !wallet && "hidden",
                      )}
                      onClick={() => disconnectWallet()}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-col gap-2">
                {wallet ? (
                  <Button
                    style={{ backgroundColor, color: contrastColor }}
                    className="w-full hover:opacity-80 transition-opacity duration-300 ease-in-out"
                    onClick={handleTransactionSubmit}
                  >
                    <TbSend className="mr-2 h-4 w-4" />
                    Send Transaction
                  </Button>
                ) : (
                  <ConnectButton
                    style={{ backgroundColor, color: contrastColor }}
                    className="w-full hover:opacity-80 transition-opacity duration-300 ease-in-out"
                    connectText={
                      <>
                        <TbWallet className="mr-2 h-4 w-4" />
                        Connect Wallet
                      </>
                    }
                  />
                )}

                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="w-full hover:opacity-80 transition-opacity duration-300 ease-in-out bg-gray-200 text-black hover:bg-gray-300">
                      <TbQrcode className="mr-2 h-4 w-4" />
                      Show QR Code
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="bg-white w-fit border-0 p-0 rounded-lg"
                    sideOffset={10}
                  >
                    <div className="w-fit border border-gray-200 rounded-lg p-1 shadow">
                      <ImageQRCode
                        text={`sui:${address}?amount=${donationAmount}`}
                        options={{
                          errorCorrectionLevel: "M",
                          margin: 3,
                          scale: 4,
                        }}
                        logo={{
                          src: "/images/logo-dark.png",
                          options: {
                            width: 24,
                          },
                        }}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center justify-center mt-3 text-sm">
                <div className="relative mr-1.5">
                  <div className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary" />
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="text-xs text-muted">
                  Waiting for Transaction
                </div>
              </div>
            </div>
          )}

          {!address && (
            <>
              <div className="flex items-center justify-center">
                Tip{" "}
                <img
                  src={
                    currency === "sui"
                      ? "/images/3p/sui.png"
                      : "/images/3p/usdc.png"
                  }
                  className="size-3.5 ml-1.5 mr-1"
                  alt={currency === "sui" ? "sui" : "usdc"}
                />
                {donationAmount} {currency === "sui" ? "SUI" : "USDC"} to{" "}
                {streamer.username}
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <Button
                  className="w-full hover:opacity-80 transition-opacity duration-300 ease-in-out"
                  style={{ backgroundColor, color: contrastColor }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Confirm Tip
                </Button>
              </div>
            </>
          )}
        </div>

        <div className="mt-3 md:mt-auto flex flex-col">
          {!address && (
            <>
              <div className="text-xs opacity-65 text-center">
                By tipping, you agree to the{" "}
                <a
                  href="https://stream.gift/terms"
                  target="_blank"
                  className="underline"
                >
                  Terms of Service
                </a>
              </div>
            </>
          )}

          <a
            href={`https://stream.gift?utm_source=${streamer.username}&utm_medium=footer`}
            target="_blank"
            className="mt-2 flex items-center justify-center text-xs opacity-50 hover:opacity-100 cursor-pointer transition-opacity duration-300 ease-in-out"
          >
            Powered by{" "}
            <img
              src="/images/logo.svg"
              alt="logo"
              className="size-4 ml-1 mr-1 filter invert"
            />{" "}
            stream.gift
          </a>
        </div>
      </div>
    </div>
  );
};
