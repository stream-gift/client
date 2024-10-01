"use client";

import { GradientPicker } from "@/components/gradient-picker";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ClientAPIService } from "@/lib/api/client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { TbPlayerPlay } from "react-icons/tb";
import { toast } from "sonner";

export const AlertSettings = ({
  settings: initialSettings,
}: {
  settings: StreamerSettings;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [serverSettings, setServerSettings] = useState(initialSettings);
  const [settings, setSettings] = useState(serverSettings);

  const [playKey, setPlayKey] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const canSave = useMemo(() => {
    return JSON.stringify(settings) !== JSON.stringify(serverSettings);
  }, [settings, serverSettings]);

  const play = () => {
    setPlayKey((prev) => prev + 1);

    if (!settings.playNotificationSound) {
      return;
    }

    audioRef.current!.currentTime = 0;
    audioRef.current!.play();

    const utterance = new SpeechSynthesisUtterance("Love the stream!");

    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];

    speechSynthesis.speak(utterance);
  };

  const save = async () => {
    setIsLoading(true);

    const savedSettings = await ClientAPIService.Streamer.setSettings(settings);

    setServerSettings(savedSettings);
    setSettings(savedSettings);

    setIsLoading(false);
    toast.success("Settings saved");
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1 flex flex-col h-fit">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium  text-white/60">Alert Settings</h3>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-base">Play Sound</h3>
          <Switch
            checked={settings.playNotificationSound}
            onCheckedChange={(checked) => {
              setSettings({ ...settings, playNotificationSound: checked });

              // if (checked) {
              //   audioRef.current!.play();
              // } else {
              //   audioRef.current!.pause();
              //   audioRef.current!.currentTime = 0;
              // }
            }}
          />

          <audio src="/audios/chime.mp3" ref={audioRef} />
        </div>

        <div className="mt-0">
          <div className="flex items-center justify-between mt-4">
            <h3 className="text-base">Background</h3>
            <GradientPicker
              background={settings.animationParams.background || "#1e1b4b"}
              setBackground={(background) => {
                setSettings({
                  ...settings,
                  animationParams: { ...settings.animationParams, background },
                });
              }}
              className="w-28"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <h3 className="text-base">Color</h3>
            <GradientPicker
              background={settings.animationParams.color || "#ffffff"}
              setBackground={(color) => {
                setSettings({
                  ...settings,
                  animationParams: { ...settings.animationParams, color },
                });
              }}
              className="w-28"
              solidOnly
            />
          </div>
        </div>

        <Button
          className="mt-4 w-full"
          size="lg"
          disabled={!canSave}
          onClick={save}
        >
          Save
        </Button>
      </div>
      <div className="border border-white/10 bg-zinc-900 p-5 rounded-lg col-span-1 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium  text-white/60">Alert Preview</h3>
          <Button size="sm" onClick={play}>
            <TbPlayerPlay className="mr-1" />
            Play
          </Button>
        </div>

        <div className="mt-4 h-72 w-full bg-zinc-800 rounded-lg flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            <motion.div
              layoutId="alert"
              key={playKey}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
              className="border p-4 max-w-72 lg:max-w-96 w-full rounded-lg shadow-lg"
              style={{
                background: settings.animationParams.background || "#1e1b4b",
                color: settings.animationParams.color || "#ffffff",
              }}
            >
              <div className="mb-2 text-xl text-center">
                &quot;Love the stream!&quot;
              </div>

              <div className="flex items-center justify-center text-base opacity-90">
                <span className="font-bold">{"YourViewer"} </span>
                <span className="ml-1">tipped</span>
                <div className="flex items-center ml-2 gap-1.5">
                  <img
                    src="/images/3p/solana.png"
                    alt="solana"
                    className="size-4"
                  />{" "}
                  0.5 SOL
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
