'use strict'

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Modal,
    WebView,
    TouchableOpacity,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import Big from 'big.js';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
import { StackActions } from 'react-navigation';

import web3 from '../utils/web3';
import * as Utils from '../utils';
import EthereumTx from 'ethereumjs-tx';

const INVALID_ADDRESS_MESSAGE = 'Invalid Address';
const INVALID_AMOUNT_MESSAGE = 'Invalid Amount';

const gas = '21000';
const gasPrice = web3.utils.toWei('25', 'gwei');
const gasLimit = 21000;

export default class WalletSendScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Send ${navigation.getParam('token').name}`
    })

    render() {
        return (
            <SendContainer
                token={this.props.navigation.getParam('token')}
                balance={this.props.navigation.getParam('balance')}
                onClose={() => this.props.navigation.dispatch(StackActions.popToTop())}
                onNavigate={this.props.navigation.navigate}
            />
        );
    }
}

class Send extends Component {
    static propTypes = {
        token: PropTypes.object.isRequired,
        balance: PropTypes.string.isRequired,
        onNavigate: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            to: '',
            value: '',
            isValidAddress: true,
            isValidValue: true,
            isSending: false,
            modalVisible: false,
            tx: '',
            isError: false,
            error: '!!!!',
        }
    }

    _renderEtherscan = () => (
        <WebView
            source={{uri: `https://etherscan.io/tx/${this.state.tx}`}}
        />
    )

    _renderErrorView = () => (
        <View style={styles.error}>
            <Text style={styles.errorText}>{this.state.error}</Text>
        </View>
    )

    _renderModal = () => (
        <Modal
            visible={this.state.modalVisible}
            onRequestClose={this._closeModal}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={this._closeModal}
                        style={styles.closeButton}
                    >
                        <Text>close</Text>
                    </TouchableOpacity>
                        {this.state.isError ? this._renderErrorView() : this._renderEtherscan()}    
                </View>
            </View>
        </Modal>
    )

    _openEtherscan = (receipt) => {
        this.setState({
            modalVisible: true,
            isSending: false,
            tx: receipt.transactionHash,
            isError: false,
        });
    }

    _openErrorView = (error) => {
        this.setState({
            modalVisible: true,
            isSending: false,
            error: error,
            isError: true,
        });
    }

    _closeModal = () => {
        this.setState({
            modalVisible: false,
        });

        this.props.onClose();
    }

    render() {
        const indicator = this.state.isSending ? (<ActivityIndicator size='large' color='#000000' />) : null;
        return (
            <View style={styles.container}>
                <View style={styles.inputConatiner}>
                    <Input
                        containerStyle={styles.input}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        errorStyle={{ color: 'red' }}
                        placeholder={'Recipient Address'}
                        onChangeText={text => this.setState({ to: text })}
                        onEndEditing={this._confirmto}
                        errorMessage={this.state.isValidAddress ? '' : INVALID_ADDRESS_MESSAGE}
                        editable={!this.state.isSending}
                    />
                    <Input
                        containerStyle={styles.input}
                        inputContainerStyle={{backgroundColor: 'white'}}
                        errorStyle={{ color: 'red' }}
                        placeholder={'Amount'}
                        onChangeText={text => this.setState({ value: text })}
                        onEndEditing={this._confirmAmount}
                        errorMessage={this.state.isValidValue ? '' : INVALID_AMOUNT_MESSAGE}
                        keyboardType={'numeric'}
                        editable={!this.state.isSending}
                        
                    />
                </View>
                {indicator}
                <Button
                    title={'Next'}
                    buttonStyle={styles.button}
                    onPress={this._onNext}
                    disabled={this.state.isSending}
                />
                {this._renderModal()}
            </View>
        );
    }

    _onNext = () => {
        const {
            token,
            balance,
        } = this.props;

        const {
            to
        } = this.state;

        let {
            value,
        } = this.state;

        if (!value) {
            value = '0';
        }

        let valueBN = Big(value);
        this.setState({
            isValidAddress: to && web3.utils.isAddress(to),
            isValidValue: valueBN.gt(0) && valueBN.lte(Utils.toDecimal(balance, token.decimals)),
        });

        if (this.state.isValidAddress && this.state.isValidValue) {
            this.setState({ isSending: true });

            if (token.contractAddress) {
                this._sendToken(to, value);
            } else {
                this._sendEther(to, value);
            }
        }
    }

    _sendEther = (to, value) => {
        let wallet = this.props.wallet;
        let from = wallet.getAddressString();

        web3.eth.getTransactionCount(from)
            .then(number => {
                let rawTx = {
                    nonce: number,
                    from: from,
                    to: to,
                    gas: web3.utils.toHex(gas),
                    gasPrice: web3.utils.toHex(gasPrice),
                    gasLimit: web3.utils.toHex(gasLimit),
                    value: web3.utils.toHex(web3.utils.toWei(value, 'ether'))
                };
        
                let tx = new EthereumTx(rawTx);
                tx.sign(wallet.getPrivateKey());
                web3.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
                    .then(receipt => {
                        console.log('Transfer', 'eth', receipt, typeof(receipt));
                        this._openEtherscan(receipt);
                    })
                    .catch(error => {
                        console.log('Transfer', 'Error', 'eth', error.message);
                        this._openErrorView(error.message.replace('Returned error: ', ''));
                    });
            });
    }

    _sendToken = (to, value) => {
        const {
            wallet,
            token,
        } = this.props;

        const from = wallet.getAddressString();
        
        let valueBN = Big(value).mul(Big(10).pow(token.decimals));

        web3.eth.getTransactionCount(from)
            .then(number => {
                let data = token.contract.methods.transfer(to, web3.utils.toHex(valueBN.toString())).encodeABI();
                token.contract.methods.transfer(to, valueBN.toString()).estimateGas({from: from})
                    .then(estimateGas => {
                        let rawTx = {
                            nonce: number,
                            from: from,
                            to: token.contractAddress,
                            gas: web3.utils.toHex(estimateGas),
                            gasPrice: web3.utils.toHex(gasPrice),
                            gasLimit: web3.utils.toHex(gasLimit),
                            value: '0x00',
                            data: data,
                        };
        
                        let tx = new EthereumTx(rawTx);
                        tx.sign(wallet.getPrivateKey());

                        web3.eth.sendSignedTransaction(`0x${tx.serialize().toString('hex')}`)
                        .then(receipt => {
                            this._openEtherscan(receipt);
                        })
                        .catch(error => {
                            this._openErrorView(error.message.replace('Returned error: ', ''));
                        });
                    });
            })
    }
}

const mapStateToProps = (state) => ({
    wallet: state.wallet.wallets[state.wallet.selectedIndex],
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
    },
    modalBackground: {
        flex: 1,
        backgroundColor: '#2222227F'
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        margin: 10,
    },
    closeButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        backgroundColor: 'red',
    },
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
})