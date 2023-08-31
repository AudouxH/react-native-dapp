import React from 'react';

import ConnectedScreen from './src/screens/connectedScreen';
import NotConnectedScreen from './src/screens/notConnectedScreen';

import { useWeb3Modal, Web3Modal } from '@web3modal/react-native';
import { providerMetadata, sessionParams } from './src/constants/config';

const App = () => {
  const { address } = useWeb3Modal();

  return (
    <>
      {address ? <ConnectedScreen /> : <NotConnectedScreen />}
      <Web3Modal
        projectId={process.env['WALLET_CONNECT_PROJECT_ID']}
        providerMetadata={providerMetadata}
        sessionParams={sessionParams}
      />
    </>
  );
}

export default App;
