from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from weather.models import City

class CitySerializer(serializers.ModelSerializer):
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