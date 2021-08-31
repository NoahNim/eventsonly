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
            <Link to={`${id}/comment/new`}><button>New Comment</button></Link>
            <ul>
                {commentsArray?.map(comment => {
                    if (comment?.eventId === parseInt(id)) {
                        console.log(comment?.userId)
                        return (
                            <div>
                                <li>{comment.content}</li>
                                <div>
                                    <Link to={`${id}/comment/${comment.id}/edit`}><button>Edit   </button></Link>
                                    <Link><button>Delete</button></Link>
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