import { createStackNavigator } from 'react-navigation';

import WalletTokenListScreen from '../screens/WalletTokenListScreen';
import WalletTokenDetailsScreen from '../screens/WalletTokenDetailsScreen';
import WalletReceiveScreen from '../screens/WalletReceiveScreen';
import WalletSendScreen from '../screens/WalletSendScreen';
import WalletTransferResultScreen from '../screens/WalletTransferResultScreen';

export default createStackNavigator({
    Tokens: {
        screen: WalletTokenListScreen,
        navigationOptions: {
            headerTitle: 'Wallet',
        }
    },
    Details: {
        screen: WalletTokenDetailsScreen,
    },
    Receive: {
        screen: WalletReceiveScreen,
    },
    Send: {
        screen: WalletSendScreen,
    },
    TransferResult: {
        screen: WalletTransferResultScreen,
        navigationOptions: {
            headerTitle: 'Result'
        }
    }
});