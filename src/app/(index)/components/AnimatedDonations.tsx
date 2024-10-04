"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";

let donations = [
  {
    name: "John",
    message: "Thank you for the stream!",
    amount: 0.5,
  },
  {
    name: "rick.sol",
    message: "Have a good day!",
    amount: 1,
  },
  {
    name: "4Cnk9EP...m9epump",
    message: "You're the best!",
    amount: 0.1,
  },
  {
    name: "mrbest",
    message: "Have a good day!",
    amount: 0.5,
  },
];

const Notification = ({ name, message, amount }: (typeof donations)[0]) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-background dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="mb-2 text-xl text-center">&quot;{message}&quot;</div>

      <div className="flex items-center justify-center text-base opacity-90">
        <span className="font-bold">{name} </span>
        <span className="ml-1">tipped</span>
        <div className="flex items-center ml-2 gap-1.5">
          <img src="/images/3p/solana.png" alt="solana" className="size-4" />{" "}
          {amount} SOL
        </div>
      </div>
    </figure>
  );
};

export function AnimatedDonations({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col p-6 overflow-hidden rounded-lg border md:shadow-xl",
        className
      )}
    >
      <AnimatedList delay={2000}>
        {donations.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
