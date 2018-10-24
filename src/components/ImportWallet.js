import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import { Text, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import bip39 from 'react-native-bip39';
import HDKey from 'ethereumjs-wallet-react-native/hdkey';
import * as Constants from '../constants';

const introduce = 'Typically 12 (sometimes 24) words seperrated by single space';
const errorMessage = 'Invalid mnemonic pharse';

export default class ImportWallet extends Component {
    static propTypes = {
        onImport: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            wordList: '',
            disableImportButton: true,
            isValidMnemonic: true
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.message}>
                        {introduce}
                    </Text>
                </View>
                <View style={styles.centerContainer}>
                    <TextInput
                        style={styles.wordInput}
                        multiline={true}
                        placeholder={'Backup phase'}
                        underlineColorAndroid='transparent'
                        onChangeText={this._onChangeText}
                    />
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.errorMessage}>
                        {this.state.isValidMnemonic ? '' : errorMessage}
                    </Text>
                    <Button
                        title={'Import'}
                        buttonStyle={styles.importButton}
                        disable={this.state.disableImportButton}
                        onPress={this._onImport}
                    />
                </View>
            </View>
        );
    }

    _onChangeText = (text) => {
        this.setState({
            wordList: text,
            disableImportButton: (text === '')
        });
    };

    _onImport = () => {
        const isValidMnemonic = bip39.validateMnemonic(this.state.wordList);
        if (isValidMnemonic) {
            const seed = bip39.mnemonicToSeed(this.state.wordList);
            const hdkey = HDKey.fromMasterSeed(seed)
                .derivePath(Constants.DEFAULT_WALLET_PATH);

            Keyboard.dismiss();

            if (this.props.onImport) {
                this.props.onImport(hdkey);
            }
        } else {
            this.setState({ isValidMnemonic: false });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
    },
    message: {
        fontSize: 18,
        margin: 20,
        alignContent: 'center'
    },
    centerContainer: {
        flex: 1,
        backgroundColor: '#EFEFEF',
    },
    wordInput: {
        fontSize: 16,
        margin: 10
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20
    },
    errorMessage: {
        fontSize: 16,
        color: 'red'
    },
    importButton: {
        width: 200,
    }
});