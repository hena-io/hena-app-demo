import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as walletActions from '../store/modules/wallet';
import ImportWallet from '../components/ImportWallet';

class WalletImportContainer extends Component {
    render() {
        return (
            <ImportWallet onImport={this._onImport} />
        );
    }

    _onImport = (hdkey) => {
        const newAddress = hdkey.getWallet().getAddressString();
        const index = this.props.addresses.findIndex((address) => newAddress === address);

        if (index === -1) {
            this.props.addWallet(hdkey);
        } else {
            this.props.selectWallet(index);
        }

        this.props.screenProps.rootNavigation.navigate('Home');
    };
}

const mapStateToProps = (state) => ({
        addresses: state.wallet.wallets.map(hdkey => hdkey.getWallet().getAddressString())
});

const mapDispatchToProps = (dispatch) => ({
    addWallet: (hdkey) => dispatch(walletActions.addWallet(hdkey)),
    selectWallet: (index) => dispatch(walletActions.selectWallet(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletImportContainer);