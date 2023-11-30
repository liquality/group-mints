export interface ChallengeCreation {
    mintingContractAddress: string;
    chainId: string;
    tokenId?: string,
    category: string;
    platform: string
    expiration: string
}

export interface Challenge {
    id: string;
    name: string,
    mintingContractAddress: string;
    chainId: string;
    tokenId?: string,
    category: string;
    imageUrl: string;
    totalMints: number;
    platform: string
    expiration: string
    expired: boolean
    creatorOfMint: string,
}


export interface Pool {
    id: string;
    groupId: string;
    mintingContractAddress?: string;
    chainId?: number;
    createdAt: Date;
    tokenId: string;
}

