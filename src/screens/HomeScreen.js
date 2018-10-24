import React, { Component } from 'react';

import HomeNavigator from '../navigations/HomeNavigator';

export default class HomeScreen extends Component {
    render() {
        return (
            <HomeNavigator screenProps={{rootNavigation: this.props.navigation}} />
        );
    }
}