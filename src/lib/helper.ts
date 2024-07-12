export function truncateWalletAddress(
    walletAddress: string,
    prefixLength = 8,
    suffixLength = 4,
): string {
    // Check if the wallet address is valid
    if (typeof walletAddress !== "string" || walletAddress.length < prefixLength + suffixLength)
        return walletAddress; // Return the original address if it's invalid or too short

    // Extract the prefix and suffix parts of the address
    const prefix = walletAddress.substring(0, prefixLength);
    const suffix = walletAddress.substring(walletAddress.length - suffixLength);

    // Generate the truncated address with prefix, ellipsis, and suffix
    const truncatedAddress = `${prefix}...${suffix}`;

    return truncatedAddress;
}

export function b64DecodeUnicode(str: string) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(
        atob(str)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join(""),
    );
}
