import {validateSignupForm} from '../core/signup-validator';
import {signup} from '../core/signup.service';
import {observable, reaction, action, when, runInAction} from 'mobx';
import {browserHistory} from '../core/browser-history';

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

    cancelSignup() {
        browserHistory.push('/signup/cancel');
    }

    @action
    async performSignup(formData) {
        this.signup.failed = false;
        this.signup.completed = false;
        this.signup.pending = true;

        try {
            await signup(formData);
            runInAction(() => {
                this.signup.completed = true;
            });

            browserHistory.push('/signup/complete');
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
}

const store = new Store();
store.init();

export {store};