import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editUser } from "../../store/user";

function UserEdit() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const profileUser = useSelector((state) => state.users.user)
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [biography, setBiography] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            let res = dispatch(editUser(id, { email, username, password, firstName, lastName, biography, profilePhoto }))
                .catch(async (res) => {
                    const data = await res?.json();
                    if (data && data.errors) setErrors(data.errors);
                });
            
            if (res) {
              return history.push(`/users/${id}`)
            }
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    };


    return (
        <>
            <div className="signup-container">
                <h1>Edit User</h1>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <ul className="signup-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label className="signup-label email-signup">
                        Email
                    </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="signup-label">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label className="signup-label">
                        First Name
                    </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <label className="signup-label">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <label className="signup-label">
                        Biography
                    </label>
                    <textarea
                        type="text"
                        value={biography}
                        onChange={(e) => setBiography(e.target.value)}
                        required
                    ></textarea>
                    <label className="signup-label">
                        Profile Photo URL
                    </label>
                    <input
                        type="text"
                        value={profilePhoto}
                        onChange={(e) => setProfilePhoto(e.target.value)}
                        required
                    />
                    <label className="signup-label">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label className="signup-label confirm-pass">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="signup-button" type="submit">Edit User</button>
                </form>
            </div>
        </>
    );
}

export default UserEdit;