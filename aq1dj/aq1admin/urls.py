from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView
from django.conf.urls import url
import aq1manage.views as views

urlpatterns = [
    url(r"^api/compute", views.compute),
]