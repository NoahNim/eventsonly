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

//EDIT Event
const edit = (event) => ({
    type: EDIT,
        event
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

//Get event thunk
// export const getEvent = (id) => async (dispatch) => {
//     const res = await fetch(`/api/events/${id}/`);

//     console.log('RES IN GET EVENT', res)
//     if (res.ok) {
//         const data = await res.json();
//         console.log('DATA IN GET EVENT THUNK', data)

//         const { event } = data;
//         return dispatch(loadevent(event));
//     }
// }

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
    const { name, description, date, eventPhoto } = eventData;
    const res = await csrfFetch(`/api/events/${id}/edit/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, description, date, eventPhoto })
    })

    if (res.ok) {
        const event = await res.json();
        return dispatch(edit(event));
    }
}

//Delete Event
export const deleteEvent = (id) => async (dispatch) => {
    const eventRes = await csrfFetch(`/api/events/${id}/`);
    const event = await eventRes.json();

    const res = await csrfFetch(`/api/events/${id}/delete/`, {
        method: 'DELETE'
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
        case EDIT:
            const newState = {
                ...state
            }
            return newState 
        default:
            return state;
    }
}

export default events