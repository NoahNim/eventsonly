import { csrfFetch } from "./csrf";

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
const add = (event) => ({
    type: ADD,
    event
})

//EDIT Event
// const edit = (event) => ({
//     type: EDIT.
//         event
// })

// REMOVE Event
const remove = (event) => ({
    type: REMOVE,
    event
})

//THUNKS

//Get events thunk
export const getEvents = () => async (dispatch) => {
    const res = await fetch("/api/events/");

    if (res.ok) {
        const data = await res.json();

        const { events } = data;
        dispatch(load(events));
    }
}

//Create an event

export const createEvent = (eventData) => async (dispatch) => {
    const res = await csrfFetch("/api/events/new/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData)
    })

    if (res.ok) {
        const event = await res.json();
        console.log('EVENT IN THUNK', event)
        return dispatch(add(event));
    }
}

//Edit Event
export const editEvent = (id, eventData) => async (dispatch) => {
    const res = await csrfFetch("/api/events/new/", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id, eventData)
    })

    if (res.ok) {
        const event = await res.json();
        return dispatch(add(event));
    }
}


const initialState = {}

const events = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allEvents = {}
            action.event.forEach((event) => (allEvents[event.id] = event))
            // console.log(allEvents)
            return {
                ...allEvents,
                ...state
            }
        case ADD:
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                    [action.event.id]: action.event.id
                }
                return { ...newState }
            }
            break;
        default:
            return state;
    }
}

export default events