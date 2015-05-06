# NoShed-Server
A simple to mobile app to provide load-shedding information. Built using the MEAN stack with Ionic Framework and Apache Cordova for the front-end website and Android version.

It is a simple Node.js server using Express. Whenever a GET call is made to /status the server will query the the current loadshedding status from http://loadshedding.eskom.co.za/LoadShedding/GetStatus. The server will then return the loadshedding status to the client.

### Usage
Open the root folder of the repo and run:
* `npm install`
* `npm start`

### Environments
There are 2 environments configured in the `/config` folder. These define the database to log to. 

The default environment is `dev` less the environment variable `NODE_ENV` is present.

* `dev` logs to `mongodb://localhost:27107/NoShedDb` unless the environment variable `NOSHED_DB_DEV` is present. If it is present, it will use the environment variable as the connection string.
* `prod` logs to the value set in the environment variable `NOSHED_DB`.

### Logging
The program will log all requests to /status to a MongoDB database using the schema defined in `/models/log.model.js`.