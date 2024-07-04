import { create } from "zustand";
import { type IWallet, Wallet } from './wallet';

/* Modal States */
// Wallet Modal
interface ModalStore {
    modal: string;
    options: any;
    loading: boolean;
    setModal: (type: string, options: any) => void;
    setLoading: (loading: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
    modal: "", // Modal Key
    options: {},
    loading: false,
    setModal: (type, options = {}) => set(() => ({
        modal: type,
        options: options,
    })),
    setLoading: (loading) => set(() => ({ loading }))
}));

/* Account States */
// Twitch Account
export interface TwitchUserStore {
    suins?: string,
    signature?: string,
    streamer_address?: string,
    preferred_username: string,

    // Preferences -->
    textToSpeech: Boolean,
    notificationsound: Boolean
}

interface TwitchStore {
    user: TwitchUserStore | null;
    setUser: (user: TwitchUserStore) => void;
}

export const useAccountStore = create<TwitchStore>((set) => ({
    user: null,
    setUser: (user) => set(() => ({ user }))
}));

/* Wallet States */
// Wallet Class
interface IWalletStore {
    wallet: IWallet | null;
    setWallet: (w: IWallet) => void;
}

export const useWalletStore = create<IWalletStore>((set) => ({
    wallet: null,
    setWallet: (wallet) => set(() => ({ wallet }))
}))