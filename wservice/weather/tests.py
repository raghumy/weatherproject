from django.test import TestCase
from weather.utils import GetCurrentWeather, GetForecast
from django.test import Client
from django.contrib.auth.models import User

# Create your tests here.
class UtilsTestCase(TestCase):

    def test_GetCurrentWeather(self):
        json = GetCurrentWeather('Austin,TX')
        self.assertIsNotNone(json)
        self.assertIsNotNone(json['name'])
        self.assertIsNotNone(json['main'])
        self.assertIsNotNone(json['main']['temp'])
        self.assertIsNotNone(json['main']['humidity'])

    def test_GetForecast(self):
        json = GetForecast('Austin,TX', 5)
        self.assertIsNotNone(json)
        self.assertIsNotNone(json['city'])
        self.assertIsNotNone(json['list'])
        self.assertEqual(len(json['list']), 5)


class APITestCase(TestCase):

    def setUp(self):
        # Every test needs a client.
        self.client = Client()

        self.user = User.objects.create_user(username='testuser', password='12345')
        login = self.client.login(username='testuser', password='12345')

    def tearDown(self):
        self.client.logout()


    def testCreateDestroyCity(self):
        response = self.client.post('/cities/', {'city': 'Austin', 'user': self.user.id})
        self.assertEqual(response.status_code, 201)

        response = self.client.get('/cities/')
        self.assertEqual(response.status_code, 200)
        json = response.json()
        self.assertEqual(len(json), 1)
        city = json[0]
        self.assertEqual(city['city'], 'Austin')

        response = self.client.get('/cities/{}/get_weather/'.format(city['id']))
        self.assertEqual(response.status_code, 200)
        json = response.json()
        self.assertIsNotNone(json['weather'])
        self.assertIsNotNone(json['weather']['main'])
        self.assertIsNotNone(json['weather']['main']['temp'])
        #data.weather.main.temp

        response = self.client.get('/cities/{}/get_forecast/'.format(city['id']))
        self.assertEqual(response.status_code, 200)
        json = response.json()
        self.assertIsNotNone(json['forecast'])
        self.assertIsNotNone(json['forecast']['list'])
        list = json['forecast']['list']
        self.assertEqual(len(list), 5)

        response = self.client.delete('/cities/{}/'.format(city['id']))
        self.assertEqual(response.status_code, 204)
