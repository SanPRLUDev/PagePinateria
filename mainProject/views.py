from django.contrib.sitemaps.views import sitemap

def custom_sitemap_view(request, sitemaps):
    response = sitemap(request, sitemaps)
    response["X-Robots-Tag"] = "index, follow"  # Quitamos noindex
    return response
