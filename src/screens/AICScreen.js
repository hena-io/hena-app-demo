import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';

import AicBalances from '../components/AIC/Balances';
import AicHistory from '../components/AIC/History';
import AicReport from '../components/AIC/Report';
import RadioButtonGroup from '../components/RadioButtonGroup';

import Config from 'react-native-config';

export default class AicScreen extends Component {
    render() {
        return (
            <Aic userId={Config.AIC_USER_ID} />
        );
    }
}

class Aic extends Component {
    static propTypes = {
        userId: PropTypes.string.isRequired,
    };

    pages = [
        <AicBalances userId={this.props.userId} />,
        <AicReport userId={this.props.userId} />,
        <AicHistory userId={this.props.userId} />,
    ];

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigator}>
                    <RadioButtonGroup
                        titles={['Balances', 'Report', 'History']}
                        onPress={(page) => this.setState({ page: page })}
                    />
                </View>
                <View style={styles.content}>
                    {this.pages[this.state.page]}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        backgroundColor: '#E9E9EF',
    },
    navigator: {
        height: 60,
        flexDirection: 'row',
    }
})