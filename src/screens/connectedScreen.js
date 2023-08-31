import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native';

import Profil from '../components/profil';
import SignMessage from '../components/signMessage';
import TransferETH from '../components/transferCrypto';

const ConnectedScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Profil />
            <ScrollView style={styles.scrollview}>
                <SignMessage />
                <TransferETH />
            </ScrollView>
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
    scrollview: {
        width: '100%',
        height: '90%'
    }
});

export default ConnectedScreen;