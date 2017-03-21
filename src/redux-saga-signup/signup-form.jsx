import React from 'react';
import {connect} from 'react-redux';
import {
    SET_FIELD, SIGNUP,
    SIGNUP_CANCELED,
    SIGNUP_COMPLETED,
    SIGNUP_FAILED,
    SIGNUP_STARTED,
    VALIDATE
} from '../redux-signup/actions';
import {signup} from '../core/signup.service';
import {push} from 'react-router-redux';
import {SignupForm as ConnectedSignupForm} from '../components/signup/signup-form';


const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => {
    return {
        onFieldChange: (field, value, formData) => {
            dispatch({type: SET_FIELD, payload: {field, value}});
            dispatch({type: VALIDATE, payload: formData});
        },

        onCancel() {
            dispatch({type: SIGNUP_CANCELED});
        },

        onSignup(formData) {
            dispatch({type: SIGNUP, payload: formData});
        }
    };
};

export const SignupForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedSignupForm);

