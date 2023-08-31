import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/react-native';
import { utf8ToHex } from '@walletconnect/encoding';
import { ethers } from 'ethers';

export default useWeb3WalletConnect = () => {
    const { isConnected, address, provider } = useWeb3Modal();
    const [transactionStatus, setTransactionStatus] = useState('');

    const getBalance = async () => {
        !isConnected ? () => { return } : null

        const balance = await provider?.request({
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: provider?.rpcProviders?.eip155?.chainId
        });
        return (balance ? ethers?.utils?.formatEther(balance) : 0.0);
    }

    const getChainId = async () => {
        !isConnected ? () => { return } : null
        return (await provider?.request({ method: "eth_chainId" }));
    }

    const signMessage = async (message) => {
        !isConnected ? () => { return } : null
        const transaction = await provider?.request({
            method: "personal_sign",
            params: [
                utf8ToHex(message, true),
                address
            ]
        });
        // console.log("tsx:", transaction);
        transaction ? setTransactionStatus(transaction) : null;
    };

    const transferCrypto = async (receiverAddress, amount) => {
        !isConnected ? () => { return } : null
        const value = ethers.utils.parseEther(amount.toString());

        const transaction = await provider?.request(
            {
                method: "eth_sendTransaction",
                params: [{
                    from: address,
                    to: receiverAddress,
                    gas: "0x5744",
                    gasPrice: "0x5d21dba00",
                    value: value.toHexString(),
                },]
            },
        );
        // console.log("tsx:", transaction);
        transaction ? setTransactionStatus(transaction) : null;
    }

    return {
        getBalance,
        getChainId,
        signMessage,
        transferCrypto
    }
};
