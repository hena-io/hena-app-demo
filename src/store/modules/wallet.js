import { createAction, handleActions } from 'redux-actions';

// Action Types
const ADD_WALLET = 'wallet/ADD';
const REMOVE_WALLET = 'wallet/REMOVE';
const SELECT_WALLET = 'wallet/SELECT';

// Actions
export const addWallet = createAction(ADD_WALLET);
export const removeWallet = createAction(REMOVE_WALLET);
export const selectWallet = createAction(SELECT_WALLET);

// Initial State
const initialState = {
    wallets: [],
    selectedIndex: 0
};

// Reducer
export default reducer = handleActions({
    [ADD_WALLET]: (state, action) => ({
        wallets: state.wallets.concat(action.payload),
        selectedIndex: state.wallets.length
    }),
    [REMOVE_WALLET]: (state, action) => ({
        wallets: state.wallets.slice(action.payload, 1),
        selectedIndex: ((state.selectedIndex >= state.wallets.length - 1) ? 0 : state.selectedIndex)
    }),
    [SELECT_WALLET]: (state, action) => ({
        wallets: state.wallets,
        selectedIndex: Math.max(Math.min(action.payload, state.wallets.length - 1), 0)
    })
}, initialState);