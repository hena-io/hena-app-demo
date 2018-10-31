import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import RNFS from 'react-native-fs';
import web3 from '../utils/web3';

import { addToken } from '../store/modules/token';
import { loadWallets } from '../store/modules/wallet';

import * as Constants from '../constants';

import erc20 from '../../assets/ABI/ERC20.json';

const HENA_TOKEN_CONTRACT_ADDRESS = '0x8d97c127236d3aef539171394212f2e43ad701c4';
const WAIT_TIME = 1000;

const defaultTokens = [
    {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        balance: '0',
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        contractAddress: HENA_TOKEN_CONTRACT_ADDRESS,
        contract: new web3.eth.Contract(erc20, HENA_TOKEN_CONTRACT_ADDRESS),
        balance: '0',
    }
];

class IntroContainer extends Component {
    componentWillMount() {
        this._loadTokens();
        this._loadWallets();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>HENA</Text>
                    <Text style={styles.subtitle}>THE GENESIS OF A MOBILE ECOSYSTEM</Text>
                </View>
                <View style={styles.container}>
                    <ActivityIndicator size='large' color='#000000' />
                </View>
            </View>
        );
    }

    _loadTokens = () => {
        defaultTokens.forEach(token => this.props.addToken(token));
    }

    _loadWallets = () => {
        RNFS.exists(Constants.WALLET_FILE_PATH)
            .then(exists => {
                if (exists) {
                    this.props.loadWallets();
                    this._onNavigate('Home');
                } else {
                    this._onNavigate('AddWallet');
                }
            })
    }

    _onNavigate = (screen) => {
        setTimeout(() => this.props.screenProps.navigation.navigate(screen), WAIT_TIME);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 64,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

const mapDispatchToProps = (dispatch) => ({
    addToken: (token) => dispatch(addToken(token)),
    loadWallets: () => dispatch(loadWallets())
});

export default connect(undefined, mapDispatchToProps)(IntroContainer);