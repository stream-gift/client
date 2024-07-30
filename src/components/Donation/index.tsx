import "./Donation.scss";

export default function Donation({
    sender,
    amount,
    message,
}: {
    sender: string;
    amount: string;
    message: string;
}) {
    return (
        <main className="donation flex min-h-screen flex-col items-center w-full animag">
            <div className="bg-tealbox border-[1px] border-teal rounded-lg py-4 px-6 text-center">
                <div className="flex text-center">
                    <div className="text-2xl">
                        <span className="font-semibold text-teal">{sender}</span>{" "}
                        <span className="text-light">sent you</span>{" "}
                        <span className="font-semibold text-teal">
                            {(+amount).toFixed(1)} TFUEL
                        </span>{" "}
                    </div>
                </div>

                <h1 className="text-xl font-light mt-2">{message ? `"${message}"` : ""}</h1>
            </div>
        </main>
    );
}
