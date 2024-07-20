"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DropdownButton from "../Dropdown/DropdownButton";
import TwitchButton from "./TwitchButton";
import ConnectButton from "../Connect/Button";

export default function Header() {
    const pathname = usePathname();

    const links: Array<{ href: string; label: string }> = [
        { href: "/", label: "Home" },
        { href: "/dashboard", label: "Dashboard" },
        { href: "/about", label: "About Us" },
    ];

    return (
        <header
            className="
                h-20 w-full flex items-center justify-between mx-auto px-5 bg-[rgba(22,22,29,0.80)] border-b-[1px] border-b-[#6D6D6D50]
                max-md:justify-between max-md:px-3"
        >
            <div className="flex items-center gap-2 max-lg:left-2">
                <Image
                    src="/logo.svg"
                    alt="stream.gift Logo"
                    height={20}
                    width={20}
                    className="min-w-4"
                />
                <h1 className="text-lg font-bold max-sm:hidden">stream.gift</h1>
            </div>
            <div className="flex-1 pl-[10%] flex items-center h-full max-lg:hidden">
                {links.map((el, i) => {
                    const isActive =
                        pathname === el.href || (pathname.startsWith(el.href) && el.href !== "/");

                    return (
                        <Link
                            key={i}
                            className={
                                "font-medium h-full flex items-center px-4 " +
                                (isActive
                                    ? "border-b-4 border-teal text-white pt-1"
                                    : "text-[#71839B]")
                            }
                            href={el.href}
                        >
                            {el.label}
                        </Link>
                    );
                })}
            </div>
            <div className="flex items-center gap-4 h-full max-lg:hidden">
                <TwitchButton />
                <ConnectButton />
            </div>
            <div className="flex-1 items-center justify-end gap-4 hidden max-lg:flex">
                <div className="flex items-center gap-4 justify-end max-sm:justify-evenly max-md:gap-2">
                    <TwitchButton />
                    <ConnectButton />
                </div>

                <DropdownButton
                    type="blank"
                    wrapperClass='h-5'
                    items={links.map((l, i) => {
                        return (
                            <Link key={i} className={"text-lg"} href={l.href}>
                                {l.label}
                            </Link>
                        );
                    })}
                >
                    <Image
                        src="/hamburger.svg"
                        alt="Hamburger icon"
                        height={20}
                        width={20}
                        className="min-w-4 h-[20px]"
                    />
                </DropdownButton>
            </div>
        </header>
    );
}
