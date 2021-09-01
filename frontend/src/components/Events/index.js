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


    console.log(useSelector((state) => state?.events))

    console.log('THIS IS THE EVENTS VAR', eventsArray)

    return (
        <div className="events-page">
            {
                sessionUser ? <div><Link to="/events/new"><button className="new-event-button">+ New Event +</button></Link></div> : null
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