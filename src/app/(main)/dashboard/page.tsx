'use client'

import { useEffect, useState } from 'react';
import { useAccountStore, useWalletStore } from '@/lib/states'
import VerifySignAddress from '@/components/VerifySignAddress';
import ConnectButton from '@/components/Connect/Button';
import TwitchButton from '@/components/Header/TwitchButton';
import TwitchLogin from '@/action/twitchLogin';
import TwitchAccountUpdate from '@/action/twitchAccountUpdate';
import toast from 'react-hot-toast';

export default function Dashboard() {

    const user = useAccountStore(s => s.user);
    const wallet = useWalletStore(s => s.wallet);
    const status = useAccountStore(s => s.status);
    const setUser = useAccountStore(s => s.setUser);

    const [loggedIn, setLoggedIn] = useState(false);

    // Form
    const [handle, setHandle] = useState("");

    useEffect(() => {
        if (user) setLoggedIn(true);
    }, [user]);

    // Functions
    function changeHandle(): void {
        if (!user || !handle) return;

        let handle_ = handle;
        if (handle[0] === '@') handle_ = handle.slice(1, handle.length);

        TwitchAccountUpdate({ handle: handle_ })
            .then(() => {
                toast.success("Handle is successfully set");
                setUser({ ...user, handle: handle_ });
            })
            .catch(response => {
                if (response?.message) toast.error(response.message);
            })
    }

    if (status === 'loading') return <></>;

    if (!loggedIn) return (
        <div>
            <h1 className='text-5xl font-medium mb-10'>Dashboard</h1>

            <p className='text-2xl font-light mb-8 w-[80%]'>In order to accept donations, we need to know what platform you are streaming on.</p>
            <TwitchButton />
        </div>
    )

    // TODO: Remove this line
    if (!user) return <></>

    return (
        <div>
            <h1 className={`text-5xl font-medium ${user?.handle ? 'mb-4' : 'mb-20'}`}>Dashboard</h1>
            {user?.handle && (
                <p
                    className="text-md px-3 py-[6px] rounded-[11px] bg-[#212121] w-fit mb-8 cursor-pointer hover:bg-tealbox"
                    onClick={() => {
                        navigator.clipboard.writeText(`stream.gift/${user.handle}`);
                        toast.success("Link copied to clipboard");
                    }}
                >
                    stream.gift/{user.handle}
                </p>
            )}

            <div className='w-[700px] p-4 rounded-2xl border-[1px] border-[rgba(255,255,255,0.20)] max-md:w-full'>
                <p className='text-xl font-light mb-12'>
                    {user?.handle ? (
                        <>Your stream.gift handle has been set! Users can now view your profile on the above link(s).</>
                    ) : (
                        <><span className='font-medium'>Set your stream.gift handle.</span> This should be the same name as your livestream. This is permanent, so you cannot change it once you set it!</>
                    )}
                </p>
                <div className='flex items-center p-2 rounded-md border-[1px] border-[rgba(255,255,255,0.50)] w-[420px] max-md:w-full'>
                    <input
                        value={user?.handle ? ('@' + user.handle) : handle}
                        placeholder={"@" + user.preferred_username}
                        onChange={e => setHandle(e.target.value)}
                        className='flex-1 placeholder:text-[#7A7979] text-xl font-medium'
                        disabled={Boolean(user?.handle)}
                    />
                    {!user?.handle && (
                        <button
                            onClick={changeHandle}
                            className='flex items-center px-3 bg-teal text-[#262626] font-medium rounded-[4px] h-6'
                        >
                            Set
                        </button>
                    )}
                </div>
            </div>

            <div className='w-[700px] p-4 mt-7 rounded-2xl border-[1px] border-[rgba(255,255,255,0.20)] max-md:w-full'>
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