import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { getComments, deleteComment } from "../../store/comment";
import './CommentsStyling.css';

function Comment() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state?.comments);
    const commentsArray = Object.values(comments);
    const sessionUser = useSelector((state) => state.session.user);
    
    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id])

    
    return (
        <div className="all-comments-div">
            {
               sessionUser ? <Link to={`${id}/comment/new`}><button className="new-comment-button">New Comment</button></Link> : null
            }
            <ul>
                {commentsArray?.map(comment => {
                    if (comment?.eventId === parseInt(id)) {
                        const deleteCommentHandler = async () => {
                            if (sessionUser?.id === comment?.userId) {
                                await dispatch(deleteComment(id, comment.id))
                            }
                        }
                        return (
                            <div className="comment-div">
                                <p key={comment?.User?.content} className="comment-name">{comment?.User?.firstName} {comment?.User?.lastName}</p>
                                <li key={comment?.content}>{comment?.content}</li>
                                {
                                    sessionUser?.id === comment?.userId ?  <div className="comment-buttons">
                                        <Link to={`${id}/comment/${comment?.id}/edit`}><button className="comment-button comment-edit" >Edit</button></Link>
                                        <Link><button className="comment-button comment-delete" onClick={deleteCommentHandler}>Delete</button></Link>
                                    </div>
                                        : null
                                }
                            </div>
                        )
                    }
                })}
            </ul>
       </div>
    )
}

export default Comment;