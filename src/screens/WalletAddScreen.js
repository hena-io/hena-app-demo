import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class WalletAddScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button
                    title={'Create'}
                    buttonStyle={styles.button}
                    onPress={this.onCreate}
                />
                <Button
                    title={'Import'}
                    buttonStyle={styles.button}
                    onPress={this.onImport}
                />
            </View>
        );
    }

    onCreate = () => {
        this.props.navigation.navigate('Create');
    }

    onImport = () => {
        this.props.navigation.navigate('Import');
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