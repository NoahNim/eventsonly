import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/event";

function EventsManager() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events)

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])
}