import { createAction, handleActions } from 'redux-actions';
import RNFS from 'react-native-fs';
import Wallet from 'ethereumjs-wallet-react-native';

import * as Constants from '../../constants';

// Action Types
const LOAD_WALLETS = 'wallet/LOAD'
const ADD_WALLET = 'wallet/ADD';
const REMOVE_WALLET = 'wallet/REMOVE';
const REMOVE_ALL_WALLETS = 'wallet/REMOVE_ALL'
const SELECT_WALLET = 'wallet/SELECT';

// Actions
export const loadWallets = createAction(LOAD_WALLETS, () => _loadWallets());

export const addWallet = createAction(ADD_WALLET);
export const selectWallet = createAction(SELECT_WALLET);
export const removeWallet = createAction(REMOVE_WALLET);
export const removeAllWallets = createAction(REMOVE_ALL_WALLETS);

// Initial State
const initialState = {
    wallets: [],
    selectedIndex: 0
};

// Reducer
export default reducer = handleActions({
    [LOAD_WALLETS]: (state, action) => ({
            wallets: action.payload.wallets || [],
            selectedIndex: action.payload.selectedIndex,
    }),
    [ADD_WALLET]: (state, action) => {
        let index = state.wallets.findIndex(
            wallet => wallet.getPrivateKey() == action.payload.getPrivateKey()
        );

        if (index !== -1) {
            return ({
                wallets: state.wallets,
                selectedIndex: index,
            });
        }

        let wallets = state.wallets.concat(action.payload);
        let selectedIndex = state.wallets.length;
        _saveWallets(wallets, selectedIndex);

        return ({
            wallets: wallets,
            selectedIndex: selectedIndex,
        });
    },
    [REMOVE_WALLET]: (state, action) => {
        let wallets = state.wallets.slice(action.payload, 1);
        let selectedIndex = (state.selectedIndex >= state.wallets.length - 1) ? 0 : state.selectedIndex;
        _saveWallets(wallets, selectedIndex);
        return ({
            wallets: wallets,
            selectedIndex: selectedIndex
        })  
    },
    [REMOVE_ALL_WALLETS]: (state, action) => {
        RNFS.unlink(Constants.WALLET_FILE_PATH);
        return ({
            wallets: [],
            selectedIndex: 0
        });
    },
    [SELECT_WALLET]: (state, action) => ({
        wallets: state.wallets,
        selectedIndex: Math.max(Math.min(action.payload, state.wallets.length - 1), 0)
    })
}, initialState);

const _loadWallets = () => (
    RNFS.readFile(Constants.WALLET_FILE_PATH, 'utf8')
        .then(contents => JSON.parse(contents))
        .then(contentsJson => ({
            keys: contentsJson.wallets.map(buffer => new Buffer(buffer.data, 'hex')),
            index: contentsJson.selectedIndex
        }))
        .then(obj => ({
                wallets: obj.keys.map(key => Wallet.fromPrivateKey(key)),
                selectedIndex: obj.index
        }))
        .catch(error => console.log(error))
)

const _saveWallets = (wallets, selectedIndex) => {
    RNFS.writeFile(
        Constants.WALLET_FILE_PATH,
        JSON.stringify({
            wallets: wallets.map(wallet => wallet.getPrivateKey()),
            selectedIndex: selectedIndex
        }), 'utf8')
        .then(success => console.log('FILE WRITTEN', success))
        .catch(error => console.log(error.message));
}