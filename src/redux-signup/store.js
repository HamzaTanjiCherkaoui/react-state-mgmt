import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from '../core/browser-history';
import {routerMiddleware} from 'react-router-redux';
import {initialState, reducer} from './reducers';
import {enableBatching} from 'redux-batched-actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    enableBatching(reducer),
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(browserHistory)))
);
