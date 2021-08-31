import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createComment } from "../../store/comment";
import { Redirect } from 'react-router';

function CreateComment() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams();

    if (!sessionUser) return <Redirect to="/events" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const userId = sessionUser.id

        const eventId = Number(id);

        console.log('THIS IS THE EVENT ID', eventId)

        const payload = {
            content,
            userId,
            eventId
        }

        console.log('PAYLOAD FOR NEW COMMENT', payload)

        const commentSubmit = await dispatch(createComment(eventId, payload))
            .catch(async (res) => {
                const data = await res?.json();
                console.log('NEW COMMENT RES.JSON DATA', data);
                setErrors(data?.errors)
            })
        
        if (commentSubmit) {
            history.push(`/events/${eventId}`)
        }
    }

    if (sessionUser) {
        return (
            <div className="new-event-container">
                <h2>Create Comment</h2>
                <form className="new-event-form" onSubmit={handleSubmit}>
                    <div className="new-event-div errors">
                        <ul>
                            {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <div className="new-event-div">
                        <label>Your Comment</label>
                        <input
                            type="test"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className="new-event-button new-event-creator">Create</button>
                </form>
            </div>
        )
    }
}

export default CreateComment