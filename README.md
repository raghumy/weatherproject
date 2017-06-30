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
One piece of configuration is to add the host for the API requests in 
src/App.js. This will be moved to a configuration parameter.

### Running Instructions
Run `npm start` to start the application

