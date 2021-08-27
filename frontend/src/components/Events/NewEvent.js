import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
// import { useHistory } from 'react-router-dom';
import { createEvent } from '../../store/event';
import { Redirect } from 'react-router';

function CreateEvent() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [eventPhoto, setEventPhoto] = useState("");
    const [errors, setErrors] = useState([]);
    // const eventState = useSelector((state) => state.events)
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser) return <Redirect to="/events" />;

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors([]);

        const userId = sessionUser.id

        const payload = {
            name,
            description,
            date,
            eventPhoto,
            userId
        }

        const eventSubmit = await dispatch(createEvent(payload))
            .catch(async (res) => {
                const data = await res?.json();
                setErrors(data?.errors);
            });
        
        console.log(eventSubmit)
        
        if (eventSubmit) {
            return <Redirect to="/events" />
        }
    }

    if (sessionUser) {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <ul>
                            {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <label>Event Name</label>
                    <input
                        type="test"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // required
                    ></input>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <label>Date</label>
                    <input
                        type="date"
                        min="2021-01-31"
                        max="2099-12-31"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    >
                    </input>
                    <label className="signup-label">
                        Profile Photo URL
                    </label>
                    <input
                        type="text"
                        value={eventPhoto}
                        onChange={(e) => setEventPhoto(e.target.value)}
                        // required
                    />
                    <button type="submit">Create</button>
                </form>
            </div>
        )
    }

    return null
}

export default CreateEvent