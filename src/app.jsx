import React from 'react';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

class State {
    @observable name = 'Hello';

    constructor() {
        this.fetchJSON();
    }

    async fetchJSON() {
        const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('done');
            }, 1000)
        });

        const response = await p;
        console.log(response);
    }
}

const state = new State();

@observer
export class App extends React.Component {
    render() {
        const {name} = state;

        return (
            <h1>{name}</h1>
        );
    }
}
