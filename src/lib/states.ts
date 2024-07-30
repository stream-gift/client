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
    modal: "", // Modal Key
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
export interface IUser {
    handle?: string;
    signature?: string | null;
    streamer_address?: string;
    evm_streamer_address?: string | null;
    avatar?: string;
    tns?: string;
    preferred_username: string;
    logged_via: "theta" | "twitch" | "kick",

    // Preferences -->
    textToSpeech: boolean;
    notificationsound: boolean;
}

interface UserStore {
    status: 'loading' | 'fetched';
    user: IUser | null;
    setUser: (user: IUser) => void;
    setStatus: (status: 'loading' | 'fetched') => void;
}

export const useAccountStore = create<UserStore>(set => ({
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
