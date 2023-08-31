import React, { useEffect, useState } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';

import { useWeb3Modal } from '@web3modal/react-native';
import { SvgUri } from 'react-native-svg';

import cutAddress from '../functional/cutAddress';

const Profil = () => {
    const { getBalance } = useWeb3WalletConnect();
    const { address, provider } = useWeb3Modal();
    const [userBalance, setUserBalance] = useState(0);

    useEffect(() => {
        const setBalance = async () => {
            const balance = await getBalance();
            setUserBalance(balance);
        }
        provider ? setBalance() : null;
    }, [provider]);

    return (
        <View style={styles.profil}>
            <View style={styles.data}>
                <View style={styles.svgContainer}>
                    {address ?
                        <SvgUri width={50} height={50} uri={`https://avatars.dicebear.com/api/identicon/${address}.svg`} />
                        : <SvgUri width={50} height={50} uri={`https://avatars.dicebear.com/api/identicon/NewUser.svg`} />}
                </View>
                <View style={styles.addressContainer}>
                    {address ?
                        <Text style={styles.address}>{cutAddress(address)}</Text>
                        : <Text style={styles.address}>Not connected</Text>}
                    {userBalance ?
                        <Text style={styles.balance}>balance: {userBalance} ETH</Text>
                        : <Text style={styles.balance}>Profil</Text>}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profil: {
        width: '100%',
        height: '15%',
        borderWidth: 1,
        backgroundColor: '#222',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    data: {
        display: 'flex',
        flexDirection: 'row',
    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    address: {
        color: '#FFF',
        fontSize: 18,
    },
    balance: {
        color: '#FFF',
        fontSize: 14,
    },
    svgContainer: {
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#FFF',
    },
});

export default Profil;