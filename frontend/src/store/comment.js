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

export const getComments = (id) => async (dispatch) => {
    const res = await fetch(`/events/:eventId/${id}`);

    if (res.ok) {
        const data = await res.json();

        const { comments } = data;
        return dispatch(load(comments))
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
        case default:
            return state;
    }
}