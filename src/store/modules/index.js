import { combineReducers } from 'redux';
import wallet from './wallet';
import token from './token';
import txs from './transactions';

export default combineReducers({
    wallet,
    token,
    txs,
});