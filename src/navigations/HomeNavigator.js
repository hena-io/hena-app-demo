import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

import WalletAccountNavigator from './WalletAccountNavigator';
import MiningNavigator from './MiningNavigator';
import AICNavigator from './AICNavigator';

export default createMaterialTopTabNavigator({
    Wallet: {
        screen: WalletAccountNavigator,
        title: 'Wallet',
    },
    Mining: {
        screen: MiningNavigator,
        title: 'Mining',
    },
    AIC: {
        screen: AICNavigator,
        title: 'AIC',
    },
});