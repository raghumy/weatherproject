from django.test import TestCase
from weather.utils import GetCurrentWeather, GetForecast

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
