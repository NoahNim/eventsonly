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

//THUNKS


//get user thunk
export const getUser = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}`);

    if (res.ok) {
        const data = await res.json();

        const { user } = data;
        return dispatch(load(user))
    }
}


//REDUCER

const initialState = {}

const users = (state = initialState, action) => {

}

export default users;