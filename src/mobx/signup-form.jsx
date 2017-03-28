import React from 'react';
import {SignupForm as ConnectedSignupForm} from '../components/signup/signup-form';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
export class SignupForm extends React.Component {
    render() {
        const {
            info: {
                username,
                firstName,
                lastName,
                password,
                email,
                touched,
            },
            validation: {
                error, valid, pending
            },
            signup: {
                pending: signupPending, failed, completed
            },
        } = this.props.store;

        const props = {
            info: {
                username,
                firstName,
                lastName,
                password,
                email,
                touched,
            },
            validation: {
                error, valid, pending
            },
            signup: {
                pending: signupPending, completed, failed
            },
        };

        return (
            <ConnectedSignupForm {...props}
                                 onFieldChange={this.onFieldChange}
                                 onSignup={this.onSignup}
                                 onCancel={this.onCancel} />
        );
    }

    onSignup = (formData) => {
        this.props.store.performSignup(formData);
    };

    onFieldChange = (field, value) => {
        this.props.store.setFieldValue(field, value);
    };

    onCancel = () => {
        this.props.store.cancelSignup();
    };
}

