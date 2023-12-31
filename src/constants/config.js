export const providerMetadata = {
    name: 'React native Dapp',
    description: 'RN dApp connection, sign and transfer by Audouxh',
    url: 'https://walletconnect.com/',
    icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const sessionParams = {
    namespaces: {
        eip155: {
            methods: [
                'eth_sendTransaction',
                'eth_signTransaction',
                'eth_sign',
                'personal_sign',
                'eth_signTypedData',
            ],
            chains: ['eip155:1'],
            events: ['chainChanged', 'accountsChanged'],
            rpcMap: {},
        },
    },
};