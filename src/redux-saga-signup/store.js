import {applyMiddleware, compose, createStore} from 'redux';
import {browserHistory} from '../core/browser-history';
import {push, routerMiddleware} from 'react-router-redux';
import {initialState, reducer} from '../redux-signup/reducers';

import createSagaMiddleware, {takeLatest, throttle} from 'redux-saga';
import {call, fork, put, take} from 'redux-saga/effects';

import {VALIDATE_END, VALIDATE_FAIL, VALIDATE_START} from '../redux-signup/form-validator';
import {validateSignupForm} from '../core/signup-validator';
import {
    RESET_FORM,
    SIGNUP,
    SIGNUP_CANCELED,
    SIGNUP_COMPLETED,
    SIGNUP_FAILED,
    SIGNUP_STARTED,
    VALIDATE
} from '../redux-signup/actions';
import {signup} from '../core/signup.service';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(browserHistory)))
);

sagaMiddleware.run(mainSaga);

function* mainSaga() {
    yield fork(signupSaga);

    yield fork(validationSaga);
    yield fork(navigateToCanceledPageSaga);
}

function* signupSaga() {
    yield takeLatest(SIGNUP, performSignup);
}

function* navigateToCanceledPageSaga() {
    while (true) {
        yield take(SIGNUP_CANCELED);
        yield put({type: RESET_FORM});
        yield put(push('/signup/cancel'));
    }
}

function* validationSaga() {
    yield throttle(500, VALIDATE, validateForm);
}

function* performSignup({payload: formData}) {
    try {
        yield put({type: SIGNUP_STARTED});
        yield call(signup, formData);

        yield put({type: SIGNUP_COMPLETED});
        yield put({type: RESET_FORM});
        yield put(push('/signup/complete'));
    } catch (e) {
        yield put({type: SIGNUP_FAILED});
    }

}

function* validateForm({payload: formData}) {
    try {
        yield put({type: VALIDATE_START});
        yield call(validateSignupForm, formData);
        yield put({type: VALIDATE_END});
    } catch (err) {
        yield put({type: VALIDATE_FAIL, payload: err});
    }

}

