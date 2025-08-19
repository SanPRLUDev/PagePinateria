import jwt
import datetime


def GenerateJWT(user):
    """
    Genera un JWT para el usuario autenticado, apartir de un payload con el nombre de usuario
    y su id, ademas con una sesion de una hora.
    
    Parámetros:
        user (User): Instancia del objeto de usuario autenticado.
    
    Retorna:
        str: Token JWT encriptado.
    """
    
    now = datetime.datetime.utcnow()
    
    payload ={
        "id": user.id,
        "username": user.username,
        "iat": now,
        "exp": now+datetime.timedelta(hours=1),
    }
    
    token = jwt.encode(payload, "ItsTimeToCreate", algorithm="HS256")
    
    return token
    
def RequireVerification(request):
    
    """
    Verifica la validez del usuario por medio de una cookie con el JWT.
    
    Parámetros:
        request(HttpRequest): Peticion HTTP.
        
    Retorna:
        bool: True si es valido, False si no es valido.
    
    """
    
    token = request.COOKIES.get("jwt")
    if not token:
        return False
    
    payload = jwt.decode(token, "ItsTimeToCreate", algorithms=["HS256"])
    
    if not payload:
        return False
    
    if request.user.id != payload["id"]:
        return False
    
    if request.user.username != payload["username"]:
        return False
    
    return True