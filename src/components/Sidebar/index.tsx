"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "../Button";
import Logout from "@/action/logout";
import { useAccountStore } from "@/lib/states";

export default function Sidebar() {
    const pathname = usePathname();

    const user = useAccountStore(s => s.user);

    const links = [
        { href: "/dashboard", label: "Home", icon: "home" },
        { href: "/dashboard/tips", label: "Tips/Crowdfunding", icon: "create" },
        { href: "/dashboard/clips", label: "Clips/VODs", icon: "box" },
        { href: "/dashboard/analytics", label: "Analytics", icon: "analysis" },
    ];

    function logout() {
        Logout();
        window.location.href = "/";
    }

    return (
        <nav className="flex flex-col w-[300px] min-h-[calc(100dvh-160px)] p-4 border-r-[1px] border-r-[#D9D9D950] bg-[rgba(30,30,30,0.60)]">
            <div className="flex-1 flex flex-col gap-3">
                {links.map((l, i) => {
                    const isActive = pathname === l.href;
                    return (
                        <Link
                            key={i}
                            href={l.href}
                            className={`flex items-center gap-4 p-3 rounded-md ${isActive ? "bg-[rgba(38,205,213,0.20)]" : ""}`}
                        >
                            <Image
                                src={`/icons/${isActive ? "teal" : "gray"}-${l.icon}.svg`}
                                alt={l.icon}
                                height={20}
                                width={20}
                            />
                            <span
                                className={`text-[16px] font-medium ${isActive ? "text-tealtext" : "text-white"}`}
                            >
                                {l.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
            <div className="flex flex-col gap-3">
                <Link
                    href="/dashboard/settings"
                    className={`flex items-center gap-4 p-3 rounded-md`}
                >
                    <Image src={`/icons/gray-gear.svg`} alt="Settings" height={20} width={20} />
                    <span className={`text-[16px] font-medium text-white`}>Settings</span>
                </Link>
                <Button
                    type="blank"
                    click={logout}
                    className={`flex items-center gap-4 !p-3 rounded-md`}
                >
                    <Image src={`/icons/gray-logout.svg`} alt="Logout" height={20} width={20} />
                    <span className={`text-[16px] font-medium text-white`}>Logout</span>
                </Button>
                {user && (
                    <div className="flex gap-3 items-center p-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={user.avatar}
                            alt="Twitch Avatar"
                            className="rounded-full h-10 w-10 border-2 border-white"
                        />

                        <div className="flex flex-col justify-center">
                            <p>{user.preferred_username}</p>
                            <a
                                href={`https://twitch.tv/${user.preferred_username}`}
                                target="_blank"
                                className="text-[#B40AB8] font-bold"
                            >
                                Twitch Link
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
