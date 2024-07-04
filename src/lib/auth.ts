import { ParticleNetwork } from '@particle-network/auth';
import { Ethereum } from '@particle-network/chains';

export const handleLogin = async (preferredAuthType: 'google' | 'twitter' | 'twitch' | 'github' | 'discord' | 'linkedin') => {
    const particle = new ParticleNetwork({
        projectId: "b54fa1c5-dfc4-4ec5-a975-b50e77aa7a22",
        clientKey: "c9nGKTYhlfEArbdw2WMDrn8GucRYgrazbdI0Vzqu",
        appId: "3c55c167-89d8-44d9-b6de-910ff3b920a1",
        chainName: Ethereum.name,
        chainId: Ethereum.id,
        wallet: {
            displayWalletEntry: true,
            uiMode: "dark"
        },
    });

    return (await particle.auth.login({ preferredAuthType }));
}