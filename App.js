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
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

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

class HomeScreen extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <LinearGradient 
          style={{flex: 1}}
          colors={['#4A00E0', '#8E2DE2']}
        >
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
              To get started, edit App.js
            </Text>
            <Icon name={'ios-hammer'} size={64} color={'#FFF'}/>
            <Button title={"WHAT!?"} />
          </View>
        </LinearGradient>
      </View>
    );
  }
}

const HomeNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    title: 'Home',
    navigationOptions: () => ({
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'ios-home'}
          size={26}
          style={{marginBottom: -3}}
          color={tintColor}
        />
      )
    })
  }
});

export default class App extends Component {
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
      <View style={{flex: 1}}>
        <HomeNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
