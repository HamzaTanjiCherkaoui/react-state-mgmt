import {validateSignupForm} from '../core/signup-validator';
export const VALIDATE_START = 'VALIDATE_START';
export const VALIDATE_FAIL = 'VALIDATE_FAIL';
export const VALIDATE_END = 'VALIDATE_END';

export const validateAction = (formData) => {
    return async (dispatch) => {

        dispatch({type: VALIDATE_START});
        try {
            await validateSignupForm(formData);
            dispatch({type: VALIDATE_END});
        } catch (err) {
            dispatch({type: VALIDATE_FAIL, payload: err});
        }

    };
};
