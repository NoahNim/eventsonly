import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { getEvents } from "../../store/event";
import './EventsStyling.css';

function EventsManager() {
    // const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const events = useSelector((state) => state?.events);
    const eventsArray = Object.values(events);

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    console.log(useSelector((state) => state?.events))

    console.log('THIS IS THE EVENTS VAR', eventsArray)

    return (
        <div className="events-page">
            <div><Link to="/events/new"><button>New Event</button></Link></div>
            <div className="events-list-container">
            <ul className="events-list">
                {
                    eventsArray?.map(event => {
                        return (
                            <div className="event-container">
                                <li key={event.name}>{event.name}</li>
                                <Link key={event.id} to={`/events/${event?.id}`}> <img key={event.eventPhoto} alt="eventPhoto" src={event?.eventPhoto} height="250" width="250"></img></Link>
                            </div>
                        )
                    })
                }
                </ul>
            </div>
        </div>
    )
}

export default EventsManager