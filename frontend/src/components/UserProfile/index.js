import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { getUser } from "../../store/user";
import './UserProfile.css'

function UserProfile() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(id))
    }, [id])

    return (
        <div>
            USER PROFILE GOES HERE
        </div>
    )
}

export default UserProfile