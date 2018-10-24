import { createStackNavigator } from 'react-navigation';

import WalletHomeScreen from '../screens/WalletHomeScreen';

export default createStackNavigator({
    Home: {
        screen: WalletHomeScreen,
    },
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});