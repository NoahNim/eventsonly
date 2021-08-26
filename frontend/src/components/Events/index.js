import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../store/event";

function EventsManager() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const events = useSelector((state) => state?.events);
    const eventsArray = Object.values(events);

    useEffect(() => {
        dispatch(getEvents())
    }, [dispatch])

    console.log(useSelector((state) => state?.events))

    console.log('THIS IS THE EVENTS VAR', eventsArray)

    return (
        <div>
            <ul>
                {
                    eventsArray?.map(event => {
                        return (
                            <div>
                                <img alt="eventPhoto" src={event.eventPhoto} height="250" width="250"></img>
                            </div>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default EventsManager