import { csrfFetch } from "./csrf";

//TYPE CONSTANTS
const LOAD = "comments/load";
const ADD = "comments/add";
const EDIT = "comments/edit";
const REMOVE = "comments/remove";

//ACTION CREATORS

//LOAD Comments
const load = (comment) => ({
    type: LOAD,
    comment
})

//ADD Comments
const add = (comment) => ({
    type: ADD,
    comment
})

//EDIT Comment
const edit = (comment) => ({
    type: EDIT,
    comment,
})

//REMOVE Comment

const remove = (comment) => ({
    type: REMOVE,
    comment
})


//Thunks

//Get comment thunk
export const getComments = (id) => async (dispatch) => {
    const res = await fetch(`/api/events/${id}/comments'`);

    if (res.ok) {
        const data = await res.json();

        const { comments } = data;
        return dispatch(load(comments))
    }
}

//New comment thunk

export const createComment = (id, commentData) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${id}/comment/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData)
    })

    if (res.ok) {
        const comment = await res.json();

        return dispatch(add(comment))
    }
}

// Edit Comment 
export const editComment = (eventId, commentId, commentData) => async (dispatch) => {
    const res = await csrfFetch(`/api/events/${eventId}/comment/${commentId}/edit`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData)
    })

    if (res.ok) {
        const comment = await res.json();

        return dispatch(edit(comment));
    }
}

//Delete Comment

export const deleteComment = (eventId, commentId) => async (dispatch) => {
    const commentRes = await csrfFetch(`/api/events/${eventId}/comment/${commentId}`, {
        method: 'DELETE'
    })

    if (commentRes.ok) {
        const comment = await commentRes?.json();
        dispatch(remove(comment))
    }
}


const initialState = {}

const comments = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allComments = {}
            action.comment.forEach((comment) => (allComments[comment.id] = comment))
            return {
                ...allComments,
            }
        case ADD:
            if (!state[action.comment.id]) {
                const newState = {
                    ...state,
                }
                return newState;
            }
            break;
        case EDIT:
            const newState = { ...state[action.comment.id] }
            return newState
        case REMOVE:
            let stateArray = Object.values(state)
            const newerState = {
                ...stateArray?.filter((comment) => comment.id !== action.comment.id)
            }
            return newerState
        default:
            return state;
    }
}

export default comments