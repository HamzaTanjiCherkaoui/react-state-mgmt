import React from 'react';
import {connect, Provider} from 'react-redux';
import {browserHistory, SET_FIELD, store} from './store';
import {FormField} from '../components/form-field';
import {validateAction} from './form-validator';
import {FormContainer} from '../components/form-container';
import {Redirect, Route, Router} from 'react-router-dom';
import {SignupComplete} from './signup-complete';
import {routingAction} from './routing-middleware';
import {SignupCanceled} from './signup-canceled';

class ConnectedSignupForm extends React.Component {
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
            onCancel
        } = this.props;

        return (
            <FormContainer>
                <FormField
                    title={`Pick a username <small class="text-muted">${validation.pending ? '(Validating...)' : ''}</small>`}
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
                        <button className="btn btn-primary" disabled={!validation.valid}>Sign up</button>
                        <button className="btn btn-link" onClick={onCancel}>Not now</button>
                    </div>
                </div>
            </FormContainer>
        );
    }

    setField = field => (event => {
        const {
            username,
            firstName,
            lastName,
            password,
            email,
        } = this.props.info;

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


const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        async onFieldChange(field, value, state) {
            dispatch({type: SET_FIELD, payload: {field, value}});
            dispatch(validateAction(state));
        },

        onCancel() {
            dispatch(routingAction('/signup/cancel'));
        }
    };
};

const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupForm);

export function ReduxSignupExample() {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <div>
                    <Redirect from="/" to={'/signup'} />
                    <Route path="/signup" exact={true} component={SignupForm} />
                    <Route path="/signup/complete" component={SignupComplete} />
                    <Route path="/signup/cancel" component={SignupCanceled} />
                </div>
            </Router>
        </Provider>
    );
}
