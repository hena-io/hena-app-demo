import { createStackNavigator } from 'react-navigation';
import AICHomeScreen from '../screens/AIC/AICHomeScreen';

export default createStackNavigator({
    Home: {
        screen: AICHomeScreen
    }
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisibie: false,
    }
});