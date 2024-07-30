import { ethers } from "ethers";

export interface IWallet {
    connect(): Promise<string | void>;
    accounts(): Promise<Array<string> | null>;
    switchToThetaNetwork(): Promise<void>;
    signMessage(message: string | Uint8Array): Promise<string>;
    sendTransaction(to: string, value: string, message?: string): Promise<string>
}

export class Wallet {
    private provider: ethers.BrowserProvider | undefined;
    private signer: ethers.JsonRpcSigner | undefined;
    public wallet: string | undefined = undefined;

    constructor() {
        if ((window as any).ethereum) {
            this.provider = new ethers.BrowserProvider((window as any).ethereum);
        } else {
            throw new Error("MetaMask is not installed");
        }
    }

    async accounts() {
        const accountsResponse = await this.provider!.send("eth_accounts", []);
        if (accountsResponse?.length) return accountsResponse;
        return null
    }

    async connect() {
        if (!this.provider) {
            throw new Error("Provider not initialized");
        }

        try {
            this.wallet = (await this.provider.send("eth_requestAccounts", []))?.[0];
            if (!this.wallet) throw 'No account.';

            this.signer = await this.provider.getSigner();
            await this.switchToThetaNetwork();

            return this.wallet;
        } catch (error) {
            console.error("Failed to connect to MetaMask:", error);
            throw error;
        }
    }

    async switchToThetaNetwork() {
        if (!this.provider) {
            throw new Error("Provider not initialized");
        }

        const thetaChainId = "0x169";
        const thetaNetwork = {
            chainId: thetaChainId,
            chainName: "THETA Mainnet",
            nativeCurrency: {
                name: "Theta Fuel",
                symbol: "TFUEL",
                decimals: 18,
            },
            rpcUrls: ["https://eth-rpc-api.thetatoken.org/rpc"],
            blockExplorerUrls: ["https://explorer.thetatoken.org/"],
        };

        try {
            await (window as any).ethereum.request({
                method: "wallet_addEthereumChain",
                params: [thetaNetwork],
            });

            await (window as any).ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: thetaChainId }],
            });
        } catch (error) {
            console.error("Failed to switch to THETA network:", error);
            throw error;
        }
    }

    async signMessage(message: string | Uint8Array): Promise<string> {
        if (!this.signer) {
            throw new Error("Signer not initialized");
        }

        try {
            const signature = await this.signer.signMessage(message);
            return signature;
        } catch (error) {
            console.error("Failed to sign message:", error);
            throw error;
        }
    }

    async sendTransaction(to: string, value: string, message?: string) {
        try {
            const tx: any = {
                to,
                value: ethers.parseEther(value),
            }
    
            if (message) tx["data"] = ethers.toUtf8Bytes(message);
    
            // Send transaction
            const txResponse = await this.signer?.sendTransaction(tx);
    
            // Wait until transaction is mined
            const receipt = await txResponse?.wait();

            return receipt?.hash ?? "";
        } catch (error) {
            console.error("Failed to send the transaction:", error);
            throw error;
        }
    }
}
