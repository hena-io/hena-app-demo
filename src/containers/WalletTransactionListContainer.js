import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as TransactionActions from '../store/modules/transactions';
import TransactionList from '../components/TransactionList';

class WalletTransactionListContainer extends Component {
    static propTypes = {
        address: PropTypes.string.isRequired
    };

    static defaultProps = {
        address: '0x24cb7f4f377d8f4b33ea125e987a7fed0c4960a2'
    };

    componentWillMount() {
        this.refresh();
    }

    render() {
        return (
            <TransactionList
                address={this.props.address}
                txs={this.props.txs}
            />
        );
    }

    refresh() {
        this.props.loadTxs(1, 10);
    }
}

const mapStateToProps = (state) => ({
    txs: state.txs.list
})

const mapDispatchToProps = (dispatch) => ({
    loadTxs: (page, offset) => dispatch(TransactionActions.loadTxs(page, offset))
})

export default connect(mapStateToProps, mapDispatchToProps)(WalletTransactionListContainer);