import React from 'react';
import {connect, Provider} from 'react-redux';
import {SET_FIELD, store} from './store';
import {ACTION_VALIDATION} from './form-validator';
import {FormField} from '../components/form-field';

class ConnectedSignupForm extends React.Component {
    render() {
        const {
            username,
            firstName,
            lastName,
            password,
            email,
            touched,
            validation
        } = this.props;

        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <Header />

                    <form>
                        <div>
                            <FormField
                                title={`Pick a username <small class="text-muted">${validation.pending ? '(Validating...)' : ''}</small>`}
                                value={username}
                                onChange={this.setUserName}
                                showValidation={touched}
                                error={!validation.valid && validation.error.username} />
                        </div>

                        <FormField title="Pick a strong password"
                                   type="password"
                                   value={password}
                                   onChange={this.setPassword}
                                   showValidation={touched}
                                   error={!validation.valid && validation.error.password} />

                        <div className="row">
                            <div className="col">
                                <FormField title="First Name"
                                           value={firstName}
                                           onChange={this.setFirstName}
                                           showValidation={touched}
                                           error={!validation.valid && validation.error.firstName} />

                            </div>
                            <div className="col">
                                <FormField title="Last Name"
                                           value={lastName}
                                           onChange={this.setLastName}
                                           showValidation={touched}
                                           error={!validation.valid && validation.error.lastName} />

                            </div>
                        </div>

                        <FormField title="Email"
                                   value={email}
                                   onChange={this.setEmail}
                                   showValidation={touched}
                                   error={!validation.valid && validation.error.email} />


                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary">Sign up</button>
                                <button className="btn btn-link">Not now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    setField = field => (event => {
        const {
            username,
            firstName,
            lastName,
            password,
            email,
        } = this.props;

        const state = {
            username,
            firstName,
            lastName,
            password,
            email,
        };
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

function Header() {
    return (
        <div className="card card-inverse card-primary text-center">
            <div className="card-block">
                <h3>Welcome to</h3>
                <h1>SyntaxCon</h1>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onFieldChange: async (field, value, state) => {
            dispatch({
                type: SET_FIELD,
                payload: {
                    field,
                    value
                }
            });

            dispatch({type: ACTION_VALIDATION, payload: state});
        }
    };
};

const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupForm);

export function ReduxSignupExample() {
    return (
        <Provider store={store}>
            <SignupForm />
        </Provider>
    );
}
