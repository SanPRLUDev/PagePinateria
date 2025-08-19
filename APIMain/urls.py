from django.urls import path
from .views import LoginPageView, ProductListView, CreateProductView, ViewProducts,LogoutView, RegisterView

urlpatterns = [
    path('login/', LoginPageView.as_view(), name="login"),
    path('register/', RegisterView.as_view(), name="register"),
    path('Probes/', CreateProductView.as_view(), name='Probes'),
    path('products/', ViewProducts, name='products'),
    path('logout/', LogoutView, name='logout'),
    path('list-products/', ProductListView.as_view(), name='list-products'),
    
]