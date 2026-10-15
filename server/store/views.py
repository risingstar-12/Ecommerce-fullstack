# from django.shortcuts import render
from rest_framework import generics
from .models import Product
from .serializers import ProductSerializer

# Create your views here.
class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        queryset = Product.objects.all()
        
        brand = self.request.query_params.get("brand")
        category = self.request.query_params.get('category')
        color = self.request.query_params.get("color")
        min_price = self.request.query_params.get("min_price")
        max_price = self.request.query_params.get("max_price")
        
        if brand:
            queryset = queryset.filter(brand=brand)

        if category:
            queryset = queryset.filter(category=category)
            
        if color:
            queryset = queryset.filter(color=color)

        if min_price:
            queryset = queryset.filter(price__gte=min_price)

        if max_price:
            queryset = queryset.filter(price__lte=max_price)    

        return queryset
    
class ProductDetail(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer    