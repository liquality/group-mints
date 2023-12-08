//This file touches everything that has to do with the metadata from Reservoir NFT API
import dotenv from "dotenv";
import axios from 'axios';
import { ethers } from "ethers";
dotenv.config();

export async function fetchReservoirData(collectionAddress: string, network: string, tokenId: string) {
    let _tokenId = tokenId ? tokenId : ""
    const url = getServerUrl(_tokenId, network, collectionAddress)

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.RESERVOIR_API_KEY,
            },
        });

        const data = response.data;
        if (tokenId) {
            const prettifiedList = await prettifyERC1155Data(data.tokens[0].token)
            console.log('Data: in erc 1155', data.tokens[0].token);
            return data.tokens[0].token;

        }
        else {
            const prettifiedList = await prettifyERC721Data(data.tokens)
            console.log('Data: in erc 721', data.tokens)
            return prettifiedList;
        }

    } catch (error) {
        console.error('Error:', error);
    }
}

export async function prettifyERC721Data(nftList: any) {
    const { tokenCount, name, image, description, creator, chainId, floorAskPrice } = nftList[0].token.collection

    const decimalPrice = floorAskPrice.amount.decimal
    const convertedWeiPrice = ethers.utils.formatEther(floorAskPrice.amount.raw)
    const prettifiedList = {

        totalMints: tokenCount,
        name,
        chainId: nftList[0].token.chainId,
        kind: nftList[0].token.kind,
        imageUrl: image ? image : nftList[0].token.image,
        description: description ? description : nftList[0].token.description,
        creatorOfMint: creator,
        floorPrice: decimalPrice ? decimalPrice : convertedWeiPrice
    }
    return prettifiedList
}


export async function prettifyERC1155Data(nftList: any) {
    const { name, chainId, tokenId, kind, supply, image, description } = nftList
    const { floorAskPrice } = nftList.collection
    console.log(floorAskPrice, 'floor ask price')

    const decimalPrice = floorAskPrice.amount.decimal
    const convertedWeiPrice = ethers.utils.formatEther(floorAskPrice.amount.raw)
    const prettifiedList = {
        totalMints: supply,
        name,
        chainId,
        tokenId,
        kind,
        imageUrl: image,
        description,
        creatorOfMint: nftList.collection.creator,
        floorPrice: decimalPrice ? decimalPrice : convertedWeiPrice

    }

    return prettifiedList
}

export function getServerUrl(tokenId: string, network: string, collectionAddress: string) {
    if (tokenId) {
        return `https://api-${network}.reservoir.tools/tokens/v6?tokens=${collectionAddress}%3A${tokenId}`
    }
    else {
        return `https://api-${network}.reservoir.tools/tokens/v6?collection=${collectionAddress}`
    }
}




