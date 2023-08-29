import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import { useWeb3Modal } from '@web3modal/react-native';

const ConnectedScreen = () => {
  const { address, provider } = useWeb3Modal();

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>you are now connect !</Text>
            {address ? <Text style={styles.subtitle}>With the address: {address}</Text> : null}
            {provider ?
                <TouchableOpacity onPress={async () => personalSign()}>
                    <Text>Sign a message</Text>
                </TouchableOpacity>
                : null}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        textAlign: 'center',
        width: '90%',
    }
});

export default ConnectedScreen;