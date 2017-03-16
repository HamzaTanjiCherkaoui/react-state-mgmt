import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import {App} from './app';


render(App);

if (module.hot) {
    module.hot.accept('./app', () => {
        const App = require('./app').App;
        render(App)
    });
}

function render(Component) {

    const root = (
        <AppContainer>
            <Component />
        </AppContainer>
    );

    ReactDOM.render(root, document.querySelector('main'));
}