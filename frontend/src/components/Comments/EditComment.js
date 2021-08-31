import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom'
import { createComment } from "../../store/comment";
import { Redirect } from 'react-router';


function EditComment() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [content, setContent] = useState("")
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);
    const { id } = useParams();

    if (!sessionUser) return <Redirect to="/events" />;

    function handleSubmit() {

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
                        <input
                            type="test"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        ></input>
                    </div>
                    <button type="submit" className="new-event-button new-event-creator">Edit</button>
                </form>
            </div>
        )
    }
}

export default EditComment