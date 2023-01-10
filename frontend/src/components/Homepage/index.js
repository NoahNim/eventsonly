import React from 'react';
import './homepage.css'
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Home() {
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser) return <Redirect to="/events" />;

    return (
        <div className="home-container">
            <div className="logo-container">
                <div className="logo-home">
                    <Link to="/events"> <img alt="logo" src="https://prject-omega-events.s3.us-west-2.amazonaws.com/Events+Only.png"></img></Link>
                </div>
            </div>
            <div className="home-info">
                <p>Are you tired of trying to find events on sites like Facebook and Twitter, only to be flooded with a news feed that's unrelated? A news feed full of people posting what you consider to be nonsense and arguing. You only wish that you could find an event you and your friends are interested in, and connect with them! Well now you can, with Events Only!</p>
                <p></p>
                <p>To get started click the logo and see a list of events!</p>
            </div>
        </div>
    )
}

export default Home;