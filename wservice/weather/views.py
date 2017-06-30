from rest_framework import viewsets
from weather.models import City
from weather.serializers import CitySerializer
from rest_framework.response import Response
from rest_framework.decorators import detail_route
from weather.utils import GetCurrentWeather, GetForecast

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
        """
        API to get the weather
        :param request:
        :param pk:
        :return:
        """
        city = self.get_object()
        json = GetCurrentWeather(city.city)
        return Response({'city': city.city, 'weather': json})

    @detail_route(methods=['get'])
    def get_forecast(self, request, pk=None):
        """
        API to get the Forecast
        :param request:
        :param pk:
        :return:
        """
        city = self.get_object()
        json = GetForecast(city.city, 5)
        return Response({'city': city.city, 'forecast': json})
