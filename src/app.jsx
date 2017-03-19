import React from 'react';
import {ReduxSignupExample} from './redux-signup';
import {Route, Router} from 'react-router-dom';
import {browserHistory} from './core/browser-history';
import {Home} from './components/home';

export class App extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <div className="container">
                    <ReduxSignupExample />
                    <Route path="/home" component={Home} />
                </div>
            </Router>
        );
    }
}
