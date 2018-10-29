import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';

import web3 from '../utils/web3';
import * as tokenActions from '../store/modules/token';

import erc20 from '../../assets/ABI/ERC20.json';

const HENA_TOKEN_CONTRACT_ADDRESS = '0x8d97c127236d3aef539171394212f2e43ad701c4';

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
    },
    {
        name: 'tHena',
        symbol: 'THENA',
        decimals: 18,
        contractAddress: '0x3f5b4afae259c95108c720f4eb997bc3ddb20686',
        contract: new web3.eth.Contract(erc20, '0x3f5b4afae259c95108c720f4eb997bc3ddb20686'),
        balance: '0',
    }
];

class IntroContainer extends Component {
    componentWillMount() {
        this.loadTokens();
        setTimeout(() => this.props.screenProps.navigation.navigate('AddWallet'), 1000);
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

    loadTokens = () => {
        defaultTokens.forEach(token => this.props.addToken(token));
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
    addToken: (token) => dispatch(tokenActions.addToken(token))
});

export default connect(undefined, mapDispatchToProps)(IntroContainer);