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
    [ADD_WALLET]: (state, action) => {
        state.wallets.push(action.payload);
        return state;
    },
    [REMOVE_WALLET]: ({ wallets }, action) => ({
        wallets: wallets.slice(action.payload, 1)
    }),
    [SELECT_WALLET]: ({ selectedIndex }) => ({
        selectedIndex: selectedIndex
    })
}, initialState);