import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { getComments } from "../../store/comment";
// import './CommentsStyling';

function Comment() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const comments = useSelector((state) => state?.comments);

    console.log(comments)

    
    useEffect(() => {
        dispatch(getComments(id));
    }, [dispatch, id])
    
    return (
        <h1>COMMENT COMPONENT RENDERS</h1>
    )
}

export default Comment;