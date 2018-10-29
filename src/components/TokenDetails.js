import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Utils from '../utils';
import Button from '../components/Button';

export default class TokenDetails extends Component {
    static propTypes = {
        balance: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        decimals: PropTypes.number.isRequired,
    }

    render() {
        const {
            balance,
            decimals,
            symbol,
        } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.token}>
                    <Icon name={'ios-qr-scanner'} size={82}/>
                    <Text style={styles.balance}>
                        {Utils.toBalanceFormat(balance, decimals)} {symbol}
                    </Text>
                </View>
                <View style={styles.actions}>
                    <Button title={'Send'} />
                    <Button title={'Receive'} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BDBDBD',
    },
    token: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    balance: {
        fontSize: 26
    },
    actions: {
        height: 50,
        flexDirection: 'row',
        margin: 4
    },
})