"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";
import { TbCopy } from "react-icons/tb";
import { toast } from "sonner";

export function DonationLink({ username }: { username: string }) {
  const [platform, setPlatform] = useState("stream.gift");

  const copy = () => {
    navigator.clipboard.writeText(`https://${platform}/${username}`);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex items-center mt-3 gap-1 text-xl flex-wrap">
      <Select
        defaultValue={"stream.gift"}
        onValueChange={(value) => setPlatform(value)}
      >
        <SelectTrigger className="w-fit border-none p-0 h-auto text-xl">
          {platform}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="stream.gift">stream.gift</SelectItem>
          <SelectItem value="twitch.gift">twitch.gift</SelectItem>
          <SelectItem value="kick.gift">kick.gift</SelectItem>
        </SelectContent>
      </Select>

      <div className="text-xl text-white/70">/</div>

      <div>{username}</div>

      <Button
        size="sm"
        className="ml-1 p-2 h-auto rounded-full bg-primary px-3 py-1"
        onClick={copy}
      >
        <TbCopy className="mr-1" /> Copy
      </Button>
    </div>
  );
}
