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