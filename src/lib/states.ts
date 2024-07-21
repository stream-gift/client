import { create } from "zustand";
import { type IWallet, Wallet } from "./wallet";

/* Modal States */
// Wallet Modal
interface ModalStore {
    modal: string;
    options: any;
    loading: boolean;
    setModal: (type: string, options: any) => void;
    setLoading: (loading: boolean) => void;
}

export const useModalStore = create<ModalStore>(set => ({
    modal: "create-vod", // Modal Key
    options: {},
    loading: false,
    setModal: (type, options = {}) =>
        set(() => ({
            modal: type,
            options: options,
        })),
    setLoading: loading => set(() => ({ loading })),
}));

/* Account States */
// Twitch Account
export interface TwitchUserStore {
    handle?: string;
    signature?: string;
    streamer_address?: string;
    evm_streamer_address?: string;
    avatar?: string;
    tns?: string;
    preferred_username: string;

    // Preferences -->
    textToSpeech: Boolean;
    notificationsound: Boolean;
}

interface TwitchStore {
    status: 'loading' | 'fetched';
    user: TwitchUserStore | null;
    setUser: (user: TwitchUserStore) => void;
    setStatus: (status: 'loading' | 'fetched') => void;
}

export const useAccountStore = create<TwitchStore>(set => ({
    status: 'loading',
    user: null,
    setUser: user => set(() => ({ user })),
    setStatus: status => set(() => ({ status }))
}));

/* Wallet States */
// Wallet Class
interface IWalletStore {
    wallet: string | null;
    handler: IWallet | null;
    setWallet: (w: string) => void;
    setHandler: (h: IWallet) => void;
}

export const useWalletStore = create<IWalletStore>(set => ({
    wallet: null,
    handler: null,
    setWallet: wallet => set(() => ({ wallet })),
    setHandler: handler => set(() => ({ handler })),
}));
