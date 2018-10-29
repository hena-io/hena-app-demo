import { createAction, handleActions } from 'redux-actions';
import RNFS from 'react-native-fs';

import * as Constants from '../../constants';

// Action Types
const ADD_WALLET = 'wallet/ADD';
const REMOVE_WALLET = 'wallet/REMOVE';
const SELECT_WALLET = 'wallet/SELECT';

// Actions
export const addWallet = createAction(ADD_WALLET, (wallet, needSave) => ({ wallet: wallet, needSave: needSave }));
export const removeWallet = createAction(REMOVE_WALLET);
export const selectWallet = createAction(SELECT_WALLET);

// Initial State
const initialState = {
    wallets: [],
    selectedIndex: 0
};

// Reducer
export default reducer = handleActions({
    [ADD_WALLET]: (state, action) => {
        let index = state.wallets.findIndex(
            wallet => wallet.getPrivateKey() == action.payload.wallet.getPrivateKey()
        );

        if (index !== -1) {
            return ({
                wallets: state.wallets,
                selectedIndex: index,
            });
        }

        console.log(action);

        let wallets = state.wallets.concat(action.payload.wallet);
        if (action.payload.needSave) {
            RNFS.writeFile(
                Constants.WALLET_FILE_PATH,
                JSON.stringify(wallets.map(wallet => wallet.getPrivateKey())),
                'utf8')
            .then(success => console.log('FILE WRITTEN', success))
            .catch(error => console.log(error.message));
        }

        return ({
            wallets: wallets,
            selectedIndex: state.wallets.length,
        });
    },
    [REMOVE_WALLET]: (state, action) => ({
        wallets: state.wallets.slice(action.payload, 1),
        selectedIndex: ((state.selectedIndex >= state.wallets.length - 1) ? 0 : state.selectedIndex)
    }),
    [SELECT_WALLET]: (state, action) => ({
        wallets: state.wallets,
        selectedIndex: Math.max(Math.min(action.payload, state.wallets.length - 1), 0)
    })
}, initialState);