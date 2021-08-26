// TYPE CONSTANTS
const LOAD = "events/load";
const ADD = "events/add";
const EDIT = "events/edit";
const REMOVE = "events/remove";

// ACTION CREATORS
//LOAD Events
const load = (event) => ({
    type: LOAD,
    event
})

//ADD Event
const add =  (event) => ({
    type: ADD,
    event
})

//EDIT Event
const edit = (event) => ({
    type: EDIT.
    event
})

// REMOVE Event
const remove = (event) => ({
    type: REMOVE,
    event
})

//THUNKS

//Get events thunk
const getEvents = () => async (dispatch) => {
    const res = await fetch("/api/events/");

    if (res.ok) {
        const data = await res.json();

        const { events } = data;
        dispatch(load(events));
    }
}

const initialState = {}

const eventsReducer = (state = initialState, action) => {

}