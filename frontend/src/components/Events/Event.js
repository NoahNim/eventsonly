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
        <div>
            <ul>
                {eventsArray?.map((event) => {
                    if (event?.id === parseInt(id)) {
                        return (
                            <div>
                                <li><img alt="eventphoto" src={event?.eventPhoto}></img></li>
                                <li>{event?.name}</li>
                                <li>{event?.description}</li>
                                <li>{event?.date}</li>
                                <Link to={`/events/${event.id}/edit`}><button>Edit</button></Link>
                                <button onClick={deleteEventHandler}>Delete</button>
                            </div>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default Event;