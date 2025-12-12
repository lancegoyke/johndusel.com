from django.conf import settings
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("backside/", admin.site.urls),
    path("api/", include("blog.urls")),
    path("", include("uploads.urls")),
]

if settings.DEBUG:
    urlpatterns.append(path("__debug__/", include("debug_toolbar.urls")))
