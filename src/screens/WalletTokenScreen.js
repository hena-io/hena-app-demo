import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Button, Card } from 'react-native-elements';

export default class WalletTokenScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Card title='Ethereum'>
                    <Text h2>100</Text>
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='VIEW NOW'
                    />
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='VIEW NOW'
                    />
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00DDDD'
    },
    tokenContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#DD00DD',
    },
    button: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    buttonContainer: {
        flex: 1,
        
        backgroundColor: 'red'
    }
});