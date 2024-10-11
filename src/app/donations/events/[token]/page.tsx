"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { ClientAPIService } from "@/lib/api/client";
import { TbLoader2 } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { getOptimalColorFromBackground } from "@/utils/color";
import { getContrastFromBg } from "@/utils/contrast";

const INTERVAL_TIME_SECONDS = 5;
const ANIMATION_TIME_SECONDS = 10;


export default function DonationsEventsPage() {
  const { token } = useParams<{ token: string }>();

  const [started, setStarted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [data, setData] = useState<{
    streamer: Streamer;
    settings: StreamerSettings;
  } | null>(null);

  const [state, setState] = useState<{
    events: Donation[];
    currentEvent: Donation | null;
    eventsDisplayed: string[];
  }>({
    events: [],
    currentEvent: null,
    eventsDisplayed: [],
  });

  const [since, setSince] = useState(new Date().getTime());

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [queueIntervalId, setQueueIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );

  const fetchEvents = async () => {
    let events = await ClientAPIService.Donation.getDonationEvents(
      token,
      since
    );

    setState((state) => {
      events = events.filter(
        (event: any) => !state.eventsDisplayed.includes(event.id)
      );

      return { ...state, events };
    });
  };

  const processEvents = () => {
    setState((state) => {
      // return {
      //   currentEvent: state.events[0],
      //   events: state.events.slice(1),
      //   eventsDisplayed: [...state.eventsDisplayed],
      // };

      if (state.events.length === 0) {
        return { ...state, currentEvent: null };
      }

      const [event] = state.events;
      setSince(new Date(event.updatedAt).getTime());

      return {
        currentEvent: event,
        events: state.events.slice(1),
        eventsDisplayed: [...state.eventsDisplayed, event.id],
      };
    });
  };

  useEffect(() => {
    if (
      state.currentEvent &&
      audioRef.current &&
      data?.settings?.playNotificationSound
    ) {
      audioRef.current.play();

      if (state.currentEvent.message) {
        const utterance = new SpeechSynthesisUtterance(
          state.currentEvent.message
        );

        // Select a voice
        const voices = speechSynthesis.getVoices();
        utterance.voice = voices[0];

        // Speak the text
        speechSynthesis.speak(utterance);
      }
    }
  }, [state.currentEvent]);

  const start = () => {
    if (!intervalId) {
      setIntervalId(setInterval(fetchEvents, INTERVAL_TIME_SECONDS * 1000));
    }

    if (!queueIntervalId) {
      setQueueIntervalId(
        setInterval(processEvents, ANIMATION_TIME_SECONDS * 1000)
      );
    }

    setStarted(true);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await ClientAPIService.Streamer.getStreamerDataByToken(
        token
      );
      setData(data);
    }

    fetchData();

    // if (window["obsstudio"]?.pluginVersion) {
    //   start();
    // }
  }, []);

  return (
    <div
      className={cn(
        "max-w-96",
        started ? "" : "h-fit border border-red-500 border-dashed p-2"
      )}
    >
      {!data && (
        <div className="p-4 max-w-96 flex items-center justify-center">
          <TbLoader2 className="animate-spin size-10" />
        </div>
      )}

      <div
        className={cn("flex flex-col p-2", !data || started ? "hidden" : "")}
      >
        <div className="flex items-center gap-2 text-white">
          <img src="/images/logo.svg" alt="stream.gift" className="size-8" />
          <span className="text-xl">stream.gift</span>
        </div>

        <div className="mt-1 text-lg text-white/90 flex gap-2">
          Signed in as
          <div className="flex items-center gap-2">
            <img
              src={data?.streamer.profileImage}
              alt={data?.streamer.username}
              className="size-6 rounded-full"
            />
            <span>{data?.streamer.username}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button onClick={start} className="w-fit">
            Start
          </Button>

          {/* <Button onClick={start} className="w-fit">
            Start [Test Mode]
          </Button> */}
        </div>

        {/* <div className="mt-2 text-sm text-white/80">
          In test mode, 5 donations will be shown every 10 seconds.
        </div> */}
      </div>
      <audio ref={audioRef} src="/audios/chime.mp3" />

      <AnimatePresence>
        {state.currentEvent && (
          <motion.div
            key={state.currentEvent.id}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="border p-4 max-w-96 rounded-lg shadow-lg"
            style={{
              background:
                data?.settings?.animationParams.background || "#1e1b4b",
              color: data?.settings?.animationParams.color || "#ffffff",
            }}
          >
            {state.currentEvent.message && (
              <div className="mb-2 text-xl text-center">
                &quot;{state.currentEvent.message}&quot;
              </div>
            )}

            <div className="flex items-center justify-center text-base opacity-90">
              <span className="font-bold">
                {state.currentEvent.name ||
                  state.currentEvent.transactionSenderDomainName ||
                  `${state.currentEvent.transactionSender!.slice(
                    0,
                    6
                  )}...${state.currentEvent.transactionSender!.slice(-6)}`}{" "}
              </span>
              <span className="ml-1">tipped</span>
              <div className="flex items-center ml-2 gap-1.5">
                <img
                  src="/images/3p/solana.png"
                  alt="solana"
                  className="size-4"
                />{" "}
                {state.currentEvent.amountFloat} SOL
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
