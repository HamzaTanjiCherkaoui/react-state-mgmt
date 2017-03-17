import React from 'react';
import {connect, Provider} from 'react-redux';
import {SET_FIELD, store, VALIDATE_USERNAME_END, VALIDATE_USERNAME_FAIL, VALIDATE_USERNAME_START} from './store';
import {validateUserName} from './username-validator';

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
                            <FormField title="Pick a username"
                                       value={userName}
                                       onChange={this.setUserName}
                                       error={validation.userName.failed} />
                            {
                                validation.userName.pending ? 'Validating...' : 'Valid'
                            }
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

function FormField({title, type = 'text', value = '', onChange, error}) {
    return (
        <div className={`form-group ${error ? 'has-danger' : ''}`}>
            <label>{title}</label>
            <input type={type} className="form-control" value={value} onChange={onChange} />
        </div>
    );
}
FormField.propTypes = {
    title: React.PropTypes.string,
    type: React.PropTypes.oneOf(['text', 'checkbox', 'password']),
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    error: React.PropTypes.any,
};

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
                    dispatch({type: VALIDATE_USERNAME_START});
                    try {
                        await validateUserName(value);
                        dispatch({type: VALIDATE_USERNAME_END});
                    } catch (e) {
                        dispatch({type: VALIDATE_USERNAME_FAIL});
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
