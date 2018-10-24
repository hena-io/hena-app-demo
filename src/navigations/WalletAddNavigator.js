import { createStackNavigator } from 'react-navigation';

import WalletAddScreen from '../screens/WalletAddScreen';
import WalletCreateContainer from '../containers/WalletCreateContainer';
import WalletImportContainer from '../containers/WalletImportContainer';

export default createStackNavigator({
    Home: {
        screen: WalletAddScreen,
        navigationOptions: {
            headerTitle: 'Add New Wallet',
        },
    },
    Create: {
        screen: WalletCreateContainer,
        navigationOptions: {
            headerTitle: 'Create Wallet',
        },
    },
    Import: {
        screen: WalletImportContainer,
        navigationOptions: {
            headerTitle: 'Import Wallet',
        },
    }
}, {
    navigationOptions: {
    }
});