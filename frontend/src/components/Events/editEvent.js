import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getEvents } from '../../store/event';
import { Redirect } from 'react-router';

function EditEvent() {
    return (
        <h1> THIS RENDERS </h1>
    )
}

export default EditEvent;