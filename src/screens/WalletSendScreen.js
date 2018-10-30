'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';

import web3 from '../utils/web3';
import * as Utils from '../utils';

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
        token: PropTypes.object.isRequired,
        balance: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            toAddress: '',
            amount: '0',
            validToAddress: true,
            validToAmount: true,
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputConatiner}>
                    <Input
                        containerStyle={styles.input}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        errorStyle={{ color: 'red' }}
                        placeholder={'Recipient Address'}
                        onChangeText={text => this.setState({ toAddress: text })}
                        onEndEditing={this._confirmToAddress}
                        errorMessage={this.state.validToAddress ? '' : INVALID_ADDRESS_MESSAGE}
                    />
                    <Input
                        containerStyle={styles.input}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        errorStyle={{ color: 'red' }}
                        placeholder={'Amount'}
                        onChangeText={text => this.setState({ amount: text })}
                        onEndEditing={this._confirmAmount}
                        errorMessage={this.state.validToAmount ? '' : INVALID_AMOUNT_MESSAGE}
                        keyboardType={'numeric'}
                        
                    />
                </View>
                <Button
                    title={'Next'}
                    buttonStyle={styles.button}
                    onPress={this._onNext}
                />
            </View>
        );
    }

    _onNext = () => {
        let validToAddress = this.state.toAddress && web3.utils.isAddress(this.state.toAddress);

        let balance = Big(Utils.toDecimal(this.props.balance, this.props.token.decimals));
        let amount = Big(this.state.amount);
        let validToAmount = amount.gt(0) && amount.lte(balance);

        this.setState({
            validToAddress: validToAddress,
            validToAmount: validToAmount,
        });

        if (validToAddress && validToAmount) {
        }
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
        height: 200,
        width: '90%',
        marginTop: 30,
    },
    input: {
        width: '100%',
        marginTop: 10,
    },
    button: {
        width: 200,
        margin: 20,
    }
})