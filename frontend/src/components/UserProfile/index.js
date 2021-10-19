import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, Link } from 'react-router-dom';
import { getUser } from "../../store/user";
import './UserProfile.css'

function UserProfile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(getUser(id))
    }, [dispatch, id])

    const profileUser = useSelector((state) => state.users.user)
    
    console.log('THIS IS USER', profileUser);



    return (
        <div>
            <img alt="user" src={profileUser?.profilePhoto}></img>
            <h2>{profileUser?.username}</h2>
            <h3>{profileUser?.firstName} {profileUser?.lastName}</h3>
            <p>{profileUser?.biography}</p>
        </div>
    )
}

export default UserProfile