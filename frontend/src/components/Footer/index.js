import React from 'react';
import './footer.css'

function Footer() {
    return (
        <div className="footer">
            <ul className="footer-list">
                <li>Created by: Noah Medoff <a target="https://www.linkedin.com/in/noah-medoff-6a5490116/" href="https://www.linkedin.com/in/noah-medoff-6a5490116/">LinkedIn <img alt="linkedin" src="https://prject-omega-events.s3.us-west-2.amazonaws.com/linkedin-208-916919.png"></img></a></li>
                <li><a target="https://github.com/NoahNim/eventsonly" href="https://github.com/NoahNim/eventsonly">GithHub <img alt="github" src="https://prject-omega-events.s3.us-west-2.amazonaws.com/github.png"></img></a></li>
            </ul>
        </div>
    )
}

export default Footer

// target =“_blank"