import axios from 'axios';

import {
    LOGIN_WITH_EMAIL_ACTION_TYPES,
    FORGOT_PASSWORD_ACTION_TYPES,
    CREATE_ACCOUNT_ACTION_TYPES,
} from "./actionTypes";


const {
    LOGIN_WITH_EMAIL_REQUEST,
    LOGIN_WITH_EMAIL_FULFILLED,
    LOGIN_WITH_EMAIL_REJECTED
} = LOGIN_WITH_EMAIL_ACTION_TYPES;

const {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FULFILLED,
    FORGOT_PASSWORD_REJECTED
} = FORGOT_PASSWORD_ACTION_TYPES;

const {
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_FULFILLED,
    CREATE_ACCOUNT_REJECTED
} = CREATE_ACCOUNT_ACTION_TYPES;

const BASE_URL = "http://127.0.0.1:7500";

// THUNKS
const loginWithEmail = data => {
    return async (dispatch) => {
        dispatch(loginWithEmailRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                data
            );
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            console.log('user', user);
            // save token and user details to local storage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.user._id)
            localStorage.setItem("name", user.user.fullName)
            return dispatch(loginWithEmailFulfilled(user));
        } catch (e) {
            console.log(e);
            dispatch(loginWithEmailRejected());
        }
    };
};

const createAccount = data => {
    console.log('entered register thunk');
    return async (dispatch) => {
        dispatch(createAccountRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/register`,
                data
            );
            console.log(response)
            const token = `Bearer ${response.data.data.token}`;
            const user = response.data.data;
            console.log('user', user);
            // save token and user details to local storage
            localStorage.setItem("token", token);
            localStorage.setItem("userId", user.user._id)
            localStorage.setItem("name", user.user.fullName)
            return dispatch(createAccountFulfilled(response));
        } catch (e) {
            console.log(e);
            dispatch(createAccountRejected(e));
        }
    };
};

const forgotPassword = data => {
    return async (dispatch) => {
        dispatch(forgotPasswordRequest());
        try {
            const response = await axios.post(
                `${BASE_URL}/api/user/forgot`,
                data
            );
            console.log(response.data)
            return dispatch(forgotPasswordFulfilled(response.data));
        } catch (e) {
            console.log(e);
            dispatch(forgotPasswordRejected());
        }
    };
};



// ACTION CREATORS

const loginWithEmailRequest = () => ({
    type: LOGIN_WITH_EMAIL_REQUEST,
});

const loginWithEmailFulfilled = user => ({
    type: LOGIN_WITH_EMAIL_FULFILLED,
    payload: user
});

const loginWithEmailRejected = () => ({
    type: LOGIN_WITH_EMAIL_REJECTED
});

const forgotPasswordRequest = () => ({
    type: FORGOT_PASSWORD_REQUEST
});

const forgotPasswordFulfilled = data => ({
    type: FORGOT_PASSWORD_FULFILLED,
    payload: data
});

const forgotPasswordRejected = () => ({
    type: FORGOT_PASSWORD_REJECTED
});

const createAccountRequest = () => ({
    type: CREATE_ACCOUNT_REQUEST
});

const createAccountFulfilled = data => ({
    type: CREATE_ACCOUNT_FULFILLED,
    payload: data
});

const createAccountRejected = (data) => ({
    type: CREATE_ACCOUNT_REJECTED,
    payload: data
});



export { loginWithEmail, forgotPassword, createAccount }
