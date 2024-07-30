import Image from "next/image";
import toast from "react-hot-toast";

export default function KickButton() {
    return (
        <button
            onClick={() => {
                toast.error("Kick login is disabled at the moment.");
            }}
            className="flex items-center gap-3 px-5 h-12 text-[#00FF26] font-medium border-[1px] border-[#00FF26] bg-black rounded-[26px] transition-colors hover:bg-[#00000020] max-md:px-2 max-md:h-8"
        >
            LOGIN WITH KICK
            <Image
                className="max-md:hidden"
                src="/kick.svg"
                alt="Kick"
                height={21}
                width={16}
            />
        </button>
    );
}
