import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function CreateEvent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date());
    const [eventPhoto, setEventPhoto] = useState("");

    const sessionUser = useSelector((state) => state.session.user);
    console.log('THIS IS THE USER ID', sessionUser.id)



    if (sessionUser) {
        return (
            <div>
            <form>
                <label>Event Name</label>
                    <input
                        type="test"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
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
                </form>
            </div>
        )
    }

    return null
}

export default CreateEvent