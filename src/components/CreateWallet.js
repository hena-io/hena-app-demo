import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Clipboard
} from 'react-native';
import { Text, Button } from 'react-native-elements';

import bip39 from 'react-native-bip39';
import HDKey from 'ethereumjs-wallet-react-native/hdkey';

import * as Constants from '../constants';

const introduce = 'These 12 words are the only way to restore your Hena Wallet.\n' +
    'Save them somewhere safe and secret.'

export default class CreateWallet extends Component {
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
                    <Text h2>Create Account</Text>
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
                        title={'Next'}
                        buttonStyle={styles.button}
                        onPress={this._onNext}
                    />
                </View>
            </View>
        );
    }

    _onCopyWordsToClipboard = () => {
        Clipboard.setString(this.state.wordList);
    }

    _onNext = () => {
        const hdkey = HDKey.fromMasterSeed(bip39.mnemonicToSeed(this.state.wordList))
            .derivePath(Constants.DEFAULT_WALLET_PATH);

        this.props.onCreate(hdkey);
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
    button: {
        width: 200,
    }
});