import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Card, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import web3 from '../utils/web3';
import Config from 'react-native-config';

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

const renderToken = ({index, item}) => {
    return (
        <ListItem
            key={index.toString()}
            title={`${item.name}(${item.symbol})`}
            subtitle={'$$$'}
            leftIcon={<Icon name='ios-qr-scanner' size={30}/>}
            rightIcon={<Icon name='ios-arrow-forward' size={30}/>}
            rightTitle={`${item.balance}`}
            onPress={() => console.log('Token', item.name)}
            bottomDivider={true}
        />
    );
};

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
                    renderItem={renderToken}
                    keyExtractor={(value, index) => index.toString()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});