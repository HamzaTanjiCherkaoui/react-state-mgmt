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

class ValidationErrors extends Error {
    errors = null;
    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export const ACTION_VALIDATION = '__VALIDATION__';
export function validateForm(attributes) {
    return validate.async(attributes, rules);
}
