"use client";

import { Button } from "@/components/ui/button";
import { TbCopy, TbEyeCancel } from "react-icons/tb";
import { toast } from "sonner";

export function EventsLink({ token }: { token: string }) {
  const copy = () => {
    navigator.clipboard.writeText(
      `https://stream.gift/donations/events/${token}`
    );
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex items-center mt-3 gap-1 text-xl flex-wrap">
      <div>stream.gift</div>
      <div className="text-xl text-white/70">/</div>
      <div>donations</div>
      <div className="text-xl text-white/70">/</div>
      <div>events</div>
      <div className="text-xl text-white/70">/</div>
      <div className="blur-sm hover:blur-none transition-all duration-300 relative">
        {token}
      </div>

      <Button
        size="sm"
        className="ml-2 p-2 h-auto rounded-full bg-primary px-3 py-1"
        onClick={copy}
      >
        <TbCopy className="mr-1" /> Copy
      </Button>
    </div>
  );
}
