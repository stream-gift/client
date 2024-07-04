'use client'

import { useWalletStore } from '@/lib/states';
import './wallet-button.scss';

export default function WalletButton() {
    const wallet = useWalletStore(s => s.wallet);

    function connect_wallet() {
        if (wallet) {
            wallet.connect();
        }
    }

    return (
        <button
            id="wallet-connect-button"
            onClick={connect_wallet}
        >
            #connect-wallet
        </button>
    )
}