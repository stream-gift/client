"use client";

import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "./index.css";
import Donation from "@/components/Donation";

const placeholders = ["IShowSpeed", "Kai Cenat", "Technoblade", "Pokimane", "XQc"];
const welcomeTexts = [
    <>
        Watch VODs of your favorite
        <br />
        streamers on Twitch
    </>,
    <>
        Replay your favorite streamers&apos;
        <br />
        VODs on Twitch
    </>,
    <>
        Access archived videos of your
        <br />
        favorite streamers on Twitch
    </>,
    <>
        Donate to your favorite streamer
        <br />
        on the THETA network
    </>,
    <>
        Tip your favourite streamer
        <br />
        via cryptocurrency
    </>,
];

export default function Home() {
    const router = useRouter();

    const [search, setSearch] = useState<string>("");
    const [placeholder, setPlaceholder] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [rand, setRand] = useState<number | null>(null);

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

    useEffect(() => {
        setRand(Math.floor(Math.random() * 4));
    }, []);

    return (
        <>
            <div className="min-h-[calc(100dvh-250px)] flex flex-col items-center justify-center max-md:px-2">
                {rand !== null && (
                    <h1 className="font-medium text-5xl text-center max-w-[70%] max-lg:text-3xl max-md:max-w-full max-md:text-center leading-[120%]">
                        {welcomeTexts[rand]}
                    </h1>
                )}

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
            <section className="flex justify-center gap-[100px] w-3/5 mx-auto max-3xl:gap-4 max-3xl:w-4/5 max-lg:w-full max-lg:px-12 max-md:px-4">
                <div className="w-3/5 flex flex-col justify-between max-lg:w-full">
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="font-fira text-3xl text-white font-medium">
                                <span className="text-teal">#</span>
                                about
                            </h2>
                            <div className="flex-1 h-[1px] bg-teal"></div>
                        </div>
                        <p className="font-fira text-lg text-gr mt-6">
                            stream.gift is a crowdfunding tool & streaming platform that allows you
                            to support your favorite streamers via cryptocurrency. Viewers can
                            donate/tip to streams, have their name service be read on chat, or save
                            your own livestreams as a streamer permanently via Theta Edge Cloud.
                        </p>
                    </div>

                    <Link
                        href="/about"
                        className="border-[1px] border-teal w-fit py-2 px-4 max-lg:mt-10"
                    >
                        Read more →
                    </Link>
                </div>
                <div className="w-2/5 h-[430px] max-w-[500px] relative max-lg:hidden">
                    <Image
                        src="/vectors/dots-square.svg"
                        alt="Dots"
                        height={84}
                        width={84}
                        className="absolute left-8 top-8"
                    />
                    <Image
                        src="/vectors/triangles.svg"
                        alt="Dots"
                        height={154}
                        width={144}
                        className="absolute right-0 top-16"
                    />
                    <Image
                        src="/vectors/dots.svg"
                        alt="Dots"
                        height={56}
                        width={104}
                        className="absolute right-4 bottom-28"
                    />
                    <Image
                        src="/vectors/prize.svg"
                        alt="Dots"
                        height={133}
                        width={133}
                        className="absolute left-8 bottom-12"
                    />
                    <div className="absolute w-[70%] h-[1px] bg-teal mx-auto left-0 right-0 bottom-0"></div>

                    <div className="flex justify-center items-center w-full h-full top-0 left-0 p-6">
                        <div className="h-full flex relative px-6 py-3 pt-20 z-[100]">
                            <Donation
                                sender="caseoh"
                                amount="6700"
                                message="Love the stream - keep it up!"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="flex justify-center gap-[100px] w-3/5 mx-auto mt-40 max-3xl:gap-4 max-3xl:w-4/5 max-lg:w-full max-lg:px-12 max-md:px-4">
                <div className="w-3/5 flex flex-col justify-between max-lg:w-full">
                    <div>
                        <div className="flex items-center gap-4">
                            <h2 className="font-fira text-3xl text-white font-medium">
                                <span className="text-teal">#</span>
                                vod-saver
                            </h2>
                            <div className="flex-1 h-[1px] bg-teal"></div>
                        </div>
                        <p className="font-fira text-lg text-gr mt-6">
                            Streamers on Twitch & Kick can now save their past
                            livestreams on stream.gift permanently. Unlike major streaming platforms
                            that only offer temporary storage for 7-30 days, stream.gift leverages{" "}
                            <a href="https://thetaedgecloud.com" target="_blank">
                                <b>Theta Edge Cloud</b>
                            </a>{" "}
                            to encode and securely save your streams indefinitely. With just the
                            link to your broadcast, you can save & ensure that your content is
                            preserved for the long term, solving a problem
                            streaming platforms have struggled with for years.
                        </p>
                    </div>
                    <Link
                        href="/about"
                        className="border-[1px] border-teal w-fit py-2 px-4 max-lg:mt-10"
                    >
                        Read more →
                    </Link>
                </div>
                <div className="w-2/5 h-[430px] max-w-[500px] relative max-lg:hidden">
                    {/* <Image
                        src="/vectors/dots-square.svg"
                        alt="Dots"
                        height={84}
                        width={84}
                        className="absolute left-8 top-8"
                    />
                    <Image
                        src="/vectors/dots.svg"
                        alt="Dots"
                        height={56}
                        width={104}
                        className="absolute right-4 bottom-24"
                    /> */}
                    <div className="absolute w-[70%] h-[1px] bg-teal mx-auto left-0 right-0 bottom-0"></div>

                    <div className="w-full h-full relative">
                        <img
                            src="/modal.png"
                            alt="Vod Modal"
                            className="w-full h-auto -ml-6 -mt-8 mb-4 z-[10000]"
                        />
                        <img
                            src="/vods.png"
                            alt="Vods"
                            className="w-full h-auto ml-6 -mb-12 z-[10000]"
                        />
                    </div>
                </div>
            </section>

            <div className="mt-10">
                <Footer />
            </div>
        </>
    );
}
