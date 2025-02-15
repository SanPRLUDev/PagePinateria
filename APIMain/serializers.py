from rest_framework import serializers
from .models import Product
from django.conf import settings

class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'price', 'stock', 'image', 'image_url', 'date_creation']

    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url  # ✅ Cloudinary devuelve la URL completa
        return None  # Si no hay imagen, retorna None o una imagen por defecto

        
        