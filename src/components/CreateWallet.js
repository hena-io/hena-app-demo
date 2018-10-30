import React, { Component } from 'react';
import { StyleSheet, View, Clipboard, ToastAndroid } from 'react-native';
import { Text, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import bip39 from 'react-native-bip39';
import HDKey from 'ethereumjs-wallet-react-native/hdkey';
import web3 from '../utils/web3';

import * as Constants from '../constants';
1
const introduce = 'These 12 words are the only way to restore your Hena Wallet.\n' +
    'Save them somewhere safe and secret.'

export default class CreateWallet extends Component {
    static propTypes = {
        onCreate: PropTypes.func
    }

    constructor(props) {
        super(props);

        this.state = {
            wordList: ''
        };
    }

    componentWillMount() {
        bip39.generateMnemonic()
            .then(wordList => this.setState({ wordList: wordList }));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.message}>{introduce}</Text>
                </View>
                <View style={styles.centerContainer}>
                    <View style={styles.wordContainer}>
                        <Text h4>
                            {this.state.wordList}
                        </Text>
                        
                    </View>
                </View>
                <View style={styles.bttomContainer}>
                    <Text onPress={this._onCopyWordsToClipboard}>
                        Copy
                    </Text>
                    <Button
                        title={'Create'}
                        buttonStyle={styles.createButton}
                        onPress={this._onCreate}
                    />
                </View>
            </View>
        );
    }

    _onCopyWordsToClipboard = () => {
        Clipboard.setString(this.state.wordList);
        ToastAndroid.show('Copied', ToastAndroid.SHORT);
    }

    _onCreate = () => {
        const seed = bip39.mnemonicToSeed(this.state.wordList);
        const hdkey = HDKey.fromMasterSeed(seed)
            .derivePath(Constants.DEFAULT_WALLET_PATH);

        if (this.props.onCreate) {
            this.props.onCreate(hdkey.getWallet());
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    message: {
        fontSize: 18,
        margin: 20,
        alignContent: 'center'
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
    },
    wordContainer: {
        flex: 1,
        margin: 26,
    },
    bttomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20
    },
    createButton: {
        width: 200,
    }
});