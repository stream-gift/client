"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

import {
  TbBrandTwitch,
  TbHttpConnect,
  TbLink,
  TbPlug,
  TbPlugConnected,
  TbWallet,
} from "react-icons/tb";

export function LoginForm() {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingTwitch, setIsLoadingTwitch] = useState(false);
  const [isLoadingWallet, setIsLoadingWallet] = useState(false);

  const isLoading = useMemo(
    () => isLoadingGoogle || isLoadingTwitch || isLoadingWallet,
    [isLoadingGoogle, isLoadingTwitch, isLoadingWallet]
  );

  const signInWithGoogle = () => {
    setIsLoadingGoogle(true);
    setTimeout(() => {
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google/login`;
    }, 800);
  };

  const signInWithTwitch = () => {
    setIsLoadingTwitch(true);
    setTimeout(() => {
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/twitch/login`;
    }, 800);
  };

  const signInWithWallet = () => {
    setIsLoadingWallet(true);
  };

  return (
    <div className={cn("grid gap-6")}>
      <div className={cn("left flex flex-col space-y-2")}>
        <h1 className="text-xl font-semibold tracking-tight">Login</h1>
        <p className="text-muted-foreground text-sm">
          Login to stream.gift with a provider below
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={signInWithTwitch}
          disabled={isLoading}
          className="py-3 h-auto shadow-white/5 shadow-inner"
        >
          {isLoadingTwitch ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <TbBrandTwitch className="mr-2 h-4 w-4" />
          )}{" "}
          Twitch
        </Button>

        <Button
          variant="outline"
          type="button"
          onClick={signInWithGoogle}
          disabled={isLoading}
          className="py-3 h-auto shadow-white/5 shadow-inner"
        >
          {isLoadingGoogle ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 size-3.5" />
          )}{" "}
          Google
        </Button>

        {/* <Button
          variant="outline"
          type="button"
          onClick={signInWithWallet}
          disabled={isLoading}
        >
          {isLoadingWallet ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <TbLink className="mr-2 h-4 w-4" />
          )}{" "}
          Wallet
        </Button> */}
      </div>
    </div>
  );
}
