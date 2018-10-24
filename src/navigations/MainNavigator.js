import { createSwitchNavigator } from 'react-navigation';

import WalletAddScreen from '../screens/WalletAddScreen';
import HomeScreen from '../screens/HomeScreen';

export default createSwitchNavigator({
    AddWallet: {
        screen: WalletAddScreen,
    },
    Home: {
        screen: HomeScreen,
    },
});