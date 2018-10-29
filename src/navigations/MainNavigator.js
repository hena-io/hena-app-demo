import { createSwitchNavigator } from 'react-navigation';

import IntroScreen from '../screens/IntroScreen';
import WalletAddScreen from '../screens/WalletAddScreen';
import HomeScreen from '../screens/HomeScreen';

export default createSwitchNavigator({
    IntroScreen: {
        screen: IntroScreen,
    },
    AddWallet: {
        screen: WalletAddScreen,
    },
    Home: {
        screen: HomeScreen,
    },
});