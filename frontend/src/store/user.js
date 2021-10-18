import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const LOAD = "users/load";
const REMOVE = "users/delete";
const EDIT = "users/edit";

//ACTION CREATORS

const load = (user) => ({
    type: LOAD,
    user
})

const remove = (user) => ({
    type: REMOVE,
    user
})

const edit = (user) => ({
    type: EDIT,
    user
})

const initialState = {}

const users = (state = initialState, action) => {

}

export default users;