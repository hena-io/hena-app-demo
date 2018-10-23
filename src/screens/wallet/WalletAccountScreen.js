import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';

export default class WalletAccountScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h2>Account</Text>
                <Button
                    title={'Create Account'}
                    buttonStyle={styles.button}
                />
                <Button
                    title={'Import Account'}
                    buttonStyle={styles.button}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        margin: 10,
    }
});