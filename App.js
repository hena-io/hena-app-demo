/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import './global';

import store from './src/store';
import HomeNavigator from './src/navigations/HomeNavigator';
import CreateAccountContainer from './src/containers/CreateAccountContainer';
import WalletContainer from './src/containers/WalletContainer';

const WalletNavigator = createSwitchNavigator({
  Create: CreateAccountContainer,
  Home: WalletContainer
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <WalletNavigator />
        </View>
      </Provider>
    );
  }
}