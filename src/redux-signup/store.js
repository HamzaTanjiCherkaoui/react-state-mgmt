import {applyMiddleware, createStore} from 'redux';
import {VALIDATE_END, VALIDATE_FAIL, VALIDATE_START} from './form-validator';
import thunk from 'redux-thunk';

export const SET_FIELD = 'SET_FIELD';

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

function reducer(state = {}, action) {
    switch (action.type) {
        case SET_FIELD:
            const {field, value} = action.payload;
            return {
                ...state,
                touched: true,
                [field]: value
            };

        default:
            return {
                ...state,
                validation: validationReducer(state.validation, action)
            };
    }
}

const initialState = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',

    touched: false,

    validation: {
        pending: false,
        valid: false,
        error: {}
    }
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
