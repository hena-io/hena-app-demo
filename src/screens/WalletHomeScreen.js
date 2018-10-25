import React, { Component } from 'react';

import WalletTokenListContainer from '../containers/WalletTokenListContainer';

export default class WalletHomeScreen extends Component {
    render() {
        return (
            <WalletTokenListContainer screenProps={
                {navigation: this.props.navigation}
            }/>
        );
    }
}