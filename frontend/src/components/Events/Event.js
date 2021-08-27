import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { getEvents } from '../../store/event';

function Event() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const events = useSelector((state) => state?.events);
    const eventsArray = Object.values(events);

    useEffect(() => {
        // console.log('DISPATCH WORKING!!!')
        dispatch(getEvents());
    }, [dispatch])

    console.log(eventsArray);

    console.log('params id', id)

    return (
        <div>
            <ul>
                {eventsArray?.map((event) => {
                    if (event?.id === parseInt(id)) {
                        return (
                            <div>
                                <li><img src={event?.eventPhoto}></img></li>
                                <li>{event?.name}</li>
                                <li>{event?.description}</li>
                                <li>{event?.date}</li>
                                <Link to={`/events/${event.id}/edit`}><button>Edit</button></Link>
                            </div>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default Event;