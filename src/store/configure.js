import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import modules from './modules';

const configure = (initialState = {}) => {
    const store = createStore(
        modules,
        initialState,
        applyMiddleware(promiseMiddleware)
    );
    
    return store;
}

export default configure;