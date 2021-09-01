import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
const LOAD = "events/load";
// const LOADEVENT = "events/loadevent"
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

// EDIT Event
const edit = (event) => ({
    type: EDIT,
    event,
})

// REMOVE Event
const remove = (event) => ({
    type: REMOVE,
    event
})

//LOAD Event
// const loadevent = (eventId) => ({
//     type: LOADEVENT,
//     eventId
// })

//THUNKS

//Get events thunk
export const getEvents = () => async (dispatch) => {
    const res = await fetch("/api/events/");

    if (res.ok) {
        const data = await res.json();

        const { events } = data;
        return dispatch(load(events));
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
        return dispatch(add(event));
    }
}

//Edit Event
export const editEvent = (id, eventData) => async (dispatch) => {
    const { name, description, date, eventPhoto, userId } = eventData;
    const res = await csrfFetch(`/api/events/${id}/edit/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, description, date, eventPhoto, userId })
    })

    if (res?.ok) {
        const event = await res?.json();
        return dispatch(edit(event));
    }
}

//Delete Event
export const deleteEvent = (id) => async (dispatch) => {
    const eventRes = await csrfFetch(`/api/events/${id}/`);
    const event = await eventRes.json();

    const res = await csrfFetch(`/api/events/${id}/`, {
        method: 'DELETE',
    });

    if (res.ok) {
        dispatch(remove(event));
    }
}


const initialState = {}

const events = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allEvents = {}
            action.event.forEach((event) => (allEvents[event.id] = event))
            return {
                ...allEvents,
                ...state
            }
        case ADD:
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                }
                return newState
            }
            break;
        case EDIT:
            const newState = { ...state[action.event.id] }
            return newState
        case REMOVE:
            const newerState = {
                ...state?.events?.filter((event) => event !== action.event)
            }
            return newerState
        default:
            return state;
    }
}

export default events