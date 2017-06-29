from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from weather.models import City
from weather.utils import GetCurrentWeather

class CitySerializer(serializers.ModelSerializer):
    def validate_city(self, value):
        print('Getting JSON for {}'.format(value))
        json = GetCurrentWeather(value)
        print(json)
        if json:
            if 'city' in json:
                return "{},{}".format(json['city']['name'], json['city']['country'])
            elif 'name' in json:
                return json['name']

        raise serializers.ValidationError("Cannot validate city name")

    class Meta:
        model = City
        fields = ('id', 'user', 'city')
        validators = [
            UniqueTogetherValidator(
                queryset=City.objects.all(),
                fields=('user', 'city'),
                message='This city already exists for this user',
            )
        ]