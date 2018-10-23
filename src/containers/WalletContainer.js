import React, { Component } from 'react';
import { connect } from 'react-redux';
import Wallet from '../components/Wallet';
import * as Constants from '../constants';

class WalletContainer extends Component {
    render() {
        const { index, hdkey } = this.props;
        const address = '0x' + hdkey.getWallet().getAddress().toString('hex');
        return (
            <Wallet index={index} address={address} />
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);

    return {
        index: state.wallet.selectedIndex,
        hdkey: state.wallet.wallets[state.wallet.selectedIndex]
    };
};

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletContainer);