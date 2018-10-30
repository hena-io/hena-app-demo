import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateWallet from '../components/CreateWallet';
import { addWallet } from '../store/modules/wallet';

class WalletCreateContainer extends Component {
    render() {
        return (
            <CreateWallet onCreate={this._onCreate} />
        );
    }

    _onCreate = (wallet) => {
        this.props.addWallet(wallet);
        this.props.screenProps.rootNavigation.navigate('Home');
    };
}

const mapDispatchToProps = (dispatch) => ({
    addWallet: (wallet) => dispatch(addWallet(wallet))
});

export default connect(undefined, mapDispatchToProps)(WalletCreateContainer);