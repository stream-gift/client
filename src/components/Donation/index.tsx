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
        <main className="flex min-h-screen flex-col items-center w-full ">
            <div className="bg-tealbox border-[1px] border-teal rounded-lg py-4 px-16">
                <h1 className="text-2xl font-light">
                    <span className="font-medium">{sender}</span> sent you{" "}
                    <span className="font-medium">{(+amount).toFixed(1)} TFUEL</span>{" "}
                    {message ? ` - "${message}"` : ""}
                </h1>
            </div>
        </main>
    );
}
