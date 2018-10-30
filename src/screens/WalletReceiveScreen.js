'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Clipboard,
    ToastAndroid
} from 'react-native';
import { connect } from 'react-redux';
import QRCode from 'react-native-qrcode';
import { Button } from 'react-native-elements';

const QRCODE_SIZE = 200;
const QRCODE_FOREGRAOUND_COLOR = '#FFF';
const QRCODE_BACKGROUND_COLOR = '#000'

export default class WalletReceiveScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Recevie ${navigation.getParam('token').name}`
    })
    render() {
        return (
            <ReceiveContainer />
        );
    }
}

class Receive extends Component {
    render() {
        return (
            <View style={styles.container}>
                <QRCode
                    value={this.props.address}
                    size={QRCODE_SIZE}
                    fgColor={QRCODE_FOREGRAOUND_COLOR}
                    bgColor={QRCODE_BACKGROUND_COLOR}
                />
                <Text style={styles.address}>
                    {this.props.address}
                </Text>
                <Button
                    title='Copy Address'
                    buttonStyle={styles.button}
                    onPress={() => {
                        Clipboard.setString(this.props.address)
                        ToastAndroid.show('Copied', ToastAndroid.SHORT);
                    }}
                />
            </View>
        )
    }
}

const extractCurrentAddress = (wallet) => (
    wallet.wallets[wallet.selectedIndex].getAddressString()
)

const mapStateToProps = (state) => ({
    address: extractCurrentAddress(state.wallet),
})

const ReceiveContainer = connect(mapStateToProps, undefined)(Receive);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    address: {
        fontSize: 14,
        margin: 20,
    },
    button: {
        width: 200,
    },
})
