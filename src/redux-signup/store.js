import {applyMiddleware, createStore} from 'redux';
import {VALIDATE_END, VALIDATE_FAIL, VALIDATE_START} from './form-validator';
import thunk from 'redux-thunk';
import {createRoutingMiddleware} from './routing-middleware';
import {browserHistory} from '../core/browser-history';

export const SET_FIELD = 'SET_FIELD';
export const SIGNUP_STARTED = 'SIGNUP_STARTED';
export const SIGNUP_COMPLETED = 'SIGNUP_COMPLETED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

function validationReducer(state, action) {
    const property = action.payload;

    switch (action.type) {
        case VALIDATE_START:
            return {
                ...state,
                pending: true,
                valid: false,
            };

        case VALIDATE_FAIL:
            return {
                ...state,
                pending: false,
                valid: false,
                error: action.payload
            };

        case VALIDATE_END:
            return {
                ...state,
                pending: false,
                valid: true,
                error: {}
            };

        default:
            return state;
    }
}

function signupReducer(state, action) {
    switch (action.type) {
        case SIGNUP_STARTED:
            return {
                ...state,
                pending: true,
                completed: false,
                failed: false,
            };

        case SIGNUP_FAILED:
            return {
                ...state,
                pending: false,
                completed: false,
                failed: true,
            };

        case SIGNUP_COMPLETED:
            return {
                ...state,
                pending: false,
                completed: true,
                failed: false,
            };

        default:
            return state;
    }
}

function reducer(state = {}, action) {
    switch (action.type) {
        case SET_FIELD:
            const {field, value} = action.payload;
            return {
                ...state,
                info: {
                    ...state.info,
                    touched: true,
                    [field]: value
                }
            };

        default:
            return {
                ...state,
                validation: validationReducer(state.validation, action),
                signup: signupReducer(state.signup, action)
            };
    }
}

const initialState = {
        info: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',

            touched: false,
        },

        isAuthenticated: false,

        signup: {
            pending: false,
            completed: false,
            failed: false
        },

        validation: {
            pending: false,
            valid: false,
            error: {}
        }
    }
;

export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk, createRoutingMiddleware(browserHistory))
);
