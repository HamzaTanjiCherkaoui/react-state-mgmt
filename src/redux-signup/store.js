import {createStore} from 'redux';

export const VALIDATE_USERNAME_START = 'VALIDATE_USERNAME_START';
export const VALIDATE_USERNAME_FAIL = 'VALIDATE_USERNAME_FAIL';
export const VALIDATE_USERNAME_END = 'VALIDATE_USERNAME_END';
export const SET_FIELD = 'SET_FIELD';

function validationReducer(state, action) {
    switch (action.type) {
        case VALIDATE_USERNAME_START:
            return {
                userName: {
                    pending: true,
                    failed: false,
                    completed: false
                }
            };

        case VALIDATE_USERNAME_FAIL:
            return {
                userName: {
                    pending: false,
                    failed: true,
                    completed: false
                }
            };

        case VALIDATE_USERNAME_END:
            return {
                userName: {
                    pending: false,
                    failed: false,
                    completed: true
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
            failed: false,
            completed: false
        }
    }
};


export const store = createStore(reducer, initialState);
