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
        <div className="total-user-page">
            <div className="user-profile">
                <img alt="user" src={profileUser?.profilePhoto} className="profile-photo" height="500" width="500"></img>
                <h2 className="profile-username">{profileUser?.username}</h2>
                <h3 className="profile-name">{profileUser?.firstName} {profileUser?.lastName}</h3>
                <p className="profile-bio">{profileUser?.biography}</p>
            </div>
            {sessionUser?.id === profileUser?.id ? <div className="profile-buttons">
                <Link to={`${profileUser.id}/edit`}><button className="event-button event-edit">Edit</button></Link>
            </div>
                : null}
        </div>
    )
}

export default UserProfile