import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, RefreshControl, Text } from 'react-native';

import web3 from '../utils/web3';
import TokenDetails from '../components/TokenDetails';
import TransactionListItem from '../components/TransactionListItem';
import * as TransactionActions from '../store/modules/transactions';

class WalletTokenContainer extends Component {
    static propTypes = {
        address: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        token: PropTypes.object.isRequired,
        onNavigate: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            balance: '0',
            refreshing: false
        };
    }

    componentWillMount() {
        this._refresh();
    }

    render() {
        return (
            <FlatList
                data={this._reformTxs()}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ListHeaderComponent={
                    <TokenDetails
                        token={this.props.token}
                        balance={this.state.balance}
                        onNavigate={this.props.onNavigate}
                    />
                }
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._refresh}
                    />
                }
            />
        );
    }

    _refresh = () => {
        const {
            address,
            index,
            token,
        } = this.props;

        let isToken = index !== 0;
        this.props.loadTxs(address, isToken);

        if (!isToken) {
            web3.eth.getBalance(this.props.address)
                .then(balance => this.setState({ balance: balance }));
        } else if (token) {
            token.contract.methods.balanceOf(this.props.address).call()
                .then(balance => this.setState({ balance: balance }))
                .catch(error => console.log(error));
        }
    }

    _keyExtractor = (item, index) => (
        item.hash
    )

    _renderItem = ({ key, item }) => (
        <TransactionListItem
            key={key}
            item={item}
            decimals={this.props.token.decimals}
            symbol={this.props.token.symbol}
        />
    )

    _getStatus = (tx) => {
        if (tx.isError && tx.isError !== '0') return 'Error';
        if (tx.from === this.props.address) return 'Sent';
        if (tx.to === this.props.address) return 'Receive';
        if (tx.contractAddress.length > 0) return 'Contract';
        return 'Unknown';
    }

    _reformTxs = () => {
        let txs = this.props.txs;
        if (this.props.index !== 0) {
            txs = txs.filter(tx =>
                tx.contractAddress == this.props.token.contractAddress
            );
        }

        return txs.map(tx => ({
            status: this._getStatus(tx),
            hash: tx.hash,
            from: tx.from,
            to: tx.from,
            value: tx.value,
            raw: tx
        }));
    }
}

const mapStateToProps = (state) => ({
    tokens: state.token.tokens,
    txs: state.txs.list,
})

const mapDispatchToProps = (dispatch) => ({
    loadTxs: (address, isToken) => dispatch(TransactionActions.loadTxs(address, isToken))
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletTokenContainer);