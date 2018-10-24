/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import bip39 from 'react-native-bip39';
import HDKey from 'ethereumjs-wallet-react-native/hdkey';

import './global';

import store from './src/store';
import WalletAddNavigator from './src/navigations/WalletAddNavigator';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <WalletAddNavigator />
        </View>
      </Provider>
    );
  }
}