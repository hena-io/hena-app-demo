import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addWallet, selectWallet } from '../store/modules/wallet';
import ImportWallet from '../components/ImportWallet';

class WalletImportContainer extends Component {
    render() {
        return (
            <ImportWallet onImport={this._onImport} />
        );
    }

    _onImport = (wallet) => {
        const newAddress = wallet.getAddressString();
        const index = this.props.addresses.findIndex((address) => newAddress === address);

        if (index === -1) {
            this.props.addWallet(wallet);
        } else {
            this.props.selectWallet(index);
        }

        this.props.screenProps.rootNavigation.navigate('Home');
    };
}

const mapStateToProps = (state) => ({
        addresses: state.wallet.wallets.map(wallet => wallet.getAddressString())
});

const mapDispatchToProps = (dispatch) => ({
    addWallet: (wallet) => dispatch(addWallet(wallet)),
    selectWallet: (index) => dispatch(selectWallet(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletImportContainer);