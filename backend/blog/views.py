from rest_framework import generics

from .models import Post
from .serializers import PostSerializer


class PostListLatestAPIView(generics.ListAPIView):
    queryset = Post.objects\
        .select_related("author")\
        .prefetch_related("categories")\
        .order_by("-created_at")[:3]
    serializer_class = PostSerializer


class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects\
        .select_related("author")\
        .prefetch_related("categories")\
        .order_by("-created_at")
    serializer_class = PostSerializer


class PostDetailAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.select_related("author")
    serializer_class = PostSerializer
    lookup_field = "slug"
