import React from 'react';
import {SignupComplete} from '../components/signup/signup-complete';
import {SignupCanceled} from '../components/signup/signup-canceled';
import {store} from './store';
import {SignupForm} from './signup-form';
import {Provider} from 'react-redux';
import {Redirect, Route, Switch} from 'react-router-dom';
import {browserHistory} from '../core/browser-history';
import {ConnectedRouter} from 'react-router-redux';
import {Home} from '../components/home';

export function ReduxSignupExample() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={browserHistory}>
                <div>
                    <small className="badge badge-pill badge-default">Redux</small>

                    <Switch>
                        <Route path="/signup" exact={true} component={SignupForm} />
                        <Route path="/signup/complete" component={CustomSignupComplete} />
                        <Route path="/signup/cancel" component={CustomSignupCanceled} />
                        <Route path="/home" component={Home} />
                        <Redirect from="/" to="/signup" />
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>
    );
}

function CustomSignupComplete() {
    return (
        <SignupComplete homePath={'/home'} />
    );
}

function CustomSignupCanceled() {
    return (
        <SignupCanceled signupPath={'/signup'} />
    );
}