import WalletButton from "./WalletButton";
import TwitchButton from "./TwitchButton";
import Image from "next/image";
import Link from "next/link";
import DropdownButton from "../Dropdown/DropdownButton";

export default function Header() {
    const links: JSX.Element[] = [
        <Link key={1} className="text-lg" href="/">
            <span className="text-blue">#</span>home
        </Link>,
        <Link key={3} className="text-lg" href="/about">
            <span className="text-blue">#</span>about
        </Link>,
        /* <Link key={2} className="text-lg" href="/"><span className="text-blue">#</span>dashboard</Link>, */
        /* <Link key={4} className="text-lg" href="/donate"><span className="text-blue">#</span>donate</Link>, */
    ];

    return (
        <header
            className="
                fixed flex items-center justify-between w-[calc(100%-24rem)] mx-auto px-3 pt-8 pb-2 bg-ld
                max-lg:pt-2 max-xl:w-[calc(100%-4rem)] max-md:w-full max-md:justify-between"
        >
            <div className="flex items-center gap-2 max-lg:absolute max-lg:left-2 max-lg:top-2">
                <Image
                    src="/logo.svg"
                    alt="stream.gift Logo"
                    height={20}
                    width={20}
                />
                <h1 className="text-lg font-bold">stream.gift</h1>
            </div>
            <div className="flex items-end gap-4 max-lg:hidden">
                {links.map((el, i) => el)}

                <TwitchButton />
                <WalletButton />
            </div>
            <div className="flex-1 flex-col items-end hidden max-lg:flex">
                <DropdownButton type="blank" items={links}>
                    <Image
                        src="/hamburger.svg"
                        alt="Hamburger icon"
                        height={20}
                        width={20}
                    />
                </DropdownButton>
                <div className="w-full flex items-center gap-4 justify-end max-sm:justify-evenly max-sm:pt-3">
                    <TwitchButton />
                    <WalletButton />
                </div>
            </div>
        </header>
    );
}
