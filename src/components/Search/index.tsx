"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
    const router = useRouter();

    const [content, setContent] = useState<string>("");

    function search() {
        if (content) router.push(`/bid?s=${content}`);
    }

    return (
        <div
            className="
                relative flex items-center justify-center w-[60%]"
        >
            <input
                className="w-full text-3xl p-3"
                placeholder="Search .sui name or portfolio..."
                spellCheck={false}
                value={content}
                onChange={e => setContent(e.target.value)}
                onKeyDown={e => {
                    if (e.key === "Enter") search();
                }}
            />

            <Image
                src="/icons/search.svg"
                alt="Search Icon"
                height={35}
                width={35}
                className="absolute right-3"
            />
        </div>
    );
}
