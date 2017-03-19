import React from 'react';
import {SignupComplete} from './signup-complete';
import {SignupCanceled} from './signup-canceled';
import {store} from './store';
import {SignupForm} from './signup-form';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {browserHistory} from '../core/browser-history';
import {ConnectedRouter} from 'react-router-redux';
import {Home} from '../components/home';

export function ReduxSignupExample() {
    return (
        <Provider store={store}>
            <ConnectedRouter history={browserHistory}>
                <div>
                    <Route path="/signup" exact={true} component={SignupForm} />
                    <Route path="/signup/complete" component={SignupComplete} />
                    <Route path="/signup/cancel" component={SignupCanceled} />
                    <Route path="/home" component={Home} />
                </div>
            </ConnectedRouter>
        </Provider>
    );
}
