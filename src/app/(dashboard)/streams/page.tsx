import React from "react";

import { Chakra_Petch } from "next/font/google";
import { Button } from "@/components/ui/button";
import GridPattern from "@/components/magicui/grid-pattern";
import { cn } from "@/lib/utils";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function StreamsPage() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-2">Streams</h1>
      <p className="text-gray-400">
        Save your streams indefinitely with vodsaver, a tool powered by
        stream.gift.
      </p>

      <div className={chakra.className}>
        <div className="relative mt-4 w-full rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 p-8 flex items-start justify-center flex-col">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold leading-tight">
              Save your live streams and VODs indefinitely
            </h2>
            <p className="text-gray-300 mt-3">
              vodsaver is a free tool powered by stream.gift that allows you to
              save your live streams forever from Twitch, Kick and more.
            </p>

            <a href="https://vodsaver.com/" target="_blank">
              <Button className="mt-4" variant="light">
                Get Started
              </Button>
            </a>
          </div>

          <GridPattern
            width={50}
            height={50}
            x={-1}
            y={-1}
            className={cn(
              "[mask-image:linear-gradient(to_top_left,white,rgba(255,255,255,0.75),rgba(255,255,255,0.5),transparent,transparent,transparent)] "
            )}
          />
        </div>
      </div>
    </div>
  );
}
