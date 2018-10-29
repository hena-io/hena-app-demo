import { createAction, handleActions } from 'redux-actions';
import Config from 'react-native-config';

const API_URL = 'http://api.etherscan.io/api';
const START_BLOCK = 0;
const END_BLOCK = 99999999;

const getTransactionStem = (address, isToken, page, offset, sort) => (
    `${API_URL}?module=account&action=${isToken ? 'tokentx' : 'txlist'}&address=${address}&startblock=${START_BLOCK}&endblock=${END_BLOCK}&sort=${sort}&page=${page}&offset=${offset}&apikey=${Config.ETHERSCAN_API_KEY}`
)

const loadTransactions = (address, isToken, page, offset, sort = 'desc') => (
    fetch(getTransactionStem(address, isToken, page, offset, sort))
        .then(response => response.json())
        .then(responseJson => responseJson.result)
)

// ActionTypes
const LOAD_TXS = 'txs/LOAD';

// Actions
export const loadTxs = createAction(
    LOAD_TXS,
    (address, isToken, page, offset) => (
        loadTransactions(address, isToken, page, offset)
    )
);

// Initial State
const initialState = {
    list: []
};

// Reducer
export default reducer = handleActions({
    [LOAD_TXS]: (state, action) => ({
        list: action.payload || []
    }),
}, initialState);