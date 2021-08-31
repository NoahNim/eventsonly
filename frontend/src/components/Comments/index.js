import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { getComments, deleteComment } from "../../store/comment";
// import './CommentsStyling';

function Comment() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state?.comments);
    const commentsArray = Object.values(comments);
    
    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id])

    
    return (
        <div>
            <Link to={`${id}/comment/new`}><button>New Comment</button></Link>
            <ul>
                {commentsArray?.map(comment => {
                    if (comment?.eventId === parseInt(id)) {
                        const deleteCommentHandler = async () => {
                            console.log('DELETE COMMENT HANDLER EVENT ID', id)
                            console.log('DELETE COMMENT HANDLER COMMENT ID', comment.id)
                            await dispatch(deleteComment(id, comment.id))
                        }
                        return (
                            <div>
                                <li>{comment.content}</li>
                                <div>
                                    <Link to={`${id}/comment/${comment.id}/edit`}><button>Edit   </button></Link>
                                    <Link><button onClick={deleteCommentHandler}>Delete</button></Link>
                                </div>
                            </div>
                        )
                    }
                })}
            </ul>
       </div>
    )
}

export default Comment;