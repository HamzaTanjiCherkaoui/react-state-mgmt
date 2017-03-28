import React from 'react';
import {SignupComplete} from '../components/signup/signup-complete';
import {SignupCanceled} from '../components/signup/signup-canceled';
import {store} from './store';
import {SignupForm} from './signup-form';
import {Provider} from 'mobx-react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {browserHistory} from '../core/browser-history';
import {BrowserRouter} from 'react-router-dom';
import {Home} from '../components/home';
import {withTitle} from '../components/with-title';
import DevTools from 'mobx-react-devtools';

export const MobXSignupExample = withTitle('MobX', () => (
    <Provider store={store}>
        <div>
            <DevTools/>
            <BrowserRouter history={browserHistory}>
                <Switch>
                    <Route path="/signup" exact={true} component={SignupForm} />
                    <Route path="/signup/complete" component={CustomSignupComplete} />
                    <Route path="/signup/cancel" component={CustomSignupCanceled} />
                    <Route path="/home" component={Home} />
                    <Redirect from="/" to="/signup" />
                </Switch>
            </BrowserRouter>
        </div>
    </Provider>
));

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
