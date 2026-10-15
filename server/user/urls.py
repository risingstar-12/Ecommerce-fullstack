
from django.urls import path, include
from .views import register, login

urlpatterns = [
    path('auth/register/',  register),
    path('auth/login/', login),
]
