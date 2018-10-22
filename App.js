/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import './global';
import Web3 from 'web3';
import bip39 from 'react-native-bip39';
import HDKey from 'ethereumjs-wallet-react-native/hdkey';
import Config from 'react-native-config';

const DEFAULT_PATH = "m/44'/60'/0'/0/0";

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://${Config.ETHEREUM_NETWORK}.infura.io/v3/${Config.INFURA_API_KEY}`
  )
);

type Props = {};
export default class App extends Component<Props> {
  componentWillMount() {
    console.log(web3.version);
    web3.eth.getBalance(Config.TEST_WALLET_ADDRESS)
      .then(balance => console.log(balance));

    bip39.generateMnemonic()
      .then(wordlist => console.log(wordlist));

    const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(Config.TEST_WORD_LIST))
      .derivePath(DEFAULT_PATH);

    const address = '0x' + hdkey.getWallet().getAddress().toString('hex');

    console.log(address);

    web3.eth.getBalance(address)
      .then(balance => console.log(balance));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
