from django.db import transaction
from rest_framework import generics, serializers
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.exceptions import InvalidToken, AuthenticationFailed
from store.models import Product
from .models import Cart, Order, OrderItem
from .serializers import CartSerializer, OrderSerializer
class AddToCartView(generics.CreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    

class OrderListCreateView(generics.ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        ).prefetch_related("items__product")

    def create(self, request, *args, **kwargs):
        products = request.data.get("items")

        if not isinstance(products, list) or not products:
            return Response(
                {"error": "Your order must contain at least one product."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            with transaction.atomic():
                order_items = []
                total = 0

                for item in products:
                    product_id = item.get("product")
                    quantity = item.get("quantity")

                    if (
                        not isinstance(product_id, int)
                        or isinstance(product_id, bool)
                        or not isinstance(quantity, int)
                        or isinstance(quantity, bool)
                        or quantity < 1
                    ):
                        return Response(
                            {"error": "Each item needs a valid product ID and positive quantity."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                    product = Product.objects.select_for_update().filter(
                        pk=product_id
                    ).first()

                    if product is None:
                        return Response(
                            {"error": f"Product {product_id} was not found."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                    if quantity > product.stock:
                        return Response(
                            {"error": f"Not enough stock for {product.name}."},
                            status=status.HTTP_400_BAD_REQUEST,
                        )

                    total += product.price * quantity
                    order_items.append((product, quantity))

                order = Order.objects.create(
                    user=request.user,
                    total_price=total,
                )

                for product, quantity in order_items:
                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=quantity,
                        price=product.price,
                    )

                    product.stock -= quantity
                    product.save(update_fields=["stock"])

            serializer = self.get_serializer(order)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        except (TypeError, ValueError, AttributeError):
            return Response(
                {"error": "Invalid order data."},
                status=status.HTTP_400_BAD_REQUEST,
            )
