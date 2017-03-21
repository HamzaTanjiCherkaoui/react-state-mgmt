import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from '../core/browser-history';
import {routerMiddleware} from 'react-router-redux';
import {initialState, reducer} from './reducers';


export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, routerMiddleware(browserHistory))
);
