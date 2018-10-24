import { createMaterialTopTabNavigator } from 'react-navigation';

import WalletScreen from '../screens/WalletScreen';
import MiningScreen from '../screens/MiningScreen';
import AICScreen from '../screens/AICScreen';

export default createMaterialTopTabNavigator({
    Wallet: {
        screen: WalletScreen,
        title: 'Wallet',
    },
    Mining: {
        screen: MiningScreen,
        title: 'Mining',
    },
    AIC: {
        screen: AICScreen,
        title: 'AIC',
    },
});