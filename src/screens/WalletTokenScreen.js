import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';

import TokenCard from '../components/TokenCard';

const TransactionView = () => (
    <View style={styles.transactions}>
    </View>
);

export default class WalletTokenScreen extends Component {
    static propTypes = {
        tokenName: PropTypes.string.isRequired,
        balance: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired
    }

    static defaultProps = {
        tokenName: 'Ethereum',
        balance: '1000.1',
        symbol: 'ETC'
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text h4>{this.props.tokenName}</Text>
                </View>
                <TokenCard balance={this.props.balance} symbol={this.props.symbol} />
                <TransactionView />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    transactions: {
        flex: 1,
        backgroundColor: '#DDDD00'
    }
});