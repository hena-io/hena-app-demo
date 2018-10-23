import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

export default class ImportAccountScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h2>Create Account</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});