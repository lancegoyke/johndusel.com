from django.urls import path

from .views import PostListAPIView, PostDetailAPIView


urlpatterns = [
    path('posts/<str:slug>/', PostDetailAPIView.as_view(), name='post_detail'),
    path('posts/', PostListAPIView.as_view(), name='posts'),
]
