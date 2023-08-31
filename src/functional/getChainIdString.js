const getChainIdString = (chainId) => {
    return chainId === 1 ? "Ethereum" :
    chainId === 3 ? "Rospen" :
        chainId === 4 ? "Rinkeby" :
            chainId === 5 ? "Goerli" : "Unknow"
}

export default getChainIdString;
