from django.urls import path

from .views import (
    CategoryDetailAPIView,
    PostListAPIView,
    PostListByCategoryAPIView,
    PostListLatestAPIView,
    PostDetailAPIView,
    CategoryListAPIView,
)


urlpatterns = [
    path(
        "categories/<str:slug>/",
        CategoryDetailAPIView.as_view(),
        name="category_detail",
    ),
    path(
        "posts/category/<str:category_slug>/",
        PostListByCategoryAPIView.as_view(),
        name="posts_by_category",
    ),
    path("posts/latest/", PostListLatestAPIView.as_view(), name="posts_latest"),
    path("posts/<str:slug>/", PostDetailAPIView.as_view(), name="post_detail"),
    path("posts/", PostListAPIView.as_view(), name="posts"),
    path("categories/", CategoryListAPIView.as_view(), name="categories"),
]
