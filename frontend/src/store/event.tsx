import { LOADIPHLPAPI } from "dns";
import { Dispatch } from "redux";
import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
type LOAD = "events/load";
// const LOADEVENT = "events/loadevent"
type ADD = "events/add";
type EDIT = "events/edit";
type REMOVE = "events/remove";

// ACTION CREATORS
//LOAD Events
interface load {
    type: LOAD,
    event: any
}

//ADD Event
interface add {
    type: ADD,
    event: any
}

// EDIT Event
interface edit {
    type: EDIT,
    event: any
}

// REMOVE Event
interface remove {
    type: REMOVE,
    event: any
}

type Action = add | edit | remove

//LOAD Event
// const loadevent = (eventId) => ({
//     type: LOADEVENT,
//     eventId
// })

//THUNKS

//Get events thunk
export const getEvents = () => async (dispatch: Dispatch<Action>) => {
    const res = await fetch("/api/events/");

    if (res.ok) {
        const data = await res.json();

        const { events } = data;

        const loadData: load = {
            type: "events/load",
            event: events
        }

        return dispatch(loadData.event);
    }
}

//Create an event

export const createEvent = (eventData: Object) => async (dispatch: Dispatch<Action>) => {
    const res = await csrfFetch("/api/events/new/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData)
    })

    if (res.ok) {
        const event = await res.json();

        const addData: add = {
            type: "events/add",
            event: event
        }

        return dispatch(addData.event);
    }
}

//Edit Event
export const editEvent = (id, eventData) => async (dispatch: Dispatch<Action>) => {
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
export const deleteEvent = (id) => async (dispatch: Dispatch<Action>) => {
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