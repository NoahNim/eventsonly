# Events Only

## About
Events Only is a fullstack web application for creating, viewing, and commenting on upcoming events. The live server is hosted here: https://events-only.herokuapp.com/events. It uses React and NodeJS/Express to accomplsh this goal.


## At a Glance


<img width="1280" alt="SpashPage" src="https://user-images.githubusercontent.com/8650503/131809404-f24e8c8d-c938-41ef-8ff4-a2814665b76b.png">

Users can see here a list of current and upcoming events posted to the app on the ```/events``` route and create new events.

<img width="1278" alt="Events" src="https://user-images.githubusercontent.com/8650503/131810456-4722da82-5c9b-4ef6-8d3e-69719e802a62.png">

On an event page displayed on ```/events/:id``` users can see the event info.

<img width="1260" alt="Event" src="https://user-images.githubusercontent.com/8650503/131810429-d858ae86-5aab-45b8-9fd4-b703f940b72a.png">

## Application Architecture

As noted, Events Only is a full stack application.

React Front End ----> Express BackEnd ----> PostgresSQL Database

- The React front end uses a Redux store for state management and API calls. It uses JSX and CSS to display the UI to the user.
- The Express back end fetches data from the PostgresSQL database using express router.
- The PostgresSQL Database is four tables Users, Events, Comments, and RSVP's.


## Technologies used
- React
- Express
- PostgresSQL
- JavaScript

## Final Thoughts and Next Steps

This was my first completed solo full stack application using my own ideas. It was a very rewarding experience and I learned a lot from it. My next steps are likely going to be to refactor a lot of code to make it more optimal, though it works for a project and use case of this scale.

# Set Up for Local Hosting

## Installation

### Pulling from Github
To get this on your local machine, do the following:
```
git pull https://github.com/NoahNim/eventsonly.git
```
### Installing dependencies

In the ```/EventsOnly/``` directory, run the following command:
```
npm install
```
Then in the ```/backend/``` directory run:
``` 
npm install 
```
Then in the ```/frontend/``` directory run:
```
npm install
```

### Setting up the database
In the ```/backend/``` directory create a file named ```.env```, then put the following in (you can name your database whatever you want and give it whatever password and token you want):
```
DB_USERNAME = dbownerhere
DB_PASSWORD = putpasswordhere
DB_DATABASE = databasenamehere
DB_HOST = localhost
JWT_SECRET = jwtsecrethere
JWT_EXPIRES_IN = 604500
```
Then in the ```/backend/``` directory run the following command (note you may or may not need to use dotenv) to migrate the database tables:
``` 
npx dotenv sequelize-cli db:migrate
```
Then in the ```/backend/``` directory run the following command to seed your database with information.
```
npx sequelize-cli db:seed:all
```

## Starting up on localhost

To get the machine hosted on do the following:
In the ```/backend``` directory run the following command:
```
npm start
```
In the ```/frontend/``` directory run the following command:
```
npm start
```
The website should then be on http://localhost:3000/
