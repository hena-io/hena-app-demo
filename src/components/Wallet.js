import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class Wallet extends Component {
    render() {
        const { index, address } = this.props;
        return (
            <View style={styles.container}>
                <Text h4>Wallet</Text>
                <Text>Index: {index}</Text>
                <Text>Address: {address}</Text>
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
});