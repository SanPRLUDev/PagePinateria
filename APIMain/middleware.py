# middleware.py
class AuthCookieMiddleware:
    """
    Middleware que setea la cookie JWT después del login
    """
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        response = self.get_response(request)
        
        # Si hay un token pendiente en la sesión, setearlo como cookie
        if 'pending_auth_token' in request.session:
            token = request.session.pop('pending_auth_token')
            
            response.set_cookie(
                "jwt",
                token,
                secure=False,       # Cambiar a True en producción con HTTPS
                httponly=True,      # No accesible desde JavaScript
                samesite='Lax',     # Protección CSRF
            )
            
            print(f"Cookie JWT seteada exitosamente")
        
        return response