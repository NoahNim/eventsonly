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
    const res = await fetch(`/api/events/${id}/comment/new`, {
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


const initialState = {}

const comments = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allComments = {}
            action.comment.forEach((comment) => (allComments[comment.id] = comment))
            return {
                ...allComments,
                ...state
            }
        case ADD:
            if (!state[action.comment.id]) {
                const newState = {
                    ...state,
                }
                return newState;
            }
            break;
        default:
            return state;
    }
}

export default comments