from django.conf.urls import url
from weather import views

urlpatterns = [
    url(r'^city/$', views.city_list),
    url(r'^city/(\d+)/$', views.city_detail),
]