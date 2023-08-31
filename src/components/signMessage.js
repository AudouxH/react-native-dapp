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

const SignMessage = () => {
    const { signMessage } = useWeb3WalletConnect();
    const { provider } = useWeb3Modal();
    const [message, setMessage] = useState("");
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign a message</Text>
            <Text style={styles.subtitle}>Enter a message</Text>
            <TextInput
                placeholder="Write the message you want to sign..."
                onChangeText={setMessage}
                value={message}
                style={styles.textInput}
            />
            <TouchableOpacity
                onPress={async () => provider ? signMessage(message) : null}
                style={styles.btnContainer}>
                <Text style={styles.textBtn}>Sign</Text>
            </TouchableOpacity>
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
        borderBottomWidth: 1,
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: '#000',
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
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        textAlign: 'left',
        width: '90%',
    }
});

export default SignMessage;