import { useEffect, useState } from "react";

export const useAudio = (url: string) => {
    const [audio, setAudio] = useState<any>(null);
    const [playing, setPlaying] = useState(false);

    const toggleAudio = (): void => {
        setPlaying(!playing);
    };

    useEffect(() => {
        if (!audio) return;

        if (playing) {
            audio.play();
        } else {
            audio.pause();
        } //@ts-ignore
    }, [playing]);

    useEffect(() => {
        if (!audio) return setAudio(new Audio(url));

        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggleAudio];
};
