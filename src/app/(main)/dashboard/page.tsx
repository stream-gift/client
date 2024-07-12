'use client'

import { useEffect, useState } from 'react';
import { useAccountStore, useWalletStore } from '@/lib/states'
import VerifySignAddress from '@/components/VerifySignAddress';
import ConnectButton from '@/components/Connect/Button';

export default function Dashboard() {

    const user = useAccountStore(s => s.user);
    const wallet = useWalletStore(s => s.wallet);
    const status = useAccountStore(s => s.status);

    const [loggedIn, setLoggedIn] = useState(true);

    // Form
    const [handle, setHandle] = useState("");

    useEffect(() => {
        if (status === 'fetched' && user === null) setLoggedIn(false);
    }, [user]);

    // Functions
    function changeHandle(): void {

    }

    function signMessage(): void {

    }

    // TODO: Remove comment lines after backend updates
    // if (status === 'loading') return <></>;

    /*
    if (!loggedIn) return (
        <div>
            <h1 className='text-5xl font-medium'>Dashboard</h1>

            <p>Please login with your Twitch account</p>
            <TwitchButton />
        </div>
    )
    */

    // TODO: Remove this line
    if (!user) return <></>

    return (
        <div>
            <h1 className='text-5xl font-medium mb-20'>Dashboard</h1>

            <div className='w-[700px] p-4 rounded-2xl border-[1px] border-[rgba(255,255,255,0.20)]'>
                <p className='text-xl font-light mb-12'>
                    <span className='font-medium'>Set your stream.gift handle.</span> This should be the same name as your livestream. This is permanent, so you cannot change it once you set it!
                </p>
                <div className='flex items-center p-2 rounded-md border-[1px] border-[rgba(255,255,255,0.50)] w-[420px]'>
                    <input
                        placeholder={"@" + user.preferred_username}
                        onChange={e => setHandle(e.target.value)}
                        className='flex-1 placeholder:text-[#7A7979] text-xl font-medium'
                    />
                    <button
                        onClick={changeHandle}
                        className='flex items-center px-3 bg-teal text-[#262626] font-medium rounded-[4px] h-6'
                    >
                        Set
                    </button>
                </div>
            </div>

            <div className='w-[700px] p-4 mt-7 rounded-2xl border-[1px] border-[rgba(255,255,255,0.20)]'>
                <p className='text-xl font-light mb-12'>
                    {wallet ? (
                        "Sign a message with your connected address to verify your address. This will be the destination address, and login auth for stream.gift account."
                    ) : (
                        "Connect your wallet to create a destination address. Once connected, you can sign a message to verify your address."
                    )}
                </p>

                {wallet ? (
                    <VerifySignAddress address={wallet} />
                ) : (
                    <ConnectButton />
                )}
            </div>
        </div>
    )
}