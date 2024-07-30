"use client"

import { useAccountStore, useModalStore } from '@/lib/states';
import Image from "next/image";
import VerifySignAddress from '../VerifySignAddress';
import Button from '../Button';
import AccountUpdate from '@/action/accountUpdate';
import toast from 'react-hot-toast';

export default function SignatureModal({
    signature,
    address,
}: {
    signature?: string | null;
    address: string;
}) {
    const user = useAccountStore(s => s.user);
    const setUser = useAccountStore(s => s.setUser);
    const setModal = useModalStore(s => s.setModal);

    function removeSignature() {
        if (!user) return;

        AccountUpdate({ signature: null, evm_streamer_address: null })
            .then(() => {
                toast.success("Signature is removed");
                setUser({ ...user, signature: undefined, evm_streamer_address: undefined });
            })
            .catch(response => {
                if (response?.message) toast.error(response.message);
            })
    }

    return (
        <div className="h-full flex flex-col">
            <p className="text-xl mb-3 max-md:text-center">
                To verify your address, click the sign message below. This doesn&#39;t cost any
                GAS/MIST, and is done locally.
            </p>
            <div>
                <label className="text-xl text-gr mb-2 mt-2 block max-md:text-center">
                    Signature{" "}
                    {signature ? (
                        <span className="text-[#05FF00]">(Verified)</span>
                    ) : (
                        <span className="text-[#FFE500]">(Unverified)</span>
                    )}
                </label>
                <div className="rounded-md flex flex-wrap items-center gap-3 max-md:mx-auto">
                    <div className="w-fit max-lg:w-full flex items-center justify-start p-2 text-xl bg-gray-gradient border-[1px] border-[#ABB2BF] rounded-md gap-2">
                        <Image
                            src="/tfuel.svg"
                            alt="TFUEL"
                            height={25}
                            width={25}
                            className="rounded-lg"
                        />
                        <p className="dots w-full">{address}</p>
                    </div>
                    {!signature ? (
                        <></>
                    ) : (
                        <VerifySignAddress address={address} />
                    )}
                </div>
            </div>
            <div className="flex-1 flex items-end justify-end gap-2">
                <Button
                    type="red"
                    click={removeSignature}
                >
                    Remove
                </Button>
                <Button
                    type="gray"
                    click={() => setModal("", null)}
                >
                    Return
                </Button>
            </div>
        </div>
    );
}
