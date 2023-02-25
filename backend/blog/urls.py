from django.urls import path

from .views import (
    PostListAPIView,
    PostListByCategoryAPIView,
    PostListLatestAPIView,
    PostDetailAPIView,
)


urlpatterns = [
    path(
        "posts/category/<str:category_slug>/",
        PostListByCategoryAPIView.as_view(),
        name="posts_by_category",
    ),
    path("posts/latest/", PostListLatestAPIView.as_view(), name="posts_latest"),
    path("posts/<str:slug>/", PostDetailAPIView.as_view(), name="post_detail"),
    path("posts/", PostListAPIView.as_view(), name="posts"),
]
