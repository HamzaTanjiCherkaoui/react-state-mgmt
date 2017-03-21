import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from '../core/browser-history';
import {routerMiddleware} from 'react-router-redux';
import {initialState, reducer} from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(browserHistory)))
);
