import {
    ADD_POLL_ACTION_TYPES,
    GET_MY_POLL_ACTION_TYPES,
    ADD_CANDIDATE_ACTION_TYPES,
    GET_CANDIDATES_ACTION_TYPES,
    GET_POLLS_ACTION_TYPES,
    ADD_VOTE_ACTION_TYPES,
    GET_A_CANDIDATE_ACTION_TYPES,
    GET_POLL_VOTES_ACTION_TYPES
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

const {
    GET_POLLS_FUFILLED, GET_POLLS_REJECTED, GET_POLLS_REQUEST
} = GET_POLLS_ACTION_TYPES

const {
    ADD_VOTE_FUFILLED, ADD_VOTE_REJECTED, ADD_VOTE_REQUEST
} = ADD_VOTE_ACTION_TYPES

const {
    GET_A_CANDIDATE_FUFILLED, GET_A_CANDIDATE_REJECTED, GET_A_CANDIDATE_REQUEST
} = GET_A_CANDIDATE_ACTION_TYPES

const {
    GET_POLL_VOTES_FUFILLED, GET_POLL_VOTES_REJECTED, GET_POLL_VOTES_REQUEST
} = GET_POLL_VOTES_ACTION_TYPES

const initialState = {
    loading: false,
    created: false,
    fetched: false,
    data: null,
    polls: null,
    votes: null,
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

        case GET_POLLS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_POLLS_FUFILLED:
            return {
                ...state,
                loading: false,
                polls: action.payload,
                fetched: true
            }

        case GET_POLLS_REJECTED:
            return {
                ...state,
                loading: false,
                fetched: false,
                errorMsg: action.payload.response
            }

        case ADD_VOTE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case ADD_VOTE_FUFILLED:
            return {
                ...state,
                loading: false,
                data: action.payload,
                created: true
            }

        case ADD_VOTE_REJECTED:
            return {
                ...state,
                loading: false,
                created: false,
                errorMsg: action.payload.response
            }

        case GET_A_CANDIDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_A_CANDIDATE_FUFILLED:
            return {
                ...state,
                loading: false,
                candidate: action.payload,
                fetched: true
            }

        case GET_A_CANDIDATE_REJECTED:
            return {
                ...state,
                loading: false,
                fetched: false,
                errorMsg: action.payload.response
            }

        case GET_POLL_VOTES_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_POLL_VOTES_FUFILLED:
            return {
                ...state,
                loading: false,
                votes: action.payload,
                fetched: true
            }

        case GET_POLL_VOTES_REJECTED:
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