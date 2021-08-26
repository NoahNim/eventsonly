import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function CreateEvent() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState();

    const sessionUser = useSelector((state) => state.session.user);
    console.log('THIS IS THE USER ID', sessionUser.id)

    if (sessionUser) {
        return (
            <form>
                this will be a form
            </form>
        )
    }

    return null
}

export default CreateEvent