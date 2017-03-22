import validate from 'validate.js';

validate.validators.checkUserName = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = value === '' ? false : Math.random() > 0.25;
            result ? resolve() : resolve('already exists or is invalid');
        }, 250);
    });
};

const rules = {
    username: {
        presence: true,
        checkUserName: true
    },
    password: {
        presence: true,
        length: {
            minimum: 3
        }
    },
    firstName: {
        presence: true
    },
    lastName: {
        presence: true
    },
    email: {
        email: {
            message: 'is not valid'
        }
    },
};

export function validateSignupForm(attributes) {
    return validate.async(attributes, rules);
}
