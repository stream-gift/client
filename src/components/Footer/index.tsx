import Image from "next/image";

export default function Footer() {
    return (
        <>
            <footer
                className="
            mx-24 border-t-[1px] border-t-gr p-8 flex items-center justify-between pr-44
            max-lg:pr-8 max-lg:mx-4 max-md:flex-col max-md:gap-10"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-6 max-md:justify-center">
                        <div className="flex items-center gap-2">
                            <Image src="/logo.svg" alt="stream.gift Logo" height={24} width={24} />
                            <h1 className="text-lg font-bold">stream.gift</h1>
                        </div>
                        <p className="text-gr text-lg">contact@stream.gift</p>
                    </div>
                    <p className="text-white text-lg max-w-[70%] max-md:text-center max-md:mx-auto">
                        Support streamers via cryptocurrency. Submitted to the &nbsp;
                        <a
                            className="underline  transition"
                            href="https://sui.io/overflow"
                            target="_blank"
                        >
                            {" "}
                            Sui Overflow Hackathon 2024
                        </a>
                    </p>
                </div>

                <div>
                    <h2 className="font-medium text-2xl mb-1">Media</h2>
                    <div className="flex items-center justify-center gap-6">
                        <a href="https://github.com/nickmura/stream.gift" target="_blank">
                            <Image src="/github.svg" alt="Github Logo" height={32} width={32} />
                        </a>
                    </div>
                </div>
            </footer>

            <div className="my-12">
                <p className="text-center text-gr text-lg">&copy; 2024 - Made by Receive.me Team</p>
            </div>

            {/* Abstract vectors */}
            <Image
                src="/dots-horizontal.svg"
                alt="Dots"
                height={70}
                width={180}
                className="absolute -z-10 left-10 bottom-20 max-lg:hidden"
            />
            <Image
                src="/dots-square.svg"
                alt="Dots"
                height={160}
                width={160}
                className="absolute -z-10 right-16 bottom-[-260px] max-lg:hidden"
            />
            <Image
                src="/x.svg"
                alt="X"
                height={200}
                width={200}
                className="absolute -z-10 right-24 bottom-16 max-lg:hidden"
            />
        </>
    );
}
