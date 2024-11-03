import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
// import AnimatedListDemo from "@/components/example/animated-list-demo";
import Marquee from "@/components/magicui/marquee";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import {
  TbCoins,
  TbExternalLink,
  TbLink,
  TbMovie,
  TbNotification,
} from "react-icons/tb";
import WordRotate from "@/components/magicui/word-rotate";
import DotPattern from "@/components/ui/dot-pattern";
import { AnimatedDonations } from "./AnimatedDonations";

const donations = [
  {
    amount: "0.5",
    message: "Thank you for the stream!",
    from: "John",
    time: "2 mins ago",
  },
  {
    amount: "1",
    message: "Have a good day!",
    from: "Rick",
    time: "6 mins ago",
  },
  {
    amount: "0.1",
    message: "You're the best!",
    from: "Alicia",
    time: "14 mins ago",
  },
];

const features = [
  {
    Icon: TbCoins,
    name: "Donations",
    description:
      "Receive & send donations to your favorite streamers on Solana.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {donations.map((donation, index) => (
          <figure
            key={index}
            className={cn(
              "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 pb-32",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[0.3px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/images/3p/sui.png" className="size-5" alt="sui" />
                <div className="flex items-center gap-1 font-mono text-xl">
                  <span className="font-medium">{donation.amount}</span>
                  <span className="text-white/60">SUI</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-white/60 hover:text-white transition-all text-sm">
                <div>{donation.time}</div>

                <TbExternalLink />
              </div>
            </div>

            <div className="mt-3 text-sm">
              <div>
                <span className="text-white/60 mr-2 font-medium">Message</span>{" "}
                {donation.message || "[empty]"}
              </div>

              <div className="mt-1">
                <span className="text-white/60 mr-2 font-medium">Name</span>{" "}
                {donation.from || "[empty]"}
              </div>
            </div>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: TbNotification,
    name: "Alerts",
    description: "Customise alerts for donations on your stream.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <AnimatedDonations className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
    ),
  },
  {
    Icon: TbLink,
    name: "Donation Link",
    description: "Get your own custom link to receive donations.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="flex justify-center items-center h-full w-full relative">
        <div
          className="rounded-full px-4 py-2.5 text-3xl flex items-center
          text-white/75 overflow-hidden transition-width duration-300 w-fit shadow-inner shadow-white/40
          bg-gradient-to-br from-primary to-primary/80"
        >
          <TbLink className="mr-2" />
          <WordRotate
            className="text-white"
            words={["stream.gift/", "twitch.gift/", "kick.gift/"]}
          />
          <div className="w-16">
            <WordRotate
              className="text-white"
              words={["ninja", "jake", "xqc", "tfue"]}
            />
          </div>

          <DotPattern
            className={cn(
              "[mask-image:radial-gradient(220px_circle_at_center,transparent,transparent,rgba(124,58,237,0.3))]",
              "-z-10",
            )}
          />
        </div>
      </div>
    ),
  },
  {
    Icon: TbMovie,
    name: "Streams",
    description:
      "Save your VODS indefinitely with vodsaver, a tool powered by stream.gift.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
      >
        {[
          "https://vodsaver.com/_next/image?url=%2Fimages%2Fcs2.jpg&w=384&q=75",
          "https://vodsaver.com/_next/image?url=%2Fimages%2Fow.png&w=384&q=75",
          "https://vodsaver.com/_next/image?url=%2Fimages%2Fgta.jpg&w=384&q=75",
        ].map((src, index) => (
          <figure
            key={index}
            className={cn(
              "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 pb-32",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[0.1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <img
              src={src}
              className="w-full rounded-lg aspect-video"
              alt="twitch"
            />
          </figure>
        ))}
      </Marquee>
    ),
  },
];

export function Bento() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
