import React from 'react';
import {connect} from 'react-redux';
import {RESET_FORM, SET_FIELD, SIGNUP_CANCELED, SIGNUP_COMPLETED, SIGNUP_FAILED, SIGNUP_STARTED} from './actions';
import {signup} from '../core/signup.service';
import {push} from 'react-router-redux';
import {debounce} from 'lodash';
import {SignupForm as ConnectedSignupForm} from '../components/signup/signup-form';
import {validateAction} from './form-validator';
import {batchActions} from 'redux-batched-actions';

const debouncedValidate = debounce((dispatch, formData) => {
    dispatch(validateAction(formData));
}, 250);

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onFieldChange: (field, value, formData) => {
            dispatch({type: SET_FIELD, payload: {field, value}});
            debouncedValidate(dispatch, formData);
        },

        onCancel() {
            dispatch(batchActions([
                {type: SIGNUP_CANCELED},
                {type: RESET_FORM},
            ]));

            dispatch(push('/signup/cancel'));

        },

        async onSignup(formData) {
            dispatch({type: SIGNUP_STARTED});
            try {
                await signup(formData);
                dispatch(batchActions([
                    {type: SIGNUP_COMPLETED},
                    {type: RESET_FORM},
                ]));

                dispatch(push('/signup/complete'));

            } catch (e) {
                dispatch({type: SIGNUP_FAILED});
            }
        }
    };
};

export const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupForm);

