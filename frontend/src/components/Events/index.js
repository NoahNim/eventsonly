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
    const sessionUser = useSelector((state) => state.session.user);


    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    return (
        <div className="events-page">
            <h5>Here is is a list of upcoming events! Click on an event you're interested in!</h5>
            {
                sessionUser ? <div className="new-event-info">
                    <h5>If you wish to create a new event click the New Event button!</h5>
                    <Link to="/events/new"><button className="new-event-button">+ New Event +</button></Link></div> : null
            }
            <div className="events-list-container">
                <ul className="events-list">
                    {
                        eventsArray?.map(event => {
                            return (
                                <div className="event-container">
                                    <h5 className="event-name" key={event.name}>{event.name}</h5>
                                    <Link className="event-image-link" key={event.id} to={`/events/${event?.id}`}> <img className="event-image" key={event.eventPhoto} alt="eventPhoto" src={event?.eventPhoto} height="250" width="250"></img></Link>
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