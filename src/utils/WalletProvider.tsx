
import React, { createContext, useContext, useState, PropsWithChildren, useRef } from "React";
import { SmartWallet, SmartWalletConfig, MetaMaskWallet, EmbeddedWallet } from "@thirdweb-dev/wallets";

interface WalletState {
    connected: boolean;
    smartContractWallet?: SmartWallet;
    connectedWallet?: MetaMaskWallet | EmbeddedWallet;
    setConnectedWallet(wallet: any): void;
    setSmartContractWallet(wallet: any): void;
    setConnected(connected: boolean): void;
}

const defaultWalletState : WalletState = {
    connected: false,
    smartContractWallet: undefined,
    connectedWallet: undefined,
    setConnected: () => {},
    setConnectedWallet: () => {},
    setSmartContractWallet: () => {}
};

const WalletContext = createContext(defaultWalletState);

export const useWalletContext = () => useContext(WalletContext);
export const useSmartContractWallet = () => useContext(WalletContext).setSmartContractWallet;
export const useConnectedWallet = () => useContext(WalletContext).connectedWallet;

export const WalletProvider : React.FC<PropsWithChildren<unknown>> = ({children}) => {
    const [connected, setConnected] = useState<boolean>(false)
    const connectedWalletRef = useRef<MetaMaskWallet | EmbeddedWallet>()
    const smartContractWalletRef = useRef<SmartWallet>()
    const setSmartContractWallet = (wallet: SmartWallet) => {
        smartContractWalletRef.current = wallet
    }
    const setConnectedWallet = (wallet: MetaMaskWallet | EmbeddedWallet) => {
        connectedWalletRef.current = wallet
        setConnected(true)
    }

    return <WalletContext.Provider value={{
        connected, 
        setConnected, 
        connectedWallet: connectedWalletRef.current, 
        setConnectedWallet, 
        smartContractWallet: smartContractWalletRef.current, 
        setSmartContractWallet
    }}>
        {children}
    </WalletContext.Provider>
};