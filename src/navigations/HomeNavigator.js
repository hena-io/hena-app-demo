import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import WalletScreen from '../screens/WalletScreen';
import MiningScreen from '../screens/MiningScreen';
import AicScreen from '../screens/AicScreen';

const ICON_SIZE = 26;

export default createBottomTabNavigator({
    Wallet: {
        screen: WalletScreen,
        title: 'Wallet',
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name='ios-wallet' size={ICON_SIZE} color={tintColor} />
        }
    },
    Mining: {
        screen: MiningScreen,
        title: 'Mining',
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name='ios-hammer' size={ICON_SIZE} color={tintColor} />
        }
    },
    AIC: {
        screen: AicScreen,
        title: 'AIC',
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Icon name='ios-pie' size={ICON_SIZE} color={tintColor} />
        }
    },
});