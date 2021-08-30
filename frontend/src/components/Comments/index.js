import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { getComments } from "../../store/comment";
// import './CommentsStyling';

function Comment() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state?.comments);
    const commentsArray = Object.values(comments);

    console.log(commentsArray)
    
    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id])
    
    return (
        <div>
            <ul>
                {commentsArray?.map(comment => {
                    if (comment?.eventId === parseInt(id)) {
                        return (
                            <li>{comment.content}</li>
                        )
                    }
                })}
            </ul>
       </div>
    )
}

export default Comment;