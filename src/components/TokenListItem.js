import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import web3 from '../utils/web3';
import erc20 from '../../assets/ABI/ERC20.json';
import { toUsdFormat, toBalanceFormat } from '../utils';

const API_STEM = 'https://api.coinmarketcap.com/v1/ticker';

export default class TokenListItem extends Component {
    static propTypes = {
        address: PropTypes.string,
        index: PropTypes.number,
        item: PropTypes.object,
        onPress: PropTypes.func,
    };

    contract = null;

    constructor(props) {
        super(props);

        this.state = {
            price: '',
            balance: '0',
        };
    }

    _refreshBalance = () => {
        if (this.props.index === 0) {
            fetch(`${API_STEM}/${this.props.item.name}/`)
                .then(response => response.json())
                .then(responseJSON => responseJSON[0].price_usd)
                .then(price => this.setState({ price: price }))
                .catch(error => console.log(error));

            // balance
            web3.eth.getBalance(this.props.address)
                .then(balance => this.setState({ balance: balance }));
        } else if (this.props.item.contractAddress) {
            // balance
            this.contract = new web3.eth.Contract(erc20, this.props.item.contractAddress);
            this.contract.methods.balanceOf(this.props.address).call()
                .then(balance => this.setState({ balance: balance }))
                .catch(error => console.log(error));
        }
    }

    componentWillMount() {
        this._refreshBalance();
    }

    componentWillReceiveProps(nextProps) {
        this._refreshBalance();
    }

    render() {
        return (
            <ListItem
                key={this.props.index.toString()}
                leftIcon={<Icon name='ios-qr-scanner' size={30} />}
                title={`${this.props.item.name} (${this.props.item.symbol})`}
                subtitle={toUsdFormat(this.state.price)}
                rightTitle={toBalanceFormat(this.state.balance, 18)}
                rightIcon={<Icon name='ios-arrow-forward' size={30} />}
                onPress={this.props.onPress}
                bottomDivider={true}
            />
        );
    }
}