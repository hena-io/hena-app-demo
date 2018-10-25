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
    tokens: [
        {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
            balance: '0',
        },
        {
            name: 'Hena',
            symbol: 'HENA',
            decimals: 18,
            contractAddress: '0x8d97c127236d3aef539171394212f2e43ad701c4',
            contract: null,
            balance: '0',
        },
        {
            name: 'Ninano',
            symbol: 'NNT',
            decimals: 18,
            contractAddress: '0x1112c318af5a1cf4189c37a622bf08c7241be466',
            contract: null,
            balance: '0',
        }
    ]
};

// Reducer
export default reducer = handleActions({
    [ADD_TOKEN]: (state, action) => {
        const token = action.payload;
        token.contract = new web3.eth.Contract(erc20, token.contractAddress);
        return { tokens: state.tokens.concat(token) };
    },
    [REMOVE_TOKEN]: (state, action) => ({
        tokens: (action.payload != 0) ? state.tokens.slice(action.payload, 1) : state.token
    }),
    [UPDATE_BALANCE]: (state, action) => {
        if (action.payload.index < 0 ||
            action.payload.index >= state.tokens.length) {
            return state.tokens;
        }

        const tokens = state.slice();
        tokens[action.payload.index].balance = action.payload.balance;
        return { tokens: tokens };
    },
}, initialState);
