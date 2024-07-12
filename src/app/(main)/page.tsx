"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const placeholders = ["IShowSpeed", "Kai Cenat", "Technoblade", "Pokimane", "XQc"];

export default function Home() {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");
    const [placeholder, setPlaceholder] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const currentWord = placeholders[currentWordIndex];
        const typingDelay = 80;
        const deletionDelay = 40;
        const pauseDelay = 2500;

        const timer = setTimeout(
            () => {
                if (!isDeleting && !isPaused && placeholder !== currentWord) {
                    setPlaceholder(currentWord.slice(0, placeholder.length + 1));
                } else if (isDeleting && !isPaused && placeholder !== "") {
                    setPlaceholder(placeholder.slice(0, -1));
                } else if (placeholder === currentWord && !isPaused) {
                    setIsPaused(true);
                    setTimeout(() => {
                        setIsPaused(false);
                        setIsDeleting(true);
                    }, pauseDelay);
                } else if (placeholder === "" && isDeleting) {
                    setIsDeleting(false);
                    setCurrentWordIndex(prevIndex => (prevIndex + 1) % placeholders.length);
                }
            },
            isDeleting ? deletionDelay : typingDelay,
        );

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [placeholder, currentWordIndex, isDeleting, isPaused, placeholders]);

    return (
        <div className="min-h-[calc(100dvh-160px)] flex flex-col items-center justify-center">
            <h1 className="font-light text-5xl text-center max-w-[70%] max-md:max-w-full max-md:text-center">
                Watch VODs of your favorite
                <br />
                streamers on Twitch
            </h1>

            <input
                placeholder={placeholder}
                onChange={e => setSearch(e.target.value)}
                className="w-full max-w-[800px] text-tealtext block px-3 py-2 border-[1px] border-teal bg-tealbox text-3xl mt-7 rounded-md placeholder:opacity-50 placeholder:text-tealtext"
                onKeyDown={e => {
                    if (e.key === "Enter") {
                        router.push(`/${search}`);
                    }
                }}
            />
        </div>
    );
}
