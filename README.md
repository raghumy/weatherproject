# Weather Application

This application enables the tracking of weather by city and get forecast.
The application is in two parts:

## Weather Service
The weather service is a REST API that serves as a backend.
It uses Django REST Framework.

For Installation Instructions for the service see the README in the
wservice directory.

## Weather App
The weather app is a REACT.js application served thru a 
minimal node.js server. It uses semantic ui for css.

### Installation Instructions

* Install node - v6 or later
* Make sure you are in the wui directory
* Run `npm install` to install all dependencies

### Configuration Instructions
Before starting the application export the following
environment variable
`REACT_APP_REST_HOST=http://<public_host>:8000`

This will cause react to use this URL for REST api

### Running Instructions
Run `npm start` to start the application

