import Image from "next/image";
import { useAccountStore, useModalStore } from "@/lib/states";
import { useState } from "react";
import CreateNewVod from "@/action/createNewVod";

export default function VodModal({
    set,
    children,
}: {
    set: (type: string, options: any) => void;
    children?: React.ReactNode;
}) {
    const user = useAccountStore(state => state.user);

    const loading = useModalStore(state => state.loading);
    const options = useModalStore(state => state.options);

    const callback = options.callback;

    const close = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
        if (!(e?.target as HTMLElement)?.closest("#modal .modal-content")) set("", {});
    };

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const [error, setError] = useState("");

    const newVod = async () => {
        setError("");

        if (!user) {
            setError("Please login to create a new VOD");
            return;
        }

        // Verify name and url
        if (name.trim() === "" || url.trim() === "") {
            setError("Please enter valid VOD name and URL");
            return;
        }

        // Verify if the URL is valid
        if (
            !/(([\w]+:)?\/\/)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(\/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?/.test(
                url,
            )
        ) {
            setError("Please enter a valid URL");
            return;
        }
        try {
            const hash = await CreateNewVod(url, name, `twitch:${user.preferred_username}`);
        } catch (error) {
            console.error(error);
            setError("Failed to create VOD");
            return;
        }

        callback();
        set("", {});
    };

    return (
        <div id="modal" onClick={close}>
            <div className="modal-content">
                {loading ? (
                    <Image src="/loader.svg" alt="Loading" width={100} height={100} />
                ) : (
                    <>
                        <h2 className="mb-0! text-2xl font-bold">Create new VOD</h2>
                        <p className="text-gray-500 text-sm mt-0">
                            Upload a new VOD and we will save it for you indefinitely
                        </p>

                        <div className="mt-6 flex flex-col">
                            <label className="font-bold mb-2">VOD Name</label>

                            <input
                                className="p-3 border border-gray-800 shadow-md rounded-md"
                                type="text"
                                placeholder="Fortnite Stream"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div className="mt-3 flex flex-col">
                            <label className="font-bold mb-2">Video URL</label>

                            <input
                                className="p-3 border border-gray-800 shadow-md rounded-md"
                                type="text"
                                placeholder="https://www.twitch.tv/xxx"
                                value={url}
                                onChange={e => setUrl(e.target.value)}
                            />
                        </div>

                        {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

                        <button
                            className="mt-6 p-2.5 bg-teal w-full rounded-md text-black"
                            onClick={newVod}
                        >
                            Create
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
