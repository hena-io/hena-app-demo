import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

import * as Utils from '../utils';

const Button = ({ title }) => (
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
);

Button.propTypes = {
    title: PropTypes.string.isRequired
};

Button.defaultProps = {
    title: 'Welcome'
};

const TokenView = ({ balance, symbol }) => (
    <View style={styles.container}>
        <View style={styles.token}>
            <Icon name={'ios-qr-scanner'} size={82}/>
            <Text style={styles.balance}>
                {Utils.toBalanceFormat(balance)} {symbol}
            </Text>
        </View>
        <View style={styles.actions}>
            <Button title={'Send'} />
            <Button title={'Receive'} />
        </View>
    </View>
);

TokenView.propTypes = {
    balance: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    container: {
        height: 250,
        backgroundColor: '#DD00DD',
    },
    token: {
        flex: 1,
        backgroundColor: '#34F043',
        alignItems: 'center',
        justifyContent: 'center'
    },
    balance: {
        fontSize: 26
    },
    actions: {
        height: 50,
        backgroundColor: '#439834',
        flexDirection: 'row',
        margin: 4
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00DDDD',
        margin: 4,
        borderRadius: 10
    },
    buttonTitle: {
        fontSize: 20
    }
});

export default TokenView;