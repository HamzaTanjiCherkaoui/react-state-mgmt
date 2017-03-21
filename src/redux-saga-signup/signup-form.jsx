import React from 'react';
import {connect} from 'react-redux';
import {
    SET_FIELD,
    SIGNUP_CANCELED, SIGNUP_COMPLETED, SIGNUP_FAILED, SIGNUP_STARTED,
    VALIDATE
} from '../redux-signup/actions';
import {signup} from '../core/signup.service';
import {push} from 'react-router-redux';
import {SignupForm as ConnectedSignupForm} from '../components/signup/signup-form';
import {VALIDATE_START} from '../redux-signup/form-validator';


const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onFieldChange: (field, value, formData) => {
            dispatch({type: SET_FIELD, payload: {field, value}});
            dispatch({type: VALIDATE, payload: formData});
        },

        onCancel() {
            dispatch({type: SIGNUP_CANCELED});
            dispatch(push('/signup/cancel'));
        },

        async onSignup(formData) {
            dispatch({type: SIGNUP_STARTED});
            try {
                await signup(formData);
                dispatch({type: SIGNUP_COMPLETED});
                dispatch(push('/signup/complete'));
            } catch (e) {
                dispatch({type: SIGNUP_FAILED});
            }
        }
    };
};

export const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupForm);

