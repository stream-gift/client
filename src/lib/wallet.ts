import { ethers } from 'ethers';

export interface IWallet {
    connect(): Promise<void>;
    switchToThetaNetwork(): Promise<void>;
    signMessage(message: string): Promise<string>;
}

export class Wallet {
    private provider: ethers.BrowserProvider | undefined;
    private signer: ethers.JsonRpcSigner | undefined;

    constructor() {
        if ((window as any).ethereum) {
            this.provider = new ethers.BrowserProvider((window as any).ethereum);
        } else {
            throw new Error('MetaMask is not installed');
        }
    }

    async connect() {
        if (!this.provider) {
            throw new Error('Provider not initialized');
        }

        try {
            await this.provider.send('eth_requestAccounts', []);
            this.signer = await this.provider.getSigner();
            await this.switchToThetaNetwork();
        } catch (error) {
            console.error('Failed to connect to MetaMask:', error);
            throw error;
        }
    }

    async switchToThetaNetwork() {
        if (!this.provider) {
            throw new Error('Provider not initialized');
        }

        const thetaChainId = '0x169';
        const thetaNetwork = {
            chainId: thetaChainId,
            chainName: 'THETA Mainnet',
            nativeCurrency: {
                name: 'Theta Fuel',
                symbol: 'TFUEL',
                decimals: 18
            },
            rpcUrls: ['https://eth-rpc-api.thetatoken.org/rpc'],
            blockExplorerUrls: ['https://explorer.thetatoken.org/']
        };

        try {
            await (window as any).ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [thetaNetwork]
            });

            await (window as any).ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: thetaChainId }]
            });
        } catch (error) {
            console.error('Failed to switch to THETA network:', error);
            throw error;
        }
    }

    async signMessage(message: string): Promise<string> {
        if (!this.signer) {
            throw new Error('Signer not initialized');
        }

        try {
            const signature = await this.signer.signMessage(message);
            return signature;
        } catch (error) {
            console.error('Failed to sign message:', error);
            throw error;
        }
    }
}