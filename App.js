/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import './global';

import HomeNavigator from './src/navigations/HomeNavigator';
import CreateAccountScreen from './src/screens/wallet/CreateAccountScreen';
import WalletHomeScreen from './src/screens/wallet/WalletHomeScreen';

const WalletNavigator = createSwitchNavigator({
  Create: CreateAccountScreen,
  Home: WalletHomeScreen
});

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <WalletNavigator />
      </View>
    );
  }
}