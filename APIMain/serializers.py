from rest_framework import serializers
from .models import Product
from django.conf import settings

class ProductSerializer(serializers.ModelSerializer):
    
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'description','category' ,'price', 'stock', 'image', 'image_url', 'date_creation'] # Include all fields of model 'Products'
        
    def get_image_url(self, obj):
        if obj.image:
            return settings.MEDIA_URL + str(obj.image)
        
        