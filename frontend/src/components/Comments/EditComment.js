import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { editComment, getComments } from "../../store/comment";
import { Redirect } from 'react-router';


function EditComment() {
    const { id, eventId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments(eventId));
    }, [dispatch, eventId])

    const history = useHistory();
    const comments = useSelector((state) => state.comments)
    const commentsArray = Object.values(comments)
    const currentComment = commentsArray.filter((comment) => comment.id === Number(id))
    let currentCommentCheck = currentComment[0] !== undefined ? currentComment[0].content : "";
    const [content, setContent] = useState(currentCommentCheck)
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);

    if (!sessionUser || sessionUser.id !== currentComment[0]?.userId) return <Redirect to="/events" />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionUser.id

        const payload = {
            content,
            userId,
            eventId
        }

        const commentSubmit = await dispatch(editComment(eventId, id, payload))
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
                <h2>Edit Comment</h2>
                <form className="new-event-form" onSubmit={handleSubmit}>
                    <div className="new-event-div errors">
                        <ul>
                            {errors?.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    </div>
                    <div className="new-event-div">
                        <label>Your Comment</label>
                        <textarea
                            type="test"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="new-event-button new-event-creator">Edit</button>
                </form>
            </div>
        )
    }
}

export default EditComment