from django.contrib.auth.models import User
from rest_framework import viewsets
from wservice.serializers import UserSerializer

def jwt_response_payload_handler(token, user=None, request=None):
    """
    This method adds the token and the user to the reponse after
    a user logs in
    :param token:
    :param user:
    :param request:
    :return:
    """
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer