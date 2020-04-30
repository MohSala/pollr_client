import {
    ADD_POLL_ACTION_TYPES,
    GET_MY_POLL_ACTION_TYPES,
    ADD_CANDIDATE_ACTION_TYPES,
    GET_CANDIDATES_ACTION_TYPES
} from "../actions/actionTypes";

const {
    ADD_POLL_FUFILLED, ADD_POLL_REJECTED, ADD_POLL_REQUEST
} = ADD_POLL_ACTION_TYPES;

const {
    GET_MY_POLL_FUFILLED, GET_MY_POLL_REJECTED, GET_MY_POLL_REQUEST
} = GET_MY_POLL_ACTION_TYPES

const {
    ADD_CANDIDATE_FUFILLED, ADD_CANDIDATE_REJECTED, ADD_CANDIDATE_REQUEST
} = ADD_CANDIDATE_ACTION_TYPES

const {
    GET_CANDIDATES_FUFILLED, GET_CANDIDATES_REJECTED, GET_CANDIDATES_REQUEST
} = GET_CANDIDATES_ACTION_TYPES

const initialState = {
    loading: false,
    created: false,
    fetched: false,
    data: null,
    candidate: null,
    candidates: null,
    approved: false,
    errorMsg: null,

}

const dashReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_POLL_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ADD_POLL_FUFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload,
                created: true
            }

        case ADD_POLL_REJECTED:
            return {
                ...state,
                loading: false,
                created: false,
                errorMsg: action.payload.response
            }

        case GET_MY_POLL_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_MY_POLL_FUFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload,
                fetched: true
            }

        case GET_MY_POLL_REJECTED:
            return {
                ...state,
                loading: false,
                fetched: false,
                errorMsg: action.payload.response
            }

        case ADD_CANDIDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ADD_CANDIDATE_FUFILLED:
            return {
                ...state,
                loading: false,
                candidate: action.payload,
                created: true
            }

        case ADD_CANDIDATE_REJECTED:
            return {
                ...state,
                loading: false,
                created: false,
                errorMsg: action.payload.response
            }

        case GET_CANDIDATES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_CANDIDATES_FUFILLED:
            return {
                ...state,
                loading: false,
                candidates: action.payload,
                fetched: true
            }

        case GET_CANDIDATES_REJECTED:
            return {
                ...state,
                loading: false,
                fetched: false,
                errorMsg: action.payload.response
            }

        default:
            return state;
    }
};

export default dashReducer;