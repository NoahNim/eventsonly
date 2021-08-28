import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../../store/event';

function Event() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const events = useSelector((state) => state?.events);
    const eventsArray = Object.values(events);

    useEffect(() => {
        // console.log('DISPATCH WORKING!!!')
        dispatch(getEvents());
    }, [dispatch])

    console.log(eventsArray);

    console.log('params id', id)

    const deleteEventHandler = async () => {
        // const eventId = parseInt(id);
        await dispatch(deleteEvent(id))

        history.push('/events')
    }

    return (
        <div className="events-page">
            <ul>
                {eventsArray?.map((event) => {
                    if (event?.id === parseInt(id)) {
                        return (
                            <div>
                            <div className="single-event">
                                <li className="event-li"><img height="500" width="500" alt="eventphoto" src={event?.eventPhoto}></img></li>
                                <h2 className="event-li">{event?.name}</h2>
                                <li className="event-li">{event?.description}</li>
                                <li className="event-li">{event?.date}</li>
                                </div>
                                <div className="event-buttons">
                                    <Link to={`/events/${event.id}/edit`}><button className="event-button">Edit</button></Link>
                                    <button className="event-button" onClick={deleteEventHandler}>Delete</button>
                                </div>
                            </div>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default Event;