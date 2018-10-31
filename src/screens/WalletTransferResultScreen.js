import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StackActions } from 'react-navigation';
import { StyleSheet, View, WebView } from 'react-native';
import { Text, Button } from 'react-native-elements';

const Field = ({title, content}) => (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={{width: 100}}>{title}</Text>
        <Text>{content}</Text>
    </View>
)

export default class WalletTransferResultScreen extends Component {
    render() {
        return (
            <TransferResult
                receipt={this.props.navigation.getParam('receipt')}
                error={this.props.navigation.getParam('error')}
                isError={this.props.navigation.getParam('isError')}
                onClose={() => this.props.navigation.dispatch(StackActions.popToTop())}
            />
        );
    }
}

class TransferResult extends Component {
    static propTypes = {
        receipt: PropTypes.object,
        isError: PropTypes.bool.isRequired,
        error: PropTypes.string,
    }
  
    render() {
        console.log('WHAT THE HELL', this.props.error, typeof(this.props.error));

        const { isError } = this.props;

        return (
            <View style={styles.container}>
                {isError ? this._renderError() : this._renderReceipt()}
            </View>
        );
    }

    _renderReceipt = () => {
        const {
            transactionHash,
        } = this.props.receipt;

        return (
            <WebView
                scalesPageToFit
                source={{uri: `https://etherscan.io/tx/${transactionHash}`}}
            />
        );
    }

    _renderError = () => {
        let error = this.props.error;
        return (
            <WebView
                source={{uri: 'https://etherscan.io/tx/0x23f130e7e1b0a253131c39c8ba3c603bab9702d29f6831ca959e032296f4a54c'}}
            />
            // <View style={styles.error}>
            //     <Text style={styles.errorText}>{error}</Text>
            //     <Button
            //         title={'Close'}
            //         onPress={() => this.props.onClose()}
            //         buttonStyle={styles.closeButton}
            //     />
            // </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    receipt: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    transactionHash: {
        fontSize: 16,
    },
    error: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    closeButton: {
        width: 200,
    }
});