"""
Este archivo configura la aplicación Django para que pueda ser ejecutada 
por un servidor compatible con WSGI (Web Server Gateway Interface). WSGI 
es el estándar que permite que servidores web (como Gunicorn, uWSGI o 
Apache) se comuniquen con aplicaciones Python.
"""

#Modulo para el sistema operativo, se usa para manejar variables
#de entorno, y saber que archivo de configuracion debe de cargar
import os   
    
#Funcion que crea el objeto WSGI que representa la apliacion 
#en Django , basicmanete es el objeto que el servidor va a ejecutar        
from django.core.wsgi import get_wsgi_application

#Se define la variable de entorno "DJANGO_SETTINGS_MODULE" y se le asigna
#'mainProject.settings' esto con el fin de asignar a Django que es el 
#archivo de configuracion o settings 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mainProject.settings')

#Crea la aplicacion WSGI real, la cual inicializa Django, carga las
#configuraciones, prepara los middlewares y deja lista la app 
#para recibir peticiones o requests
application = get_wsgi_application()
