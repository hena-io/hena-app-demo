import React, { Component } from 'react';

import WalletTokenDetailsContainer from '../containers/WalletTokenDetailsConteiner';

export default class WalletTokenDetailsScreen extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('title')
    })

    render() {
        return (
            <WalletTokenDetailsContainer
                address={this.props.navigation.getParam('address')}
                index={this.props.navigation.getParam('index')}
                token={this.props.navigation.getParam('token')}
            />
        );
    }
}