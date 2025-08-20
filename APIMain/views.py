from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.http import JsonResponse

from .utils import RequireVerification, GenerateJWT 

class LoginPageView(APIView):
    def get(self, request):
        return render(request, 'login.html')
    
    def post(self, request):
        username = request.data.get("Username")
        password = request.data.get("Password")
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token = GenerateJWT(user)
            response = Response({"message":"Usuario Logeado con exito", "redirect":"/api/products/"}, status=status.HTTP_200_OK)
            response.set_cookie("jwt",token,secure=True,httponly=True,samesite="Lax")
        
            return response
        return Response({"error":"Usuario No Logeado", "redirect":"/api/login/"}, status=status.HTTP_400_BAD_REQUEST)
       
class RegisterView(APIView):
    def get(self, request):
        return render(request, "register.html")
    
    def post(self, request):
        password1 = request.data["Password1"]
        password2 = request.data["Password2"]
        username = request.data["Username"]
        email = request.data["email"]
        
        IsExist = User.objects.filter(username = username).exists()
        
        if password1 != password2:
            return Response({"error":"Las claves deben de ser iguales","redirect": "/api/register/"}, status=status.HTTP_400_BAD_REQUEST)
        
        if IsExist:
             return Response({"error":"Este usuario ya existe","redirect": "/api/register/"}, status=status.HTTP_400_BAD_REQUEST)
        
            
        user = User.objects.create_user(username=username, email=email, password=password1)
        login(request, user)
        
        return Response({"message":"Usuario creado correctamente", "redirect": "/api/Probes/"}, status=status.HTTP_200_OK)
    
class CreateProductView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    
    def get(self, request):
        isSessionId = request.user.is_authenticated
        isJWT = RequireVerification(request)
            
        if not (isSessionId and isJWT):
           return redirect("login")
        else:
            return render(request, "createProduct.html")  
   
    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductPagination(PageNumberPagination):
    page_size = 4 
    page_size_query_param = 'page_size'  # Permite cambiar el tamaño en la URL
    max_page_size = 4  # Tamaño máximo permitido
    
    
class ProductListView(APIView):
    pagination_class = ProductPagination
    
    def get(self, request):
        products = Product.objects.all()
        paginator = self.pagination_class()
        paginated_products = paginator.paginate_queryset(products, request, view=self)
        serializer = ProductSerializer(paginated_products, many=True)
        return Response({
            'count': paginator.page.paginator.count,
            'next': paginator.get_next_link(),
            'previous': paginator.get_previous_link(),
            'results': serializer.data
        }, status=status.HTTP_200_OK)
        
    def delete(self, request):     
        if not request.user.is_authenticated:
            return Response({"error": "No estás autenticado"}, status=status.HTTP_403_FORBIDDEN)

        product_id = request.data.get("id")

        if not product_id:
            return Response({"error": "El id es requerido"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            product = Product.objects.get(id=product_id)
            
            if product.image:
                product.image.delete(save=False)
                
            product.delete()
            
            return Response({"Producto eliminado con exito"}, status=status.HTTP_204_NO_CONTENT)

        except Product.DoesNotExist:
            return Response({'error': 'Producto no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        

def ViewProducts(request):
    
    isSessionId = request.user.is_authenticated
    isJWT = RequireVerification(request)
    
    if not (isSessionId and isJWT):
        return redirect("login")   
    else: 
        return render(request, "ViewProduct.html")
  
def LogoutView(request):
    logout(request)
    response = JsonResponse({"message":"Logout exitoso", "redirect":"/api/login/"}, status=status.HTTP_200_OK)
    response.delete_cookie("jwt")
    return response
    


            
