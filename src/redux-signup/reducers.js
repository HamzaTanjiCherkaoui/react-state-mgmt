import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import {VALIDATE_END, VALIDATE_FAIL, VALIDATE_START} from './form-validator';
import {SIGNUP_CANCELED, SIGNUP_COMPLETED, SIGNUP_STARTED, SET_FIELD, SIGNUP_FAILED, RESET_FORM} from './actions';

export const initialState = {
    info: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',

        touched: false,
    },


    router: {location: ''},

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
};

function validationReducer(state = initialState.validation, action) {

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

function signupReducer(state = initialState.signup, action) {
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

function infoReducer(state = initialState.info, action) {
    switch (action.type) {
        case SET_FIELD:
            const {field, value} = action.payload;
            return {
                ...state,
                touched: true,
                [field]: value
            };

        case RESET_FORM:
            return {
                ...state,
                ...initialState.info
            };

        default:
            return state;
    }
}

export const reducer = combineReducers({
    info: infoReducer,
    signup: signupReducer,
    validation: validationReducer,
    router: routerReducer
});
