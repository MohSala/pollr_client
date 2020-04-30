import {
    LOGIN_WITH_EMAIL_ACTION_TYPES,
    // FORGOT_PASSWORD_ACTION_TYPES,
    CREATE_ACCOUNT_ACTION_TYPES
} from '../actions/actionTypes'

const {
    LOGIN_WITH_EMAIL_REQUEST,
    LOGIN_WITH_EMAIL_FULFILLED,
    LOGIN_WITH_EMAIL_REJECTED
} = LOGIN_WITH_EMAIL_ACTION_TYPES;
// const {
//     FORGOT_PASSWORD_REQUEST,
//     FORGOT_PASSWORD_FULFILLED,
//     FORGOT_PASSWORD_REJECTED
// } = FORGOT_PASSWORD_ACTION_TYPES;

const {
    CREATE_ACCOUNT_REQUEST,
    CREATE_ACCOUNT_FULFILLED,
    CREATE_ACCOUNT_REJECTED
} = CREATE_ACCOUNT_ACTION_TYPES;


const initialState = {
    isAuthenticated: false,
    error: false,
    resetSent: false,
    resetDone: false,
    loading: false,
    loadingInvite: false,
    // invited: false,
    user: null,
    allUsers: null,
    usersFetched: false,
    message: '',
    created: false,
    // createdAdmin: false,
    // blocked: false,
    // unblocked: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_WITH_EMAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }

        case LOGIN_WITH_EMAIL_FULFILLED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGIN_WITH_EMAIL_REJECTED:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: true,
            }

        // case FORGOT_PASSWORD_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     }

        // case FORGOT_PASSWORD_FULFILLED:
        //     return {
        //         ...state,
        //         loading: false,
        //         resetSent: true,
        //         message: action.payload.message
        //     }

        // case FORGOT_PASSWORD_REJECTED:
        //     return {
        //         ...state,
        //         loading: false,
        //         resetSent: false,
        //         message: "Sorry No User Found"
        //     }

        // case RESET_PASSWORD_REQUEST:
        //     return {
        //         ...state,
        //         loading: true
        //     }

        // case RESET_PASSWORD_FULFILLED:
        //     return {
        //         ...state,
        //         loading: false,
        //         resetDone: true,
        //         // message: action.payload.message
        //     }

        // case RESET_PASSWORD_REJECTED:
        //     return {
        //         ...state,
        //         loading: false,
        //         resetDone: false,
        //         // message: "Sorry No User Found"
        //     }



        case CREATE_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ACCOUNT_FULFILLED:
            return {
                ...state,
                loading: false,
                created: true,
            }

        case CREATE_ACCOUNT_REJECTED:
            return {
                ...state,
                loading: false,
                created: false,
                errorMsg: action.payload.response
            }

        default:
            return state;
    }
};

export default authReducer;