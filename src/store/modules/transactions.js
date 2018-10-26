import { createAction, handleActions } from 'redux-actions';
import mock from '../../../mocks/mock_transactions.json';

// ActionTypes
const LOAD_TXS = 'txs/LOAD';

// Actions
export const loadTxs = createAction(LOAD_TXS, (page, offset) => mock);

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