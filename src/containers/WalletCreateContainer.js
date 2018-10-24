import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateWallet from '../components/CreateWallet';
import * as walletActions from '../store/modules/wallet';

class WalletCreateContainer extends Component {
    render() {
        return (
            <CreateWallet onCreate={this._onCreate} />
        );
    }

    _onCreate = (hdkey) => {
        this.props.addWallet(hdkey);
        this.props.navigation.pop();
    };
}

const mapDispatchToProps = (dispatch) => ({
    addWallet: (hdkey) => dispatch(walletActions.addWallet(hdkey))
});

export default connect(undefined, mapDispatchToProps)(WalletCreateContainer);