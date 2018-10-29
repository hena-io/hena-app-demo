import React, { Component } from 'react';

import WalletTokenListContainer from '../containers/WalletTokenListContainer';

export default class WalletTokenListScreen extends Component {
    render() {
        return (
            <WalletTokenListContainer
                onShowTokenDetails={this._onShowTokenDetails}
            />
        );
    }

    _onShowTokenDetails = (tokenName, address, index, token) => {
        this.props.navigation.navigate(
            'Details', {
                title: tokenName,
                address: address,
                index: index,
                token: token,
            }
        );
    }
}