import { createAction, handleActions } from 'redux-actions';

import web3 from '../../utils/web3';
import erc20 from '../../../assets/ABI/ERC20.json';

// Action Types
const ADD_TOKEN = 'token/ADD';
const REMOVE_TOKEN = 'token/REMOVE';
const UPDATE_BALANCE = 'token/UPDATE';

// Actions
export const addToken = createAction(ADD_TOKEN);
export const removeToken = createAction(REMOVE_TOKEN);
export const updateBalance = createAction(UPDATE_BALANCE);

// Initial State
const initialState = {
    tokens: []
};

// Reducer
export default reducer = handleActions({
    [ADD_TOKEN]: (state, action) => {
        const newToken = action.payload;
        if (state.tokens.find(token => token.contractAddress === newToken.contractAddress)) {
            return { tokens: state.tokens };
        }
        return { tokens: state.tokens.concat(newToken) };
    },
    [REMOVE_TOKEN]: (state, action) => ({
        tokens: (action.payload != 0) ? state.tokens.slice(action.payload, 1) : state.tokens
    }),
    [UPDATE_BALANCE]: (state, action) => {
        if (action.payload.index < 0 ||
            action.payload.index >= state.tokens.length) {
            return { tokens: state.tokens };
        }

        const tokens = state.tokens.slice();
        tokens[action.payload.index].balance = action.payload.balance;
        return { tokens: tokens };
    },
}, initialState);
