"use client";

import { useModalStore } from "@/lib/states";
import Image from "next/image";

import "./modal.scss";

export default function Modal({
    set,
    children,
}: {
    set: (type: string, options: any) => void;
    children: React.ReactNode;
}) {
    const loading = useModalStore(state => state.loading);

    const close = (e: React.MouseEvent<HTMLDivElement> | undefined) => {
        if (!(e?.target as HTMLElement)?.closest("#modal .modal-content")) set("", {});
    };

    return (
        <div id="modal" onClick={close}>
            <div className="modal-content">
                {loading ? (
                    <Image src="/loader.svg" alt="Loading" width={100} height={100} />
                ) : (
                    <>{children}</>
                )}
            </div>
        </div>
    );
}
