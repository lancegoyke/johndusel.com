from django.contrib import admin
from django.urls import path, include


def trigger_error(request):
    division_by_zero = 1 / 0

urlpatterns = [
    path("backside/", admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path("api/", include("blog.urls")),
    path("sentry-debug/", trigger_error),
    path("", include("uploads.urls")),
]
