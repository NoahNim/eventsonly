# Events Only

## About
Events Only is a website for creating, viewing, and commenting on upcoming events. The live server is hosted here: https://events-only.herokuapp.com/events

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
