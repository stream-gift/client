"use client";

import { useParams } from "next/navigation";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

import { ClientAPIService } from "@/lib/api/client";

const INTERVAL_TIME_SECONDS = 5;
const ANIMATION_TIME_SECONDS = 3;

export default function DonationsEventsPage() {
  const { token } = useParams<{ token: string }>();

  const audioRef = useRef<HTMLAudioElement>(null);
  const startRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<any>(null);

  const [state, setState] = useState<{
    events: any[];
    currentEvent: any | null;
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
    if (state.currentEvent && audioRef.current) {
      audioRef.current.play();
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

    startRef.current?.remove();
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
    <div>
      <div ref={startRef} className="flex flex-col p-2">
        <div className="flex items-center gap-2 text-white">
          <img src="/images/logo.svg" alt="stream.gift" className="size-8" />
          <span className="text-xl">stream.gift</span>
        </div>

        <div className="mt-1 text-lg text-white/90">
          Signed in as {data?.streamer?.username}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <Button onClick={start} className="w-fit">
            Start
          </Button>

          <Button onClick={start} className="w-fit">
            Start [Test Mode]
          </Button>
        </div>

        <div className="mt-2 text-sm text-white/80">
          In test mode, 5 donations will be shown every 10 seconds.
        </div>
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
            className="border-2 border-white p-4 bg-blue-400"
          >
            {state.currentEvent.name || state.currentEvent.transactionSender}{" "}
            donated {state.currentEvent.amountFloat} SOL
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
