import validate from 'validate.js';

validate.validators.checkUserName = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = value === '' ? false : Math.random() > 0.5;
            result ? resolve() : resolve('already exists or is invalid');
        }, 250);
    });
};

const rules = {
    username: {
        presence: true,
        checkUserName: true
    },
    password: {presence: true},
    firstName: {presence: true},
    lastName: {presence: true},
    email: {presence: true},
};

export const VALIDATE_START = 'VALIDATE_START';
export const VALIDATE_FAIL = 'VALIDATE_FAIL';
export const VALIDATE_END = 'VALIDATE_END';

function validateForm(attributes) {
    return validate.async(attributes, rules);
}

export const validateAction = (formData) => {
    return async (dispatch) => {

        dispatch({type: VALIDATE_START});
        try {
            await validateForm(formData);
            dispatch({type: VALIDATE_END});
        } catch (err) {
            dispatch({type: VALIDATE_FAIL, payload: err});
        }

    };
};
