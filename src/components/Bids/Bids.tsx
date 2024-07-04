import Image from "next/image";
import Button from "../Button";
import Bid from "./Bid";
import toast from "react-hot-toast";

export default function Bids({ search }: { search: string }) {
    return (
        <div
            id="bids"
            className="
                rounded-md border-white border-[1px] bg-[#0A0A0A]
                w-[75%] mt-12"
        >
            {/* Top */}
            <div
                className="
                    px-3 py-3 bg-black
                    flex justify-between items-center
                    rounded-tl-md rounded-tr-md"
            >
                <div className="flex items-center justify-start gap-2">
                    <p className="text-xl">{search}</p>
                </div>
                <Button
                    type="blank"
                    click={() => {
                        try {
                            // Copy the address to clipboard
                            navigator.clipboard.writeText(search);
                            toast.success("Address is copied to the clipboard");
                        } catch (e) {
                            console.error(e);
                            toast.error("An error occured");
                        }
                    }}
                >
                    <Image src="/icons/copy.svg" alt="Copy Button" height={18} width={18} />
                </Button>
            </div>

            {/* List */}
            <div className="flex items-start justify-start p-3">
                {/* Bid Placeholder */}
                <Bid img={"/dummy/pfp-1.png"} name={"nicky.sui"} />
            </div>
        </div>
    );
}
