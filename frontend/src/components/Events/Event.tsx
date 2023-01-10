import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { getEvents, deleteEvent } from '../../store/event';
import Comment from '../Comments';

function Event() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const events = useSelector((state) => state?.events);
    const eventsArray = Object.values(events);
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch])

    const deleteEventHandler = async () => {
        await dispatch(deleteEvent(id))
        history.push('/events')
    }

    // function deleteAlert() {
    //     // if(window.confirm('Are you sure you wish to delete this?')){
    //     //     deleteEventHandler()
    //     // }
    //     return (
    //         <DeleteEventComponent />
    //     )
    // }



    return (
        <div className="events-page">
            <ul>
                {eventsArray?.map((event) => {
                    if (event?.id === parseInt(id)) {

                        let newDate = event?.date.toLocaleString().split(/\D/).slice(0, 3).map(num => num.padStart(2, "0")).join("/")
                        return (
                            <div>
                                <div className="total-event-container">
                                    <div className="single-event">
                                        <li key={event?.eventPhoto} className="event-li"><img className="single-event-image" height="500" width="500" alt="eventphoto" src={event?.eventPhoto}></img></li>
                                        <h2 key={event?.name} className="event-li">{event?.name}</h2>
                                        <h3 key={event?.date} className="event-li">{newDate}</h3>
                                        <li key={event?.description} className="event-li event-description"><p>{event?.description}</p></li>
                                    </div>
                                    {
                                        sessionUser?.id === event?.userId ? <div className="event-buttons" >
                                            <Link to={`/events/${event.id}/edit`}><button className="event-button event-edit"> [\] Edit</button></Link>
                                            <button className="event-button event-delete" onClick={deleteEventHandler}> - Delete</button>
                                        </div>
                                            : null
                                    }
                                </div>
                            </div>
                        )
                    }
                })}
            </ul>
            <div>
                <Comment />
            </div>
        </div >
    )
}

export default Event;