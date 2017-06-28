from rest_framework import viewsets
from weather.models import City
from weather.serializers import CitySerializer
from rest_framework.response import Response
from rest_framework.decorators import detail_route
import requests


class CityViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def list(self, request):
        print("User {}".format(request.user.id))
        queryset = City.objects.filter(user=request.user.id)
        serializer = CitySerializer(queryset, many=True)
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def get_weather(self, request, pk=None):
        city = self.get_object()
        json = ""
        if city is not None:
            url = "http://api.openweathermap.org/data/2.5/weather?q={}&appid=e4477fc92eef09040b204c7974cec7e1&units=imperial".format(
                city.city)
            resp = requests.get(url)
            if resp.status_code == 200:
                json = resp.json()
        return Response({'city': city.city, 'weather': json})
