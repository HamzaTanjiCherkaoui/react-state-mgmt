import React from 'react';
import {ReduxSignupExample} from './redux-signup';
import {ReduxSagaSignupExample} from './redux-saga-signup';

const examples = [
    {name: 'redux', title: 'Redux'},
    {name: 'redux-saga', title: 'Redux-Saga'},
    {name: 'redux-observable', title: 'Redux-Observable'},
    {name: 'mobx', title: 'MobX'},
];

export class App extends React.Component {
    state = {
        example: 'redux'
    };

    render() {
        const {example} = this.state;
        const activeClassName = 'active btn-primary';

        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="btn-group">
                            {
                                examples.map(x => {

                                    return (
                                        <button key={x.name}
                                                type="button"
                                                onClick={() => this.setState({example: x.name})}
                                                className={`btn ${example === x.name ? activeClassName : 'btn-secondary'}`}>
                                            {x.title}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>


                {example === 'redux' && <ReduxSignupExample />}
                {example === 'redux-saga' && <ReduxSagaSignupExample />}
            </div>
        );
    }
}
