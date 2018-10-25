import { createStackNavigator } from 'react-navigation';

import WalletHomeScreen from '../screens/WalletHomeScreen';
import WalletTokenScreen from '../screens/WalletTokenScreen';

export default createStackNavigator({
    Home: {
        screen: WalletHomeScreen,
        navigationOptions: {
            header: null,
            headerMode: 'none'
        }
    },
    Token: {
        screen: WalletTokenScreen,
    }
});