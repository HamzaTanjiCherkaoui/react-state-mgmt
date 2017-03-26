import {applyMiddleware, compose, createStore} from 'redux';
import {browserHistory} from '../core/browser-history';
import {push, routerMiddleware} from 'react-router-redux';
import {initialState, reducer} from '../redux-signup/reducers';

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
import {createEpicMiddleware, combineEpics} from 'redux-observable';

import {Observable} from 'rxjs';

const epicMiddleware = createEpicMiddleware(rootEpic());

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(browserHistory)))
);

function rootEpic() {
    return combineEpics(
        // signupEpic,
        validateEpic,
        // navigateToCanceledPageEpic
    );
}

function* signupEpic(action$, store) {
    yield takeLatest(SIGNUP, performSignup);
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

function* navigateToCanceledPage() {
    while (true) {
        yield take(SIGNUP_CANCELED);
        yield put({type: RESET_FORM});
        yield put(push('/signup/cancel'));
    }
}

function validateEpic(action$) {
    return action$
        .ofType(VALIDATE)
        .debounceTime(500)
        .switchMap(({payload: formData}) => {
            return Observable.concat(
                Observable.of({type: VALIDATE_START}),
                Observable.fromPromise(validateSignupForm(formData))
                    .mapTo({type: VALIDATE_END})
                    .catch(err => {
                        return Observable.of({type: VALIDATE_FAIL, payload: err});
                    }),
            );
        });
}


