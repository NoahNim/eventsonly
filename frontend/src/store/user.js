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

        console.log('THIS IS DATA IN USER STORE', data)
        
        return dispatch(load(data))
    }
}

//edit user thunk
export const editUser = (id, user) => async (dispatch) => {
    const { username, email, password, firstName, lastName, biography, profilePhoto } = user;

    const res = await csrfFetch(`/api/users/${id}/edit`, {
        method: "PUT",
        body: JSON.stringify({
            username,
            email,
            password,
            firstName,
            lastName,
            biography,
            profilePhoto,
        }),
    });

    if (res.ok) {
        const data = await res.json();
        return dispatch(edit(data));
    }
}


//REDUCER

const initialState = {}

const users = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOAD:
            newState = Object.assign({}, { user: action.user });
            return newState;
        case EDIT:
            newState = { ...state[action.user.id] }
            return newState;
        default:
            return state;
    }
}

export default users;