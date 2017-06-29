from django.test import TestCase
from weather.utils import GetCurrentWeather

# Create your tests here.
class UtilsTestCase(TestCase):

    def test_GetCurrentWeather(self):
        json = GetCurrentWeather('Austin,TX')
        self.assertIsNotNone(json)
        self.assertIsNotNone(json['name'])
        self.assertIsNotNone(json['main'])
        self.assertIsNotNone(json['main']['temp'])
        self.assertIsNotNone(json['main']['humidity'])
