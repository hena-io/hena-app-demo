import { createStackNavigator } from 'react-navigation';
import WalletHomeScreen from '../screens/wallet/WalletHomeScreen';

export default createStackNavigator({
    Home: {
        screen: WalletHomeScreen,
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisibie: false,
    }
});