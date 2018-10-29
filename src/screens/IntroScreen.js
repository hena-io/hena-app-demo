import React, { Component } from 'react';

import IntroContainer from '../containers/IntroContainer';

export default class IntroScreen extends Component {
    render() {
        return (
            <IntroContainer screenProps={{navigation: this.props.navigation}} />
        )
    }
}