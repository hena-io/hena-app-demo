import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import web3 from '../utils/web3';
import Config from 'react-native-config';
import TokenListItem from '../components/TokenListItem';

const mock = [
    {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    },
    {
        name: 'Hena',
        symbol: 'HENA',
        decimals: 18,
        balance: 100,
    }
];

export default class WalletHomeScreen extends Component {
    constructor (props) {
        super(props);

        this.state = {
            tokens: mock
        };
    }

    componentWillMount() {
        web3.eth.getBalance(Config.TEST_WALLET_ADDRESS)
             .then(balance => console.log(web3.utils.fromWei(balance, 'ether')));
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.tokens}
                    renderItem={this.renderToken}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }

    renderToken = ({index, item}) => (
        <TokenListItem
            index={index}
            item={item}
            onPress={() => console.log('Token', item.name)}
        />
    );

    keyExtractor = (value, index) => (
        index.toString()
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});