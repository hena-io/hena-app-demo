import { createStackNavigator } from 'react-navigation';
import MiningHomeScreen from '../screens/mining/MiningHomeScreen';

export default createStackNavigator({
    Home: {
        screen: MiningHomeScreen
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisibie: false,
    }
});