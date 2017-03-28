import {validateSignupForm} from '../core/signup-validator';
import {signup} from '../core/signup.service';
import {observable, reaction, action, when} from 'mobx';

class Store {
    @observable info = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',

        touched: false,
    };


    @observable signup = {
        pending: false,
        completed: false,
        failed: false
    };

    @observable validation = {
        pending: false,
        valid: false,
        error: observable.ref({})
    };

    init() {
        this.setupValidation();
    }

    @action
    setFieldValue(field, value) {
        this.info[field] = value;

        this.info.touched = true;
    }

    setupValidation() {
        reaction(
            () => {
                const {
                    username,
                    password,
                    firstName,
                    lastName,
                    email
                } = this.info;

                return {
                    username,
                    password,
                    firstName,
                    lastName,
                    email
                };
            },
            async (info) => {
                try {
                    await validateSignupForm(info);
                    this.validation.error = null;
                    this.validation.valid = true;
                } catch (err) {
                    this.validation.error = err;
                    this.validation.valid = false;
                }
                finally {
                    this.validation.pending = false;
                }
            }
        );
    }

    @action
    performSignup() {

    }
}

const store = new Store();
store.init();

export {store};