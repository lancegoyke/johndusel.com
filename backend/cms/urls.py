from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path("backside/", admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/", include("blog.urls")),
    path("", include("uploads.urls")),
]
