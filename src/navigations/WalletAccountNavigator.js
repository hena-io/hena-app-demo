import { createSwitchNavigator } from 'react-navigation';

import WalletAccountCheckScreen from '../screens/wallet/WalletAccountCheckScreen';
import WalletAccountScreen from '../screens/wallet/WalletAccountScreen';
import WalletNavigator from './WalletNavigator';

export default createSwitchNavigator({
    Check: {
        screen: WalletAccountCheckScreen
    },
    Account: {
        screen: WalletAccountScreen
    },
    Home: {
        screen: WalletNavigator
    },
});