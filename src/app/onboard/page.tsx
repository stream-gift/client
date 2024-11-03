"use client";

import Marquee from "@/components/magicui/marquee";
import WordRotate from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import {
  TbCircleCheckFilled,
  TbCircleXFilled,
  TbLink,
  TbLoader2,
} from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { GradientPicker } from "@/components/gradient-picker";
import { toast } from "sonner";

import { useRef } from "react";
import type { ConfettiRef } from "@/components/magicui/confetti";
import Confetti from "@/components/magicui/confetti";

import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { isValidSuiAddress } from "@mysten/sui/utils";
import { ClientAPIService } from "@/lib/api/client";
import Particles from "@/components/magicui/particles";
import { UploadButton } from "@/components/UploadWalrusButton";

const DISALLOWED_USERNAMES = [
  "admin",
  "mod",
  "moderator",
  "support",
  "login",
  "home",
  "settings",
  "alerts",
  "donations",
  "withdrawals",
];

export default function Onboard() {
  const [step, setStep] = useState(1); // Start at 1
  const currentAccount = useCurrentAccount();

  const [finalLoading, setFinalLoading] = useState(false);
  const [finalDone, setFinalDone] = useState(false);
  const confettiRef = useRef<ConfettiRef>(null);

  const [streamerDomainName, setStreamerDomainName] = useState<string>("");

  const onboardUser = async () => {
    setFinalLoading(true);

    const response = await ClientAPIService.Streamer.onboard({
      username,
      address,
      profileImage,
      profileBanner,
      profileColor,
    });

    setStreamerDomainName(response.streamerDomainName);

    setTimeout(() => {
      setFinalLoading(false);
      setFinalDone(true);
      confettiRef.current?.fire();
    }, 4980);
  };

  const nextStep = () => {
    const currentStep = step;
    const nextStep = currentStep + 1;

    if (canGoNext) {
      setStep(nextStep);
    }

    if (nextStep === 5) {
      onboardUser();
    }
  };

  const prevStep = () => {
    if (canGoBack) {
      setStep(step - 1);
    }
  };

  const [username, setUsername] = useState("");
  const onUsernameInputChange = (value: string) => {
    // Remove spaces, non-alphanumeric characters, and special characters
    setUsername(value.replace(/\s/g, "").replace(/[^a-zA-Z0-9-_.]/g, ""));
  };

  const [checkedMap, setCheckedMap] = useState<Record<string, boolean>>({});
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [checkUsernameTimeout, setCheckUsernameTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (username.length === 0) {
      return;
    }

    if (checkUsernameTimeout) {
      clearTimeout(checkUsernameTimeout);
    }

    setCheckUsernameTimeout(
      setTimeout(async () => {
        setIsCheckingUsername(true);

        const usernameDisallowed = DISALLOWED_USERNAMES.includes(
          username.trim().toLowerCase(),
        );
        const usernameAlreadyTaken =
          await ClientAPIService.Streamer.getStreamer(username).then(
            (data) => !!data,
          );

        const canUseUsername = !usernameDisallowed && !usernameAlreadyTaken;

        setIsCheckingUsername(false);
        setCheckedMap((prev) => ({
          ...prev,
          [username]: canUseUsername,
        }));
      }, 500),
    );
  }, [username]);

  const [address, setAddress] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    if (currentAccount) {
      setAddress(currentAccount.address);
      setWalletConnected(true);
    } else {
      setAddress("");
      setWalletConnected(false);
    }
  }, [currentAccount]);

  const isAddressValid = useMemo(() => {
    if (!address || address.length < 32) {
      return false;
    }

    return isValidSuiAddress(address);
  }, [address]);

  const [profileImage, setProfileImage] = useState<string>("");
  const [profileBanner, setProfileBanner] = useState<string>("");
  const [profileColor, setProfileColor] = useState("#e2e2e2");

  const [profileImageName, setProfileImageName] = useState<string>("");
  const [profileBannerName, setProfileBannerName] = useState<string>("");

  const canGoNext = useMemo(() => {
    if (step === 2) return checkedMap[username] === true;
    if (step === 3) return isAddressValid;
    if (step === 4) return profileImage && profileColor;
    if (step < 5) return true;
    return false;
  }, [step, checkedMap, username, isAddressValid, profileImage, profileColor]);

  const canGoBack = useMemo(() => step > 1, [step]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white w-full p-5 lg:p-8 flex relative overflow-hidden">
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color={"#fff"}
        refresh
      />

      <div className="w-full lg:w-2/3 bg-indigo-600 rounded-xl flex-shrink-0 self-stretch p-8 relative overflow-hidden">
        {finalDone && (
          <Confetti
            ref={confettiRef}
            className="absolute top-0 left-0 z-0 size-full"
          />
        )}

        <div className="lg:w-11/12 w-full mx-auto flex flex-col items-center justify-between h-full">
          <div className="w-full">
            <div className="grid grid-cols-4 gap-4 mb-8 lg:mb-0">
              <div>
                <Progress value={step >= 2 ? 100 : 0} />
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      step === 1 ? "text-sm" : "text-xs text-white/60",
                      "transition-all duration-500",
                    )}
                  >
                    1. Start
                  </div>
                </div>
              </div>
              <div>
                <Progress value={step >= 3 ? 100 : 0} />
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      step === 2 ? "text-sm" : "text-xs text-white/60",
                      "transition-all duration-500",
                    )}
                  >
                    2. Link
                  </div>
                </div>
              </div>
              <div>
                <Progress value={step >= 4 ? 100 : 0} />
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      step === 3 ? "text-sm" : "text-xs text-white/60",
                      "transition-all duration-500",
                    )}
                  >
                    3. Wallets
                  </div>
                </div>
              </div>
              <div>
                <Progress value={step >= 5 ? 100 : 0} />
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      step === 4 ? "text-sm" : "text-xs text-white/60",
                      "transition-all duration-500",
                    )}
                  >
                    4. Profile
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full text-left"
            >
              {step === 1 && (
                <>
                  <div className="text-3xl font-bold text-white">
                    Let&apos;s get you started
                  </div>
                  <div className="mt-2 text-md text-white/60">
                    Just a few quick details so you can start accepting tips!
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                    <div className="rounded-xl p-3 bg-white">
                      <div className="aspect-video bg-gradient-to-b from-gray-100 to-white rounded-xl mb-3">
                        <div className="flex justify-center items-center h-full w-full">
                          <div className="bg-white shadow rounded-full px-3 py-1.5 text-md flex items-center text-black/60 overflow-hidden">
                            <TbLink className="mr-1" />
                            <span>stream.gift/</span>
                            <div className="w-8">
                              <WordRotate
                                className="text-black"
                                words={["ninja", "jake", "xqc", "tfue"]}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-md font-bold text-black">
                        Your Link
                      </div>
                      <div className="text-sm text-black/60">
                        Set your own custom link to start accepting tips!
                      </div>
                    </div>
                    <div className="rounded-xl p-3 bg-white">
                      <div className="aspect-video bg-gradient-to-b from-gray-100 to-white rounded-xl mb-3">
                        <div className="flex justify-center items-center h-full w-full relative">
                          <Marquee className="[--duration:20s]">
                            <img
                              src="https://moralis.io/wp-content/uploads/2023/11/Phantom-Wallet.png"
                              alt=""
                              className="aspect-square size-12 rounded-xl shadow mr-1"
                            />
                            <img
                              src="https://sdn.signalhire.co/storage/company/ebbb/0439/e731/920d/d489/bcf3/3b83/57f5.webp"
                              alt=""
                              className="aspect-square size-12 rounded-xl shadow mr-1"
                            />
                            <img
                              src="/images/3p/solflare.jpeg"
                              alt=""
                              className="aspect-square size-12 rounded-xl shadow mr-1"
                            />
                            <img
                              src="https://play-lh.googleusercontent.com/d0y_tc6f3BRdVodzpcqoXYQSndvlMoXXqHAwHmDvzwghRvQO8WGSM1I8_lHK_OUNVQ"
                              alt=""
                              className="aspect-square size-12 rounded-xl shadow mr-1"
                            />
                          </Marquee>

                          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-gray-50 rounded-xl"></div>
                          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-gray-50 rounded-xl"></div>
                        </div>
                      </div>
                      <div className="text-md font-bold text-black">
                        Connect Wallet
                      </div>
                      <div className="text-sm text-black/60">
                        Connect your wallet so we can send you your tips!
                      </div>
                    </div>
                    <div className="rounded-xl p-3 bg-white">
                      <div className="aspect-video bg-gradient-to-b from-gray-100 to-white rounded-xl mb-3">
                        <div className="flex flex-col justify-center items-center h-full w-full relative scale-125">
                          <div className="bg-white rounded-sm shadow-sm w-1/2 h-10 mt-2 overflow-hidden">
                            <img
                              src="https://marketplace.canva.com/EAEeOQwo3jY/1/0/1600w/canva-purple-mountain-vintage-retro-twitch-banner-1NYTq34QR6I.jpg"
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-row items-start w-1/2">
                            <div className="rounded-full bg-white p-[1.75px] size-8 -mt-5 ml-2">
                              <img
                                src="https://i.seadn.io/gae/jCQAQBNKmnS_AZ_2jTqBgBLIVYaRFxLX6COWo-HCHrYJ1cg04oBgDfHvOmpqsWbmUaSfBDHIdrwKtGnte3Ph_VwQPJYJ6VFtAf5B?auto=format&dpr=1&w=1000"
                                alt=""
                                className="h-full w-full object-cover rounded-full"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-md font-bold text-black">
                        Profile
                      </div>
                      <div className="text-sm text-black/60">
                        Add your image, banner and color theme to complete the
                        look!
                      </div>
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Set your link
                  </h2>
                  <div className="mt-2 text-md text-white/60">
                    Set your donation link. Btw, these links can also be used
                    with{" "}
                    <span className="underline text-white">twitch.gift</span>{" "}
                    and <span className="underline text-white">kick.gift</span>!
                  </div>

                  <div className="mt-4 flex">
                    <Input
                      className="bg-white text-black border-none"
                      placeholder="jake"
                      value={username}
                      onChange={(e) => onUsernameInputChange(e.target.value)}
                      startContent={
                        <div className="flex items-center gap-1.5">
                          <TbLink className="size-3.5" />
                          <span>stream.gift</span>
                          <span>/</span>
                        </div>
                      }
                      endContent={
                        <>
                          {username.length > 0 &&
                            (isCheckingUsername ? (
                              <TbLoader2 className="size-5 animate-spin" />
                            ) : checkedMap[username] ? (
                              <TbCircleCheckFilled className="size-5 text-green-500" />
                            ) : checkedMap[username] === false ? (
                              <TbCircleXFilled className="size-5 text-red-500" />
                            ) : null)}
                        </>
                      }
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Connect your wallet
                  </h2>
                  <div className="mt-2 text-md text-white/60">
                    This is where your SUI tips will be withdrawn to.
                  </div>

                  <div className="mt-6">
                    <ConnectButton />
                    <p>{currentAccount ? address : "Wallet Not Connected"}</p>

                    <div className={cn("relative my-6 opacity-50")}>
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t-[1.5px] border-white" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-indigo-600 text-white px-2 font-medium">
                          Or Enter Manually
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <Input
                          type="text"
                          placeholder="0x72b8c32f30813d230410976c46697db09f416e3396d462a170d290ac60d822ea"
                          className={cn(
                            "w-full px-3 py-2 bg-white text-black border border-gray-300 rounded-md shadow-sm",
                            walletConnected && "opacity-60",
                          )}
                          value={walletConnected ? "" : address}
                          onChange={(e) => setAddress(e.target.value)}
                          disabled={walletConnected}
                          startContent={
                            <img
                              src="/images/3p/sui.png"
                              alt=""
                              className="inline-block size-4 mx-0.5"
                            />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      Set up your profile
                    </h2>
                    <div className="mt-2 text-md text-white/60">
                      Complete the look of your donation page.
                    </div>

                    <div className="mt-6">
                      <div className="mb-4">
                        <div className="text-md">Profile Photo</div>
                        <div className="text-sm text-white/60">
                          This will be displayed on your donation page.
                        </div>

                        <div className="flex items-center gap-2.5 mt-3 ">
                          <UploadButton
                            onClientUploadComplete={(file) => {
                              console.log("File: ", file);
                              setProfileImage(file.url);
                              setProfileImageName(file.name);
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(
                                `Error uploading photo: ${error.message}`,
                              );
                            }}
                          />
                        </div>

                        <div className="mt-1.5 text-xs text-white/60">
                          1:1 Recommended, Max 2MB
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-md">Banner</div>
                        <div className="text-sm text-white/60">
                          This will be displayed at the top of your donation
                          page.
                        </div>

                        <div className="flex items-center gap-2.5 mt-3 ">
                          <UploadButton
                            onClientUploadComplete={(file) => {
                              console.log("File: ", file);
                              setProfileBanner(file.url);
                              setProfileBannerName(file.name);
                            }}
                            onUploadError={(error: Error) => {
                              toast.error(
                                `Error uploading banner: ${error.message}`,
                              );
                            }}
                          />
                        </div>

                        <div className="mt-1.5 text-xs text-white/60">
                          Max 2MB
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-md">Color Theme</div>
                        <div className="text-sm text-white/60">
                          This will be displayed on your donation page.
                        </div>
                        <GradientPicker
                          className="mt-2"
                          background={profileColor}
                          setBackground={setProfileColor}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 text-black">
                    <div
                      className="h-full w-full rounded-lg transition-all duration-500 ease-in-out"
                      style={{ background: profileColor }}
                    >
                      <div className="flex flex-col justify-center items-center h-full min-h-[200px] w-full relative">
                        <div className="bg-white rounded-sm shadow-sm w-2/3 h-20 mt-2 overflow-hidden">
                          <img
                            src={
                              profileBanner || "https://i.imgur.com/iugfnT6.jpg"
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-row items-start w-1/2">
                          <div
                            className="rounded-full p-[1.75px] size-14 -mt-9 -ml-2 transition-all duration-500 ease-in-out"
                            style={{ background: profileColor }}
                          >
                            <img
                              src={
                                profileImage ||
                                "https://static-cdn.jtvnw.net/user-default-pictures-uv/de130ab0-def7-11e9-b668-784f43822e80-profile_image-300x300.png"
                              }
                              alt=""
                              className="h-full w-full object-cover rounded-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="w-full h-full flex-grow flex flex-col justify-center items-center relative">
                  <AnimatePresence mode="wait">
                    {finalDone ? (
                      <motion.div
                        key="done"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <TbCircleCheckFilled className="size-10 text-green-500 rounded-full" />
                        <div className="text-lg mt-1">
                          Nice {streamerDomainName || username}, you&apos;re all
                          set!
                        </div>
                        <Button
                          variant="light"
                          onClick={() => (window.location.href = "/home")}
                          className="mt-3"
                        >
                          Go to Dashboard
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center"
                      >
                        <TbLoader2 className="size-8 animate-spin" />
                        <div className="text-lg mt-4">
                          <WordRotate
                            words={[
                              "Setting up your profile...",
                              "Saying hi to the blockchain...",
                              "Preparing your audience seats...",
                              "Initializing your tipping wallet...",
                              "Connecting you to the streaming universe...",
                            ]}
                            duration={2250}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div
                className={cn(
                  "flex justify-end gap-4 mt-4",
                  step === 5 && "hidden",
                )}
              >
                {canGoBack && (
                  <Button variant="ghost" onClick={prevStep}>
                    Back
                  </Button>
                )}
                <Button
                  variant="light"
                  onClick={nextStep}
                  disabled={canGoNext === false}
                >
                  {step === 4 ? "Complete" : "Next"}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="w-full"></div>
        </div>
      </div>

      <div className="ml-8 hidden lg:flex flex-grow items-end text-white">
        <div className="text-md text-white/70 px-6 py-4">
          &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          suscipit eros at sollicitudin vulputate. Nullam id sapien ac nulla
          volutpat semper sed eget lectus. Nam cursus varius elementum.&quot;
          <div className="mt-3 font-bold">Ohio Rizzler, Streamer</div>
        </div>
      </div>

      <img
        src="/images/logo.svg"
        alt="logo"
        className="absolute -top-16 -right-16 size-96 opacity-20 z-10"
      />
    </div>
  );
}
