from django.urls import path
from .views import MarketView, ProductFilterView, product_filter_view


urlpatterns = [
    path('', MarketView, name="mainPage"),
    path('market-search/', product_filter_view, name="market-search"),
    path('market-search/api/', ProductFilterView.as_view(), name='market-search-api'),
    
]