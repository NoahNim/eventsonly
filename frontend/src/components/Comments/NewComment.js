import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom'
import { createComment } from "../../store/comment";
import { Redirect } from 'react-router';

function CreateComment() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);
    const { id, eventId } = useParams();

    if (!sessionUser) return <Redirect to="/events" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const userId = sessionUser.id

        const eventId = Number(id);

        const payload = {
            content,
            userId,
            eventId
        }

        const commentSubmit = await dispatch(createComment(id, payload))
            .catch(async (res) => {
                const data = await res?.json();
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
                        <label className="new-comment-label">Your Comment</label>
                        <div>
                            <textarea
                                className="comment-content-input"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="event-container">
                        <Link to={`/events/${id}`}><button className="new-event-button new-event-creator cancel">Cancel</button></Link>
                        <button type="submit" className="new-event-button new-event-creator">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateComment