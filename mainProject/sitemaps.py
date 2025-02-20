from django.contrib.sitemaps import Sitemap
from django.urls import reverse

class StaticViewSitemap(Sitemap):
    priority = 0.5  # Nivel de importancia de la página (1.0 = más importante)
    changefreq = 'daily'  # Cada cuánto cambia la página (daily, weekly, monthly)

    def items(self):
        return [
            'login', 'register', 'Probes', 'products', 'logout', 'list-products',
            'mainPage', 'market-search', 'market-search-api'
        ]  # Nombres de las vistas

    def location(self, item):
        return reverse(item)
