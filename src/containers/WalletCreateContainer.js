import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import CreateWallet from '../components/CreateWallet';
import * as walletActions from '../store/modules/wallet';

class WalletCreateContainer extends Component {
    componentWillMount() {
        console.log(this.props);
    }

    render() {
        return (
            <CreateWallet onCreate={this._onCreate} />
        );
    }

    _onCreate = (hdkey) => {
        this.props.addWallet(hdkey);
        this.props.screenProps.rootNavigation.navigate('Home');
    };
}

const mapDispatchToProps = (dispatch) => ({
    addWallet: (hdkey) => dispatch(walletActions.addWallet(hdkey))
});

export default connect(undefined, mapDispatchToProps)(WalletCreateContainer);