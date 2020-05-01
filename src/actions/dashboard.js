import axios from 'axios';

import {
    ADD_POLL_ACTION_TYPES,
    GET_MY_POLL_ACTION_TYPES,
    ADD_CANDIDATE_ACTION_TYPES,
    GET_CANDIDATES_ACTION_TYPES,
    GET_POLLS_ACTION_TYPES
} from "./actionTypes";

const {
    ADD_POLL_FUFILLED, ADD_POLL_REJECTED, ADD_POLL_REQUEST
} = ADD_POLL_ACTION_TYPES

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


const BASE_URL = "http://127.0.0.1:7500";

//THUNKS
const addPoll = (data) => {
    return async (dispatch) => {
        dispatch(addPollRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/createPoll`,
                data,
                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(addPollFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(addPollRejected(e));
        }
    };
};

const getMyPoll = (data) => {
    return async (dispatch) => {
        dispatch(getMyPollRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/myPolls?id=${data}`,

                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(getMyPollFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(getMyPollRejected(e));
        }
    };
};

const addCandidate = (data) => {
    return async dispatch => {
        dispatch(addCandidateRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/addCandidate`,
                data,
                {
                    headers: {
                        //         Authorization: token,
                        "Content-Type": "application/json"
                    }
                }
            );
            return dispatch(addCandidateFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(addCandidateRejected(e));
        }
    }
}

const getCandidates = (data) => {
    return async (dispatch) => {
        dispatch(getCandidatesRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/loadCandidates?id=${data}`,

                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(getCandidatesFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(getCandidatesRejected(e));
        }
    };
};

const getPolls = (data) => {
    return async (dispatch) => {
        dispatch(getPollsRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/polls?page=${data}`,

                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(getPollsFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(getPollsRejected(e));
        }
    };
};



// ACTION CREATORS

const addPollRequest = () => ({
    type: ADD_POLL_REQUEST,
});

const addPollFufilled = data => ({
    type: ADD_POLL_FUFILLED,
    payload: data
});

const addPollRejected = data => ({
    type: ADD_POLL_REJECTED,
    payload: data
});

const getMyPollRequest = () => ({
    type: GET_MY_POLL_REQUEST,
});

const getMyPollFufilled = data => ({
    type: GET_MY_POLL_FUFILLED,
    payload: data
});

const getMyPollRejected = data => ({
    type: GET_MY_POLL_REJECTED,
    payload: data
});

const addCandidateRequest = () => ({
    type: ADD_CANDIDATE_REQUEST,
});

const addCandidateFufilled = data => ({
    type: ADD_CANDIDATE_FUFILLED,
    payload: data
});

const addCandidateRejected = data => ({
    type: ADD_CANDIDATE_REJECTED,
    payload: data
});

const getCandidatesRequest = () => ({
    type: GET_CANDIDATES_REQUEST,
});

const getCandidatesFufilled = data => ({
    type: GET_CANDIDATES_FUFILLED,
    payload: data
});

const getCandidatesRejected = data => ({
    type: GET_CANDIDATES_REJECTED,
    payload: data
});

const getPollsRequest = () => ({
    type: GET_POLLS_REQUEST,
});

const getPollsFufilled = data => ({
    type: GET_POLLS_FUFILLED,
    payload: data
});

const getPollsRejected = data => ({
    type: GET_POLLS_REJECTED,
    payload: data
});


export { addPoll, getMyPoll, addCandidate, getCandidates, getPolls };