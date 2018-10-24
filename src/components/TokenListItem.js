import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import web3 from '../utils/web3';
import { BigNumber } from 'react-native-crypto';
import Config from 'react-native-config';

const API_STEM = 'https://api.coinmarketcap.com/v1/ticker';

export default class TokenListItem extends Component {
    static propTypes = {
        index: PropTypes.number,
        item: PropTypes.object,
        onPress: PropTypes.func,
    };

    constructor(props) {
        super(props);

        this.state = {
            price: '',
            balance: '0'
        };
    }

    componentWillMount() {
        if (this.props.item.name === 'Ethereum') {
            this.setState({ price: '$0' });

            // usd
            fetch(`${API_STEM}/ethereum/`)
                .then(response => response.json())
                .then(responseJSON => responseJSON[0].price_usd)
                .then(price =>
                    this.setState({ price: `$${price.substring(0, price.indexOf('.'))}`})
                )
                .catch(error => console.log(error));

            // balance
            web3.eth.getBalance(Config.TEST_WALLET_ADDRESS)
                .then(balance => this.setState({ balance: balance }));
        } else {

        }
    }

    render() {
        return (
            <ListItem
                key={this.props.index.toString()}
                leftIcon={<Icon name='ios-qr-scanner' size={30} />}
                title={`${this.props.item.name} (${this.props.item.symbol})`}
                subtitle={this.state.price}
                rightTitle={'0'}
                rightIcon={<Icon name='ios-arrow-forward' size={30} />}
                onPress={this.props.onPress}
                bottomDivider={true}
            />
        );
    }
}