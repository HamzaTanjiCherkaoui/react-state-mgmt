import {validateSignupForm} from '../core/signup-validator';
import {signup} from '../core/signup.service';
import {action, observable, reaction, runInAction} from 'mobx';

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
        error: observable.ref(null)
    };

    validationDisposer;

    constructor() {
        this.setupValidation();
    }

    @action
    setFieldValue(field, value) {
        this.info[field] = value;

        this.info.touched = true;
    }

    setupValidation() {
        this.validationDisposer = reaction(
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
                this.validation.pending = true;

                try {
                    await validateSignupForm(info);
                    runInAction(() => {
                        this.validation.error = null;
                        this.validation.valid = true;
                    });
                } catch (err) {
                    runInAction(() => {
                        this.validation.error = err;
                        this.validation.valid = false;
                    });
                }
                finally {
                    runInAction(() => {
                        this.validation.pending = false;
                    });
                }
            },
            {delay: 250}
        );
    }

    @action
    cancelSignup(history) {
        this.reset();
        history.push('/signup/cancel');
    }

    @action
    async performSignup(formData, history) {
        this.signup.failed = false;
        this.signup.completed = false;
        this.signup.pending = true;

        try {
            await signup(formData);
            runInAction(() => {
                this.reset();
                this.signup.completed = true;
            });

            history.push('/signup/complete');
        } catch (err) {
            runInAction(() => {
                this.signup.failed = true;
            });
        } finally {
            runInAction(() => {
                this.signup.pending = false;
            });
        }

    }

    reset() {
        this.validationDisposer && this.validationDisposer();

        this.info = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',

            touched: false,
        };


        this.signup = {
            pending: false,
            completed: false,
            failed: false
        };

        this.validation = {
            pending: false,
            valid: false,
            error: null
        };

        this.setupValidation();
    }
}

export const store = new Store();