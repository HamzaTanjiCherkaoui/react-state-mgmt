import React from 'react';
import {ReduxSignupExample} from './redux-signup';
import {ReduxSagaSignupExample} from './redux-saga-signup';
import {Link} from 'react-router-dom';

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

        return (
            <div className="container">

                <MenuBar selection={example}
                         list={examples}
                         onSelected={(name) => this.setState({example: name})} />

                {example === 'redux' && <ReduxSignupExample />}
                {example === 'redux-saga' && <ReduxSagaSignupExample />}
            </div>
        );
    }
}

function MenuBar({list, selection, onSelected}) {
    const activeClassName = 'active btn-primary';

    return (
        <div className="row">
            <div className="col">
                <div className="btn-group">
                    {
                        list.map(x => {

                            return (
                                <button key={x.name}
                                        type="button"
                                        onClick={() => onSelected(x.name)}
                                        className={`btn ${selection === x.name ? activeClassName : 'btn-secondary'}`}>
                                    {x.title}
                                </button>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}