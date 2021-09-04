import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { editEvent, getEvents } from '../../store/event';
import { Redirect } from 'react-router';

function EditEvent() {
    const { id } = useParams();

    useEffect(() => {
        dispatch(getEvents)
    })

    const events = useSelector((state) => state.events);
    const eventsArray = Object.values(events);

    const currentEvent = eventsArray.filter((event) => event.id === Number(id))
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState(currentEvent[0]?.name);
    const [description, setDescription] = useState(currentEvent[0]?.description);
    const [date, setDate] = useState("");
    const [eventPhoto, setEventPhoto] = useState(currentEvent[0]?.eventPhoto);
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser || sessionUser.id !== currentEvent[0]?.userId) return <Redirect to="/events" />;



    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([]);

        const userId = sessionUser.id

        const eventId = Number(id)

        const payload = {
            name,
            description,
            date,
            eventPhoto,
            userId,
            eventId
        }

        const eventSubmit = await dispatch(editEvent(eventId, payload))
            .catch(async (res) => {
                const data = await res?.json();
                setErrors(data?.errors);
            });

        if (eventSubmit) {
            history.push(`/events/${eventId}`)
        }
    }


    return (
        <div className="new-event-container">
            <h2>Editing Event</h2>
            <form className="new-event-form" onSubmit={handleSubmit}>
                <div className="new-event-div errors">
                    <ul>
                        {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                </div>
                <div className="new-event-div">
                    <label>Event Name</label>
                    <input
                        type="test"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    // required
                    ></input>
                </div>
                <div className="new-event-div">
                    <label>Description</label>
                    <textarea
                        className="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="new-event-div">
                    <label>Date</label>
                    <input
                        type="date"
                        min="2021-01-31"
                        max="2099-12-31"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    >
                    </input>
                </div>
                <div className="new-event-div">
                    <label className="signup-label">
                        Event Photo URL
                    </label>
                    <input
                        type="text"
                        value={eventPhoto}
                        onChange={(e) => setEventPhoto(e.target.value)}
                    // required
                    />
                </div>
                <div className="event-container">
                    <Link to={`/events/${id}`}><button className="new-event-button new-event-creator">Cancel</button></Link>
                    <button className="new-event-button new-event-creator" type="submit">Edit</button>
                </div>
            </form>
        </div>
    )
}

export default EditEvent;