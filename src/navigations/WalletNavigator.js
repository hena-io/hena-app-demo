import { createStackNavigator } from 'react-navigation';

import WalletTokenListScreen from '../screens/WalletTokenListScreen';
import WalletTokenDetailsScreen from '../screens/WalletTokenDetailsScreen';

export default createStackNavigator({
    Tokens: {
        screen: WalletTokenListScreen,
        navigationOptions: {
            headerTitle: 'Wallet',
        }
    },
    Details: {
        screen: WalletTokenDetailsScreen,
    }
});