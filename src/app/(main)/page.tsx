"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";

import Logout from "@/action/logout";
import RecentDonations from "@/action/recentDonations";
import TwitchAccountUpdate from "@/action/twitchAccountUpdate";
import Checkbox from "@/components/Checkbox";
import VerifySignAddress from "@/components/VerifySignAddress";
import { b64DecodeUnicode, truncateWalletAddress } from "@/lib/helper";
import { useAccountStore, useWalletStore } from "@/lib/states";
import { Wallet } from "@/lib/wallet";

export default function Dashboard() {
    const router = useRouter();

    const setWallet = useWalletStore(state => state.setWallet);
    const setUser = useAccountStore(state => state.setUser);
    const user = useAccountStore(state => state.user);
    const currentAccount = useCurrentAccount();

    const [search, setSearch] = useState<string>("");
    const [recentDonations, setRecentDonations] = useState([]);
    const [submitting, setSubmitting] = useState<boolean>(false);

    function settingChange() {
        if (!user) return;

        setSubmitting(true);

        TwitchAccountUpdate({ ...user })
            .then((res: any) => {
                if (res.status !== false) {
                    setSubmitting(false);
                    toast.success("Handle is successfully changed");
                }
            })
            .catch(err => {
                if (err?.error_message) toast.error(err.error_message);
                setSubmitting(false);
            });
    }

    const [eventURL, setEventURL] = useState<string>();
    useEffect(() => {
        if (user) setEventURL(`https://stream.gift/${user?.preferred_username}/donationEvents`);
        else {
            RecentDonations().then(res => {
                if (res?.status !== false) {
                    setRecentDonations(res);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setWallet(new Wallet());
        }
    }, [typeof window]);

    return (
        <div className="min-h-screen pt-16">
            {user ? (
                <>
                    <div className="w-full flex items-center justify-between mb-6">
                        <h1 className="font-bold text-5xl max-w-[70%] max-md:max-w-full max-md:text-center max-md:text-2xl">
                            {user.preferred_username}&#39;s dashboard
                        </h1>
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded-md text-lg font-bold"
                            onClick={() => {
                                Logout();
                                window.location.reload();
                            }}
                        >
                            Logout
                        </button>
                    </div>

                    <a
                        href="https://www.youtube.com/watch?v=IB0YGOKx8mo"
                        target="_blank"
                        className="text-gr font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center max-md:w-full underline"
                    >
                        Stream Connection Instructions
                    </a>

                    {user.signature ? (
                        <>
                            <p className="text-gr font-medium mt-2 mb-5 text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                                Need to change your address? You can link another wallet and sign &
                                verify a message with another address. Click &quot;Stream Connection
                                Instructions&quot; for help.
                            </p>

                            <p className="text-gr font-bold mt-2 mb-5 text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                                Donation event listener:{" "}
                                <p className="dots max-md:w-[90vw]">{eventURL}</p>
                            </p>
                        </>
                    ) : (
                        <>
                            <p className="text-gr font-bold mt-2 mb-5 text-lg max-w-[70%] max-md:max-w-full max-md:text-center">
                                In order to receive donations, you must sign and verify your
                                address. Click &quot;Sign and verify address&quot; to continue.
                            </p>
                        </>
                    )}

                    {/* Form */}
                    <label
                        htmlFor="handle-input"
                        className="text-md text-gr block max-md:text-center"
                    >
                        SUI Identifier
                        {user?.signature ? (
                            <>
                                <span className="text-green-500"> (Verified)</span>
                            </>
                        ) : (
                            <>
                                <span className="text-yellow-500"> (Unverified)</span>
                            </>
                        )}
                    </label>

                    <div
                        className="
          max-w-[768px] mb-7 h-12 border-[1px] border-gr rounded-md py-2 flex items-center
          max-md:mx-auto"
                    >
                        {currentAccount && user ? (
                            <VerifySignAddress
                                streamer={user.preferred_username}
                                address={currentAccount.address}
                                _signature={user?.signature || ""}
                            />
                        ) : (
                            <button></button>
                        )}
                    </div>

                    <label className="text-md text-gr block max-md:text-center">Settings</label>
                    <div
                        className="
          max-w-[768px] mb-7 border-[1px] border-gr rounded-md py-3 px-4 flex flex-col gap-2
          max-md:mx-auto max-md"
                    >
                        <div className="flex items-center gap-2">
                            <Checkbox
                                checked={user.notificationsound}
                                onChange={checked => {
                                    setUser({
                                        ...user,
                                        notificationsound: checked,
                                    });
                                }}
                            />
                            <label className="text-gr font-bold text-xl">
                                Play a notification sound when you get a donation
                            </label>
                        </div>
                    </div>

                    <button
                        disabled={submitting}
                        onClick={settingChange}
                        className="
            bg-blue rounded-md font-bold h-full text-md px-4 py-[6px] flex items-center
            disabled:bg-transparent disabled:border-[1px] disabled:border-blue
            max-md:w-full max-md:max-w-[768px] max-md:mx-auto max-md:justify-center"
                    >
                        {submitting ? "Submitting" : "Submit"}
                    </button>
                </>
            ) : (
                <>
                    <h1 className="font-bold text-5xl max-w-[70%] mb-6 max-md:max-w-full max-md:text-center">
                        Receive donations in SUI for streaming
                    </h1>
                    <p className="text-gr font-bold mb-7 text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
                        Sign in with Twitch and connect your wallet
                    </p>

                    <input
                        placeholder="Search for streamer"
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") router.push(`/${search}`);
                        }}
                        className="
              w-full max-w-[800px] block p-2
              border-[1px] border-gr font-bold text-xl mt-16 rounded-md
              placeholder:text-gr"
                    />

                    {recentDonations?.length ? (
                        <p className="mt-24 text-gr font-bold text-2xl max-w-[70%] max-md:max-w-full max-md:text-center">
                            Recent Donations
                        </p>
                    ) : (
                        <></>
                    )}

                    <div className="mt-12 mb-2 max-md:overflow-x-auto max-md:mx-auto max-md:w-[320px] ">
                        {recentDonations?.length ? (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>From</th>
                                            <th>Message</th>
                                            <th>Donation</th>
                                            <th>Receiver</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentDonations.map((d: any, i: number) => {
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        {d.sender_suins ??
                                                            truncateWalletAddress(d.sender)}
                                                    </td>
                                                    <td>
                                                        {d.message !== "null"
                                                            ? b64DecodeUnicode(d.message)
                                                            : "-"}
                                                    </td>
                                                    <td>{parseFloat(d.amount)?.toFixed(3)} SUI</td>
                                                    <td>{truncateWalletAddress(d.recipient)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
