import { LOADIPHLPAPI } from "dns";
import { Dispatch } from "redux";
import { csrfFetch } from "./csrf";

// TYPE CONSTANTS
// type LOAD = "events/load";
// const LOADEVENT = "events/loadevent"
// type ADD = "events/add";
// type EDIT = "events/edit";
// type REMOVE = "events/remove";

// ACTION CREATORS
//LOAD Events
interface load {
    type: "events/load",
    event: Object
}

//ADD Event
interface add {
    type: "events/add",
    event: any
}

// EDIT Event
interface edit {
    type: "events/edit",
    event: any
}

// REMOVE Event
interface remove {
    type: "events/remove",
    event: any
}

type Action = load | add | edit | remove

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

        return dispatch(loadData);
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

const events = (state = initialState, action: Action) => {
    switch (action.type) {
        case "events/load":
            const allEvents: Object = {}
            action.event.forEach((event: load["event"]) => (allEvents[event.id] = event))
            return {
                ...allEvents,
                ...state
            }
        case "events/add":
            if (!state[action.event.id]) {
                const newState = {
                    ...state,
                }
                return newState
            }
            break;
        case "events/edit":
            const newState = { ...state[action.event.id] }
            return newState
        case "events/remove":
            const newerState = {
                ...state?.events?.filter((event) => event !== action.event)
            }
            return newerState
        default:
            return state;
    }
}

export default events