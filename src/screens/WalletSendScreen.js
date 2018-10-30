'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';

import web3 from '../utils/web3';

const INVALID_ADDRESS_MESSAGE = 'Invalid Address';
const INVALID_AMOUNT_MESSAGE = 'Invalid Amount';

export default class WalletSendScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Send ${navigation.getParam('token').name}`
    })

    render() {
        return (
            <SendContainer
                token={this.props.navigation.getParam('token')}
                balance={this.props.navigation.getParam('balance')}
            />
        );
    }
}

class Send extends Component {
    static propTypes = {
        token: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {
            toAddress: '',
            validToAddress: false,
            invalidAddressMessage: '',
            amount: '0',
            validAmount: false,
            invalidAmountMessage: '',
        }
    }

    _confirmToAddress = () => {
        if (this.state.toAddress && !web3.utils.isAddress(this.state.toAddress)) {
            this.setState({ invalidAddressMessage: INVALID_ADDRESS_MESSAGE });
        }
    }

    _confirmAmount = () => {
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputConatiner}>
                    <Input
                        containerStyle={{width: '100%'}}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        errorStyle={{ color: 'red' }}
                        placeholder={'Recipient Address'}
                        onChangeText={text => this.setState({ toAddress: text })}
                        onEndEditing={this._confirmToAddress}
                        onFocus={() => this.setState({ invalidAddressMessage: '' })}
                        errorMessage={this.state.invalidAddressMessage}
                    />
                    <Input
                        containerStyle={{width: '100%'}}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        errorStyle={{ color: 'red' }}
                        placeholder={'Amount'}
                        onChangeText={text => this.setState({ amount: text })}
                        onEndEditing={this._confirmAmount}
                        onFocus={() => this.setState({ invalidAmountMessage: '' })}
                        errorMessage={this.state.invalidAmountMessage}
                        keyboardType={'numeric'}
                        
                    />
                </View>
                <Button
                    title={'Next'}
                    buttonStyle={styles.button}
                    onPress={() => {}}
                    disabled={this.state.invalidAddressMessage !== '' || this.state.invalidAmountMessage !== ''}
                />
            </View>
        );
    }
}

const extractCurrentAddress = (wallet) => (
    wallet.wallets[wallet.selectedIndex].getAddressString()
)

const mapStateToProps = (state) => ({
    address: extractCurrentAddress(state.wallet),
})

const SendContainer = connect(mapStateToProps, undefined)(Send);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputConatiner: {
        height: 100,
        width: '90%',
        marginTop: 30,
        justifyContent: 'space-between'
    },
    input: {
        width: '100%'
    },
    button: {
        width: 200,
        margin: 20,
    }
})