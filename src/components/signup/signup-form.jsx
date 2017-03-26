import React from 'react';
import {FormField} from '../form-field';
import {FormContainer} from '../form-container';

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
            onCancel
        } = this.props;

        const signupLabel = signup.pending ? 'Signing up...' : 'Sign up';

        return (
            <FormContainer>
                {
                    signup.failed
                        ? (<div className="alert alert-danger"><strong>Oops</strong>, something went wrong. Please try
                        again.</div>)
                        : null
                }

                <small className="float-right">{validation.pending ? 'Validating...' : ''}</small>

                <FormField
                    title={`Pick a username`}
                    value={username}
                    onChange={this.setUserName}
                    enableValidation={touched}
                    error={!validation.valid && validation.error.username} />

                <FormField title="Pick a strong password"
                           type="password"
                           value={password}
                           onChange={this.setPassword}
                           enableValidation={touched}
                           error={!validation.valid && validation.error.password} />

                <div className="row">
                    <div className="col">
                        <FormField title="First Name"
                                   value={firstName}
                                   onChange={this.setFirstName}
                                   enableValidation={touched}
                                   error={!validation.valid && validation.error.firstName} />

                    </div>
                    <div className="col">
                        <FormField title="Last Name"
                                   value={lastName}
                                   onChange={this.setLastName}
                                   enableValidation={touched}
                                   error={!validation.valid && validation.error.lastName} />

                    </div>
                </div>

                <FormField title="Email"
                           value={email}
                           onChange={this.setEmail}
                           enableValidation={touched}
                           error={!validation.valid && validation.error.email} />


                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary btn-lg"
                                onClick={this.onSignup}
                                disabled={!validation.valid || signup.pending}>{signupLabel}</button>
                        <button className="btn btn-link" onClick={onCancel}>Not now</button>
                    </div>
                </div>
            </FormContainer>
        );
    }

    getFormData() {
        const {
            username,
            firstName,
            lastName,
            password,
            email,
        } = this.props.info;

        return {
            username,
            firstName,
            lastName,
            password,
            email,
        };
    }

    onSignup = (event) => {
        event.preventDefault();

        const data = this.getFormData();
        this.props.onSignup(data);
    };

    setField = field => (event => {
        const state = this.getFormData();
        const value = event.target.value;

        state[field] = value;
        this.props.onFieldChange(field, value, state);
    });

    setUserName = this.setField('username');
    setPassword = this.setField('password');
    setFirstName = this.setField('firstName');
    setLastName = this.setField('lastName');
    setEmail = this.setField('email');
}
