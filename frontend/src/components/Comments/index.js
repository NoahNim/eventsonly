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
            <Link to={`${id}/comment/new`}><button className="new-comment-button">New Comment</button></Link>
            <ul>
                {commentsArray?.map(comment => {
                    console.log('USER STUFF', comment?.User)
                    if (comment?.eventId === parseInt(id)) {
                        const deleteCommentHandler = async () => {
                            await dispatch(deleteComment(id, comment.id))
                        }
                        return (
                            <div className="comment-div">
                                <p className="comment-name">{comment?.User?.firstName} {comment?.User?.lastName}</p>
                                <li>{comment?.content}</li>
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