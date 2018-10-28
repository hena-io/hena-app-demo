import { createAction, handleActions } from 'redux-actions';
import Config from 'react-native-config';

import txlist_mock from '../../../mocks/txlist.json';
import tokentx_mock from '../../../mocks/tokentx.json';

const API_URL = 'http://api.etherscan.io/api';

const getTransaction = (address, isToken, page, offset, sort) => (
    `${API_URL}?module=account&action=${isToken ? 'tokentx' : 'txlist'}&address=${address}&startblock=$0&endblock=99999999&sort=${sort}&page=${page}&offset=${offset}&apikey=${Config.ETHERSCAN_API_KEY}`
);

// ActionTypes
const LOAD_TXS = 'txs/LOAD';

// Actions
export const loadTxs = createAction(LOAD_TXS, (address, isToken, page, offset) => isToken ? tokentx_mock : txlist_mock);

// Initial State
const initialState = {
    list: []
};

// Reducer
export default reducer = handleActions({
    [LOAD_TXS]: (state, action) => ({
        list: action.payload.result || []
    }),
}, initialState);