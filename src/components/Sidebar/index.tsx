import Image from "next/image";

export default function Sidebar() {
    return (
        <nav className="max-md:hidden">
            <div
                className="
                mx-24 w-fit h-[300px] px-2 pb-2 flex flex-col gap-2 items-center bg-ld
                max-xl:mx-4 sticky top-0 z-50"
            >
                <div className="flex-1 w-[2px] bg-gr"></div>
                <a href="https://github.com/nickmura/stream.gift" target="_blank">
                    <Image src="/github.svg" alt="Github Logo" height={20} width={20} />
                </a>
            </div>
        </nav>
    );
}
