# Weather Webservice

This Django project provides a REST API for the weather service.

### Architecture
This project uses standard Django user model. It creates one table that contains
cities for each user.

It uses openweathermap.org as a provider for weather API's. This API 
provides both current weather and forecasts.

User provisioning is thru Django. Users will need to be authenticated
to make requests. 
Authentication can be thru JWT, Session or Basic.

#### Routes
The following routes are exposed
* `/users`: Access to the user system
* `/cities`: Get list of cities for logged in user
* `/cities/<city_id>/get_weather`: Get current weather for the city
* `/cities/<city_id>/get_forecast`: Get weather forecast for the city

### Installation instructions

1. Install Python 3.x
2. Create Virtual Env
3. Source Virtual Env
4. Install the following python packages
```
pip install django
pip install djangorestframework
pip install markdown       # Markdown support for the browsable API.
pip install django-filter  # Filtering support
pip install django-cors-headers
```

### Configuration instructions

Run the following command to configure the database

`python manage.py migrate`

The following configurations in Django settings need to be modified

MAP_API_KEY: Key to access API's from Weather Provider

ALLOWED_HOSTS : Add Hosts that can access Django

### Running instructions

`python manage.py runserver`

