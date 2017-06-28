from django.db import models
from django.conf import settings


# Create your models here.


class City(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    city = models.CharField(max_length=200)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('user', 'created',)
