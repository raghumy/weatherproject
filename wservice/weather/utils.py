import requests
from django.conf import settings

def GetCurrentWeather(city):
    json = ""
    if city is not None:
        url = "http://api.openweathermap.org/data/2.5/weather?q={}&appid={}&units=imperial".format(
           city, settings.MAP_API_KEY)
        print('Calling {}'.format(url))
        resp = requests.get(url)
        print(resp)
        if resp.status_code == 200:
            json = resp.json()
    return json
