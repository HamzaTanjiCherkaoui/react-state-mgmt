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
            validation,
            signup,
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
            validation,
            signup,
        };

        return (
            <ConnectedSignupForm {...props}
                                 onFieldChange={this.onFieldChange}
                                 onCancel={this.onCancel} />
        );
    }

    onFieldChange = (field, value) => {
        this.props.store.setFieldValue(field, value);
    };

    onCancel = () => {
        this.props.store.onCancel();
    };
}

