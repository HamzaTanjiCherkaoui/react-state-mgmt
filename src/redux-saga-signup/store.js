import {applyMiddleware, createStore} from 'redux';
import {browserHistory} from '../core/browser-history';
import {routerMiddleware} from 'react-router-redux';
import {initialState, reducer} from '../redux-signup/reducers';

import createSagaMiddleware, {throttle} from 'redux-saga';
import {call, put} from 'redux-saga/effects';

import {VALIDATE_END, VALIDATE_FAIL, VALIDATE_START} from '../redux-signup/form-validator';
import {validateSignupForm} from '../core/signup-validator';
import {VALIDATE} from '../redux-signup/actions';

const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
    reducer,
    initialState,
    applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory))
);

sagaMiddleware.run(mainSaga);

function* mainSaga() {
    yield throttle(1000, VALIDATE, validateFormSaga);
}

function* validateFormSaga({payload: formData}) {
    try {
        yield put({type: VALIDATE_START});
        yield call(validateSignupForm, formData);
        yield put({type: VALIDATE_END});
    } catch (err) {
        yield put({type: VALIDATE_FAIL, payload: err});
    }

}