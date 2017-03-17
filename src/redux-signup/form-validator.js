import validate from 'validate.js';

validate.validators.checkUserName = (value) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = value === '' ? false : Math.random() > 0.5;
            result ? resolve(true) : reject(false);
        }, 250);
    });
};

const rules = {
    userName: {
        presence: true
    },
    firstName: {presence: true},
    lastName: {presence: true},
    email: {presence: true},
};

