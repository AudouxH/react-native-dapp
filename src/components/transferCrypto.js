import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { useWeb3Modal } from '@web3modal/react-native';
import useWeb3WalletConnect from '../hooks/useWeb3';
import isValidAmount from '../functional/isValidAmount';
import verifiedAddress from '../functional/verifiedAddress';

import getChainIdString from '../functional/getChainIdString';

const TransferETH = () => {
    const { transferCrypto } = useWeb3WalletConnect();
    const { provider } = useWeb3Modal();

    const [receiverAddress, setreceiverAddress] = useState("");
    const [Amount, setEthAmount] = useState("");
    const currency = getChainIdString(provider?.rpcProviders?.eip155?.chainId);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Send {currency}</Text>
            <Text style={styles.subtitle}>Enter receiver address</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter a receiver address..."
                onChangeText={setreceiverAddress}
                value={receiverAddress}
            />
            <Text style={styles.subtitle}>Enter {currency} amount</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter an amount"
                keyboardType="numeric"
                onChangeText={(newNumber) => { setEthAmount(newNumber.replace(/[^0-9.]/g, '')) }}
                value={Amount}
            />

            {provider ?
                <TouchableOpacity
                    onPress={() => {
                        (provider && verifiedAddress(receiverAddress) && isValidAmount(Amount)) ? transferCrypto(receiverAddress, Amount) : null
                    }}
                    style={styles.btnContainer}>
                    <Text style={styles.textBtn}>Send</Text>
                </TouchableOpacity>
                : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        textAlign: 'left',
        width: '90%',
    },
    textInput: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        marginTop: 5,
    },
    btnContainer: {
        width: '90%',
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
        backgroundColor: '#2081e2',
    },
    textBtn: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
});

export default TransferETH;