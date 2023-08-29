import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/react-native';
// npm i --save-dev @types/web3modal__react-native install this to find declaration of module @web3Modal
import { utf8ToHex } from '@walletconnect/encoding';
import { ethers } from 'ethers';
import { contracts } from '@vaulth/contracts';
import certificateAbi from '@vaulth/contracts/wrapper/contracts/abi/VaulthCertification.json';
import stampAbi from '@vaulth/contracts/wrapper/contracts/abi/VaulthStampRegistry.json';

export default useWeb3WalletConnect = () => {
    const { isConnected, address, provider } = useWeb3Modal();
    const [transactionStatus, setTransactionStatus] = useState('');
    const certificateContractAddress = contracts.chain[5]?.certificate;
    const stampContractAddress = contracts.chain[5]?.stamp;

    const Vaulthprovider = new ethers.providers.InfuraProvider(
        5,
        "f931d3dd83d34d69946489d9fe472882"
    );
    const Certificate = new ethers.Contract(certificateContractAddress, certificateAbi, Vaulthprovider);
    const Stamp = new ethers.Contract(stampContractAddress, stampAbi, Vaulthprovider);

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
        await provider?.request({
            method: "personal_sign",
            params: [
                utf8ToHex(message, true),
                address
            ]
        });
    };

    const transferCertificate = async (receiverAddress, tokenId) => {
        !isConnected && Certificate?.interface ? () => { return } : null
        const value = "0x0"; // No value for non-ETH transactions

        const transaction  = await provider?.request(
            {
                method: "eth_sendTransaction",
                params: [{
                    from: address,
                    to: receiverAddress,
                    gas: "0x5744",
                    gasPrice: "0x5d21dba00",
                    value: value,
                    data: Certificate.interface.encodeFunctionData('transferFrom', [
                        address, // From address (sender)
                        receiverAddress, // To address (receiver)
                        tokenId, // Token ID
                    ])
                },]
            },
        );
        console.log("tsx:", transaction);
        transaction ? setTransactionStatus(transaction) : null;
    }

    const transferStamp = async (receiverAddress, tokenId) => {
        !isConnected && Stamp?.interface ? () => { return } : null
        const value = "0x0"; // No value for non-ETH transactions

        const transaction = await provider?.request(
            {
                method: "eth_sendTransaction",
                params: [{
                    from: address,
                    to: receiverAddress,
                    gas: "0x5744",
                    gasPrice: "0x5d21dba00",
                    value: value,
                    data: Stamp.interface.encodeFunctionData('transferFrom', [
                        address, // From address (sender)
                        receiverAddress, // To address (receiver)
                        tokenId, // Token ID
                    ])
                },]
            },
        );
        console.log("tsx:", transaction);
        transaction ? setTransactionStatus(transaction) : null;

    }

    return {
        getBalance,
        getChainId,
        signMessage,
        transferCertificate,
        transferStamp,
    }
};
