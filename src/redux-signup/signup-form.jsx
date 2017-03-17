import React from 'react';
import {connect, Provider} from 'react-redux';
import {SET_FIELD, store, VALIDATE_END, VALIDATE_FAIL, VALIDATE_START} from './store';
import {validateForm} from './form-validator';
import {FormField} from '../components/form-field';

class ConnectedSignupForm extends React.Component {
    render() {
        const {
            userName,
            firstName,
            lastName,
            password,
            email,
            validation
        } = this.props;

        return (
            <div className="row">
                <div className="col-xs-12 col-sm-6">
                    <Header />

                    <form>
                        <div>
                            <FormField title={`Pick a username <small class="text-muted">${validation.userName.pending ? '(Validating...)' : ''}</small>`}
                                       value={userName}
                                       onChange={this.setUserName}
                                       error={!validation.userName.valid}
                                       showValidation={true} />
                        </div>

                        <FormField title="Pick a strong password"
                                   type="password"
                                   value={password}
                                   onChange={this.setPassword} />

                        <div className="row">
                            <div className="col">
                                <FormField title="First Name"
                                           value={firstName}
                                           onChange={this.setFirstName} />
                            </div>
                            <div className="col">
                                <FormField title="Last Name"
                                           value={lastName}
                                           onChange={this.setLastName} />
                            </div>
                        </div>

                        <FormField title="Email"
                                   value={email}
                                   onChange={this.setEmail} />

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

    setField = field => (event => this.props.onFieldChange(field, event.target.value));
    setUserName = this.setField('userName');
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
        onFieldChange: async (field, value) => {
            dispatch({
                type: SET_FIELD,
                payload: {
                    field,
                    value
                }
            });

            switch (field) {
                case 'userName':
                    dispatch({type: VALIDATE_START, payload: 'userName'});
                    try {
                        await validateForm(value);
                        dispatch({type: VALIDATE_END, payload: 'userName'});
                    } catch (e) {
                        dispatch({type: VALIDATE_FAIL, payload: 'userName'});
                    }

                    break;

                default:
            }
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
