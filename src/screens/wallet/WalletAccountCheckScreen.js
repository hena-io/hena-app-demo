import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Text } from 'react-native-elements';
import * as Constants from '../../constants';

export default class WalletAccountCheckScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasDefaultAccount: false
        };

        this.props.navigation.addListener('willFocus', this._onFocused);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h2>Check Account</Text>
            </View>
        );
    }

    _onFocused = () => {
        this.props.navigation.navigate('Account');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});