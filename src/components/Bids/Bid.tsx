"use client";

import Image from "next/image";

export default function Bid({
    img,
    name,
}: {
    img: string; // Image address
    name: string;
}) {
    return (
        <div className="flex flex-col items-center gap-1">
            <Image src={img} alt="Bid Image" height={100} width={100} className="rounded-lg" />
            <span className="text-md">{name}</span>
        </div>
    );
}
