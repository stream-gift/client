/**
 * This component handles different types of modals
 */

"use client";

import { useModalStore } from "@/lib/states";
import Modal from ".";

export default function Modals() {
    const options: any = useModalStore(state => state.options);
    const setModal: (type: string, options: any) => void = useModalStore(state => state.setModal);
    const selectedModal: string = useModalStore(state => state.modal);

    return (
        <>
            {/* Custom Modal */}
            {selectedModal === "custom" && <Modal set={setModal}>{options.content}</Modal>}
        </>
    );
}
