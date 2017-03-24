import React from 'react';
import {ReduxSignupExample} from './redux-signup';
import {ReduxSagaSignupExample} from './redux-saga-signup/index';

export class App extends React.Component {
    render() {
        return (
            <div className="container">
                <ReduxSignupExample />
                {/*<ReduxSagaSignupExample />*/}
            </div>
        );
    }
}
