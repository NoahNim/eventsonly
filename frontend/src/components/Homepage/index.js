import React from 'react';
import './homepage.css'

function Home() {
    return (
        <dive className="home-container">
            <div className="homepage-container">
                <div className="logo-home">
                    <img alt="logo" src="https://prject-omega-events.s3.us-west-2.amazonaws.com/Events+Only.png"></img>
                </div>
                <div className="home-info">
                    <p>Are you tired of trying to find events on sites like Facebook and Twitter, only to be flooded with a news feed that's unrelated? A news feed full of people posting what you consider to be nonsense and arguing. You only wish that you could find an event you and your friends are interested in, and connecting with them! Well now you can, with Events Only!</p>
                </div>
            </div>
        </dive>
    )
}

export default Home;