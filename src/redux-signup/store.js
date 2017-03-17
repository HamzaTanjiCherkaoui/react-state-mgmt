import {createStore} from 'redux';

export const VALIDATE_START = 'VALIDATE_START';
export const VALIDATE_FAIL = 'VALIDATE_FAIL';
export const VALIDATE_END = 'VALIDATE_END';
export const SET_FIELD = 'SET_FIELD';

function validationReducer(state, action) {
    const property = action.payload;

    switch (action.type) {
        case VALIDATE_START:
            return {
                [property]: {
                    pending: true,
                    valid: false,
                }
            };

        case VALIDATE_FAIL:
            return {
                [property]: {
                    pending: false,
                    valid: false,
                }
            };

        case VALIDATE_END:
            return {
                [property]: {
                    pending: false,
                    valid: true
                }
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
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',

    validation: {
        userName: {
            pending: false,
            valid: false,
        }
    }
};


export const store = createStore(reducer, initialState);
