from django.urls import path
from .views import AddToCartView,OrderListCreateView

urlpatterns = [
    path('cart/', AddToCartView.as_view()),
    path('orders/', OrderListCreateView.as_view()),
]