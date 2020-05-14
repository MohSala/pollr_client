import axios from 'axios';

import {
    ADD_POLL_ACTION_TYPES,
    GET_MY_POLL_ACTION_TYPES,
    ADD_CANDIDATE_ACTION_TYPES,
    GET_CANDIDATES_ACTION_TYPES,
    GET_POLLS_ACTION_TYPES,
    ADD_VOTE_ACTION_TYPES,
    GET_A_CANDIDATE_ACTION_TYPES,
    GET_POLL_VOTES_ACTION_TYPES,
    DELETE_POLL_ACTION_TYPES,
    SEARCH_POLL_ACTION_TYPES
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

const {
    ADD_VOTE_FUFILLED, ADD_VOTE_REJECTED, ADD_VOTE_REQUEST
} = ADD_VOTE_ACTION_TYPES

const {
    GET_A_CANDIDATE_FUFILLED, GET_A_CANDIDATE_REJECTED, GET_A_CANDIDATE_REQUEST
} = GET_A_CANDIDATE_ACTION_TYPES

const {
    GET_POLL_VOTES_FUFILLED, GET_POLL_VOTES_REJECTED, GET_POLL_VOTES_REQUEST
} = GET_POLL_VOTES_ACTION_TYPES

const {
    DELETE_POLL_FUFILLED, DELETE_POLL_REJECTED, DELETE_POLL_REQUEST
} = DELETE_POLL_ACTION_TYPES

const {
    SEARCH_POLL_REQUEST, SEARCH_POLL_FUFILLED, SEARCH_POLL_REJECTED
} = SEARCH_POLL_ACTION_TYPES


const BASE_URL = "https://pollur-api-imdjxr5ywq-ez.a.run.app";

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

const addVote = (data) => {
    return async (dispatch) => {
        dispatch(addVoteRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/vote`,
                data,
                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(addVoteFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(addVoteRejected(e));
        }
    };
};

const getACandidate = (data, payload) => {
    return async (dispatch) => {
        dispatch(getACandidateRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/getCandidate?userId=${data}&pollId=${payload}`,

                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(getACandidateFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(getACandidateRejected(e));
        }
    };
};

const getPollVotes = (data) => {
    return async (dispatch) => {
        dispatch(getPollVotesRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/votes?pollId=${data}`,

                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(getPollVotesFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(getPollVotesRejected(e));
        }
    };
};

const searchPolls = (data) => {
    return async (dispatch) => {
        dispatch(searchPollsRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.get(
                `${BASE_URL}/search?query=${data}`,

                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(searchPollsFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(searchPollsRejected(e));
        }
    };
};

const deletePoll = (data) => {
    return async (dispatch) => {
        dispatch(deletePollRequest());
        try {
            // const token = localStorage.getItem("token");
            const response = await axios.post(
                `${BASE_URL}/delete`,
                data,
                // {
                //     headers: {
                //         Authorization: token
                //     }
                // }
            );
            return dispatch(deletePollFufilled(response));
        } catch (e) {
            console.log(e);
            dispatch(deletePollRejected(e));
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

const getACandidateRequest = () => ({
    type: GET_A_CANDIDATE_REQUEST,
});

const getACandidateFufilled = data => ({
    type: GET_A_CANDIDATE_FUFILLED,
    payload: data
});

const getACandidateRejected = data => ({
    type: GET_A_CANDIDATE_REJECTED,
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

const addVoteRequest = () => ({
    type: ADD_VOTE_REQUEST,
});

const addVoteFufilled = data => ({
    type: ADD_VOTE_FUFILLED,
    payload: data
});

const addVoteRejected = data => ({
    type: ADD_VOTE_REJECTED,
    payload: data
});

const getPollVotesRequest = () => ({
    type: GET_POLL_VOTES_REQUEST,
});

const getPollVotesFufilled = data => ({
    type: GET_POLL_VOTES_FUFILLED,
    payload: data
});

const getPollVotesRejected = data => ({
    type: GET_POLL_VOTES_REJECTED,
    payload: data
});

const deletePollRequest = () => ({
    type: DELETE_POLL_REQUEST,
});

const deletePollFufilled = data => ({
    type: DELETE_POLL_FUFILLED,
    payload: data
});

const deletePollRejected = data => ({
    type: DELETE_POLL_REJECTED,
    payload: data
});

const searchPollsRequest = () => ({
    type: SEARCH_POLL_REQUEST,
});

const searchPollsFufilled = data => ({
    type: SEARCH_POLL_FUFILLED,
    payload: data
});

const searchPollsRejected = data => ({
    type: SEARCH_POLL_REJECTED,
    payload: data
});




export { addPoll, getMyPoll, addCandidate, getCandidates, getPolls, addVote, getACandidate, getPollVotes, deletePoll, searchPolls };