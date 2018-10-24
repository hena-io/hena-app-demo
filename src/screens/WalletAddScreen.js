import React, { Component } from 'react';

import WalletAddNavigator from '../navigations/WalletAddNavigator';

export default class WalletAddScreen extends Component {
    render() {
        return (
            <WalletAddNavigator screenProps={{rootNavigation: this.props.navigation}} />
        );
    }
}