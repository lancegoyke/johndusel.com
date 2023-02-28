from django.conf import settings
from django.conf.urls.static import static
from django.urls import path

from . import views


urlpatterns = [
    path("upload/", views.upload_image, name="upload"),
]

if settings.DEBUG:
    # Serve media files from development server
    # https://docs.djangoproject.com/en/4.1/howto/static-files/#serving-static-files-during-development
    # https://docs.djangoproject.com/en/4.1/howto/static-files/#serving-files-uploaded-by-a-user-during-development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
