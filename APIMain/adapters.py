from django.shortcuts import redirect
from allauth.account.adapter import DefaultAccountAdapter
from .utils import GenerateJWT


class MyAccountAdapter(DefaultAccountAdapter):
    """
    Adapter para login/registro tradicional
    """
    
    def login(self, request, user):
        """
        Se ejecuta después del login tradicional.
        Guardamos el token en sesión para setearlo después con middleware.
        """
        request.session['pending_auth_token'] = GenerateJWT(user)
        print(f"Token generado para: {user.username}")
        return super().login(request, user)
    
    def get_login_redirect_url(self, request):
        """
        Redirige después de login tradicional
        """
        return '/api/Probes/'
    
    def get_signup_redirect_url(self, request):
        """
        Redirige después de registro
        """
        return '/api/Probes/'