/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';

import './global';

import store from './src/store';
import MainNavigator from './src/navigations/MainNavigator';
import WalletTokenScreen from './src/screens/WalletTokenScreen';
import TransactionListContainer from './src/containers/WalletTransactionListContainer';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <TransactionListContainer />
        </View>
      </Provider>
    );
  }
}