import './shim';

import { AppRegistry } from 'react-native';
import App from './App';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated in plain JavaScript React classes.'
]);

AppRegistry.registerComponent('HenaApp', () => App);
