import { createAction, handleActions } from 'redux-actions';

// Action Types
const ADD_TOKEN = 'token/ADD';
const REMOVE_TOKEN = 'token/REMOVE';

// Actions
export const addToken = createAction(ADD_TOKEN);
export const removeToken = createAction(REMOVE_TOKEN);

// Initial State
const initialState = {
    tokens: [
        {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
            contract: ''
        },
        {
            name: 'Hena',
            symbol: 'HENA',
            decimals: 18,
            contract: '0x8d97c127236d3aef539171394212f2e43ad701c4'
        }
    ]
};

// Reducer
export default reducer = handleActions({
    [ADD_TOKEN]: (state, action) => ({
        tokens: state.tokens.concat(action.payload)
    }),
    [REMOVE_TOKEN]: (state, action) => ({
        tokens: state.tokens.slice(action.payload, 1)
    })
}, initialState);